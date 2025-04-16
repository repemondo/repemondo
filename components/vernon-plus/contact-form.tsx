"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulación de envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", company: "", message: "" })

      // Reset después de 5 segundos
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-[#4ECDC4] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-4">¡Mensaje enviado!</h3>
          <p className="text-white/80 mb-6">
            Gracias por contactarnos. Nos pondremos en contacto contigo lo antes posible.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white/80 mb-2 text-sm">
              Nombre y apellido
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-white"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-white/80 mb-2 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-white"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-white/80 mb-2 text-sm">
              Empresa
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-white"
              placeholder="Nombre de tu empresa"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-white/80 mb-2 text-sm">
              ¿Cómo podemos ayudarte?
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4ECDC4] text-white resize-none"
              placeholder="Cuéntanos sobre tu proyecto o necesidad"
            ></textarea>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-6 py-3 rounded-lg transition-all flex-1 flex items-center justify-center"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                </span>
              ) : (
                "Enviar mensaje"
              )}
            </button>
            <a
              href="https://calendly.com/vernon-plus/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#8B7FD7] hover:bg-[#8B7FD7]/90 text-white font-medium px-6 py-3 rounded-lg transition-all flex-1 flex items-center justify-center gap-2"
            >
              <Calendar size={18} />
              Agendá una reunión
            </a>
          </div>
        </form>
      )}
    </div>
  )
}
