"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ArrowRight, ArrowLeft, Instagram, Linkedin, Check } from "lucide-react"
import { sendContactFormEmail } from "@/app/actions/send-email"

interface ContactFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    businessType: "",
    marketingActions: [] as string[],
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    businessType: "",
    marketingActions: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState("")

  // Total de pasos (ahora son 5 en lugar de 6)
  const totalSteps = 5

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setFormData({
        name: "",
        email: "",
        businessType: "",
        marketingActions: [],
        message: "",
      })
      setErrors({
        name: "",
        email: "",
        businessType: "",
        marketingActions: "",
        message: "",
      })
      setIsSubmitting(false)
      setIsSubmitted(false)
      setSubmitError("")
    }
  }, [isOpen])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => {
      const currentActions = [...prev.marketingActions]
      if (currentActions.includes(value)) {
        return { ...prev, marketingActions: currentActions.filter((action) => action !== value) }
      } else {
        return { ...prev, marketingActions: [...currentActions, value] }
      }
    })
    // Clear error when user selects
    if (errors.marketingActions) {
      setErrors((prev) => ({ ...prev, marketingActions: "" }))
    }
  }

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user selects
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateStep = () => {
    let isValid = true
    const newErrors = { ...errors }

    switch (step) {
      case 1:
        if (!formData.name.trim()) {
          newErrors.name = "Por favor, ingresá tu nombre"
          isValid = false
        }
        break
      case 2:
        if (!formData.email.trim()) {
          newErrors.email = "Por favor, ingresá tu email"
          isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = "Por favor, ingresá un email válido"
          isValid = false
        }
        break
      case 3:
        if (!formData.businessType) {
          newErrors.businessType = "Por favor, seleccioná una opción"
          isValid = false
        }
        break
      case 4:
        if (formData.marketingActions.length === 0) {
          newErrors.marketingActions = "Por favor, seleccioná al menos una opción"
          isValid = false
        }
        break
      case 5:
        if (!formData.message.trim()) {
          newErrors.message = "Por favor, contanos sobre tu marca"
          isValid = false
        }
        break
    }

    setErrors(newErrors)
    return isValid
  }

  const handleNext = () => {
    if (validateStep()) {
      if (step < totalSteps) {
        setStep(step + 1)
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep()) {
      setIsSubmitting(true)
      setSubmitError("")

      try {
        // Enviar el formulario usando la acción del servidor
        const result = await sendContactFormEmail(formData)

        if (result.success) {
          setIsSubmitted(true)
          console.log("Form submitted successfully:", formData)
        } else {
          setSubmitError(result.error || "Hubo un error al enviar el formulario. Por favor, intentá nuevamente.")
          console.error("Error submitting form:", result.error)
        }
      } catch (error) {
        setSubmitError("Hubo un error al enviar el formulario. Por favor, intentá nuevamente.")
        console.error("Exception when submitting form:", error)
      } finally {
        setIsSubmitting(false)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      if (step < totalSteps) {
        handleNext()
      } else if (step === totalSteps && !isSubmitted) {
        handleSubmit(e as unknown as React.FormEvent)
      }
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#220909] border border-[#f7c45a]/30 rounded-lg shadow-xl max-w-md w-full p-6 relative animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} />
        </button>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Hablemos</h2>
            {!isSubmitted && (
              <div className="text-xs text-white/60">
                Paso {step} de {totalSteps}
              </div>
            )}
          </div>
          {!isSubmitted && (
            <div className="h-1 bg-white/10 rounded-full w-full">
              <div
                className="h-1 bg-[#f7c45a] rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
          {/* Mostrar el formulario si no ha sido enviado */}
          {!isSubmitted ? (
            <>
              {/* Step 1: Name */}
              {step === 1 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Hola :) Antes de empezar, no queremos ser maleducados… ¿Cómo te llamás?
                  </h3>
                  <div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7c45a] text-white"
                      placeholder="Tu nombre"
                      autoFocus
                    />
                    {errors.name && <p className="mt-1 text-[#fc6059] text-sm">{errors.name}</p>}
                  </div>
                </div>
              )}

              {/* Step 2: Email */}
              {step === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    ¡Genial! ¿Cuál es tu correo electrónico corporativo?
                  </h3>
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7c45a] text-white"
                      placeholder="tu@empresa.com"
                      autoFocus
                    />
                    {errors.email && <p className="mt-1 text-[#fc6059] text-sm">{errors.email}</p>}
                  </div>
                </div>
              )}

              {/* Step 3: Business Type */}
              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Gracias por eso. Para saber si Vernon Creative Bureau es el aliado perfecto para ayudarte a hacer
                    crecer tu marca, tenemos algunas preguntas. Primero, ¿qué vendés?
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="businessType"
                        value="Producto"
                        checked={formData.businessType === "Producto"}
                        onChange={handleRadioChange}
                        className="form-radio h-5 w-5 text-[#f7c45a]"
                        autoFocus
                      />
                      <span>Producto</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                      <input
                        type="radio"
                        name="businessType"
                        value="Servicio"
                        checked={formData.businessType === "Servicio"}
                        onChange={handleRadioChange}
                        className="form-radio h-5 w-5 text-[#f7c45a]"
                      />
                      <span>Servicio</span>
                    </label>
                    {errors.businessType && <p className="mt-1 text-[#fc6059] text-sm">{errors.businessType}</p>}
                  </div>
                </div>
              )}

              {/* Step 4: Marketing Actions */}
              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">¿Qué tipo de acciones hiciste hasta ahora?</h3>
                  <p className="text-sm text-white/60">Podés elegir más de una</p>
                  <div className="space-y-3">
                    {[
                      "Marketing digital (redes sociales, SEO/SEM, email marketing, etc.)",
                      "Publicidad tradicional (TV, radio, gráfica, etc.)",
                      "Marketing de contenidos",
                      "Influencers",
                      "Relaciones Públicas",
                      "Otras",
                    ].map((action) => (
                      <label
                        key={action}
                        className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={formData.marketingActions.includes(action)}
                          onChange={() => handleCheckboxChange(action)}
                          className="form-checkbox h-5 w-5 text-[#f7c45a]"
                          style={{ minWidth: "1.25rem" }} // Asegurar tamaño mínimo consistente
                        />
                        <span>{action}</span>
                      </label>
                    ))}
                    {errors.marketingActions && (
                      <p className="mt-1 text-[#fc6059] text-sm">{errors.marketingActions}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Message */}
              {step === 5 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">
                    Finalmente, contanos sobre tu marca, público objetivo y lo que más te gustaría lograr con nuestra
                    ayuda.
                  </h3>
                  <p className="text-sm text-white/60">
                    Sí, lamentamos decirte que es un campo obligatorio 😅<br />
                    Pero necesitamos contexto para que nuestra reunión sea productiva 😊
                  </p>
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f7c45a] text-white resize-none"
                      placeholder="Cuéntanos sobre tu marca..."
                      autoFocus
                    ></textarea>
                    {errors.message && <p className="mt-1 text-[#fc6059] text-sm">{errors.message}</p>}
                  </div>
                  {submitError && <p className="mt-2 text-[#fc6059] text-sm">{submitError}</p>}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                  >
                    <ArrowLeft size={16} />
                    Atrás
                  </button>
                )}

                {step < 4 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f7c45a] hover:bg-[#f7c45a]/80 text-black font-medium rounded-lg transition-colors ml-auto"
                  >
                    Siguiente
                    <ArrowRight size={16} />
                  </button>
                )}

                {step === 4 && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f7c45a] hover:bg-[#f7c45a]/80 text-black font-medium rounded-lg transition-colors ml-auto"
                  >
                    Último paso
                    <ArrowRight size={16} />
                  </button>
                )}

                {step === 5 && (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-[#f7c45a] hover:bg-[#f7c45a]/80 text-black font-medium rounded-lg transition-colors ml-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                )}
              </div>
            </>
          ) : (
            // Pantalla de confirmación después del envío exitoso
            <div className="space-y-6 text-center">
              <div className="flex justify-center">
                <div className="w-16 h-16 bg-[#f7c45a]/20 rounded-full flex items-center justify-center">
                  <Check className="text-[#f7c45a]" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-bold text-white">¡Formulario enviado!</h3>
              <p className="text-white/80">
                ¡Muchas gracias por la información! Te estaremos escribiendo en las próximas horas con nuestro feedback
                y eventualmente opciones para que podamos coordinar una reunión.
              </p>

              <p className="text-white/80">Mientras tanto, podés seguirnos en:</p>

              <div className="flex justify-center space-x-6 mt-4">
                <a
                  href="https://www.instagram.com/vernon.creative.bureau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Instagram size={20} />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/company/vernon-creative-bureau"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex items-center gap-2 px-4 py-2 bg-[#f7c45a] hover:bg-[#f7c45a]/80 text-black font-medium rounded-lg transition-colors mx-auto mt-4"
              >
                Cerrar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
