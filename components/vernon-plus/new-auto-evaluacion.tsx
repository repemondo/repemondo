"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X, ArrowRight, CheckCircle, BarChart, Rocket, Target } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Estructura de secciones y preguntas
interface Section {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

interface Question {
  id: number
  sectionId: number
  text: string
  options: {
    id: string
    text: string
    value: "high" | "medium" | "low"
  }[]
}

interface Result {
  type: "high_potential" | "growth_ready" | "optimization_needed"
  title: string
  description: string
  ctaText: string
  ctaLink: string
  icon: React.ReactNode
  color: string
}

// Definición de secciones
const sections: Section[] = [
  {
    id: 1,
    title: "Estrategia y Posicionamiento",
    description: "Definir un negocio no es solo vender, es saber por qué te eligen.",
    icon: <Target className="text-[#4ECDC4]" size={24} />,
  },
  {
    id: 2,
    title: "Marketing y Visibilidad",
    description: "No basta con existir, hay que ser visible y memorable.",
    icon: <BarChart className="text-[#8B7FD7]" size={24} />,
  },
  {
    id: 3,
    title: "Ventas y Conversión",
    description: "Un negocio sin conversión es un hobby caro.",
    icon: <Rocket className="text-[#FF5E5B]" size={24} />,
  },
  {
    id: 4,
    title: "Escalabilidad y Protección",
    description: "Un negocio en crecimiento necesita estructura y previsión.",
    icon: <CheckCircle className="text-[#F7C45A]" size={24} />,
  },
]

// Definición de preguntas
const questions: Question[] = [
  {
    id: 1,
    sectionId: 1,
    text: "Si un cliente te preguntara ahora mismo por qué debería elegirte, ¿tenés una respuesta clara?",
    options: [
      { id: "a", text: "Sí, tenemos una propuesta de valor bien definida.", value: "high" },
      { id: "b", text: "Más o menos, pero a veces nos cuesta expresarlo.", value: "medium" },
      { id: "c", text: "No realmente, creemos que nuestro producto habla por sí solo.", value: "low" },
    ],
  },
  {
    id: 2,
    sectionId: 1,
    text: "¿Tu negocio está bien posicionado en su sector o sentís que podrías destacarte más?",
    options: [
      { id: "a", text: "Estamos bien posicionados, pero queremos seguir creciendo.", value: "high" },
      { id: "b", text: "Aparecemos en el mercado, pero hay margen de mejora.", value: "medium" },
      { id: "c", text: "Sabemos que podríamos diferenciarnos mucho más, pero no sabemos cómo.", value: "low" },
    ],
  },
  {
    id: 3,
    sectionId: 2,
    text: "¿Tu negocio tiene una estrategia de marketing clara o simplemente publicás cuando podés?",
    options: [
      { id: "a", text: "Sí, seguimos una estrategia planificada.", value: "high" },
      { id: "b", text: "Hacemos algunas acciones, pero sin un plan estructurado.", value: "medium" },
      { id: "c", text: "Publicamos cuando tenemos tiempo, sin mucha planificación.", value: "low" },
    ],
  },
  {
    id: 4,
    sectionId: 2,
    text: "Si un cliente te busca en Google o redes sociales, ¿qué tan fácil te encuentra?",
    options: [
      { id: "a", text: "Estamos bien posicionados y aparecemos en búsquedas relevantes.", value: "high" },
      { id: "b", text: "Estamos presentes, pero podríamos mejorar nuestra visibilidad.", value: "medium" },
      { id: "c", text: "Nos cuesta que los clientes nos encuentren en digital.", value: "low" },
    ],
  },
  {
    id: 5,
    sectionId: 2,
    text: "¿Sabés cuántos clientes llegan realmente por publicidad digital o solo lo intuís?",
    options: [
      { id: "a", text: "Sí, medimos todo y sabemos qué funciona mejor.", value: "high" },
      { id: "b", text: "Tenemos datos, pero no siempre los usamos estratégicamente.", value: "medium" },
      { id: "c", text: "No tenemos claridad sobre qué clientes vienen por publicidad.", value: "low" },
    ],
  },
  {
    id: 6,
    sectionId: 3,
    text: "¿Tu tienda online o MercadoLibre generan ventas de forma constante o hay meses difíciles?",
    options: [
      { id: "a", text: "Sí, tenemos ventas estables y buscamos escalarlas.", value: "high" },
      { id: "b", text: "Tenemos ventas, pero nos gustaría mejorar la conversión.", value: "medium" },
      { id: "c", text: "No logramos vender lo que esperamos.", value: "low" },
    ],
  },
  {
    id: 7,
    sectionId: 3,
    text: "¿Tus redes sociales o sitio web están optimizados para atraer clientes y convertirlos?",
    options: [
      { id: "a", text: "Sí, y lo medimos constantemente.", value: "high" },
      { id: "b", text: "Tenemos tráfico, pero podríamos mejorar la conversión.", value: "medium" },
      { id: "c", text: "No estamos seguros de qué tan bien convierten.", value: "low" },
    ],
  },
  {
    id: 8,
    sectionId: 4,
    text: "¿Tu marca está registrada o existe el riesgo de que alguien más la tome?",
    options: [
      { id: "a", text: "Sí, ya protegimos nuestra marca.", value: "high" },
      { id: "b", text: "Lo tenemos en mente, pero no lo hicimos aún.", value: "medium" },
      { id: "c", text: "No habíamos pensado en eso, pero suena importante.", value: "low" },
    ],
  },
  {
    id: 9,
    sectionId: 4,
    text: "¿Tu contabilidad y estructura fiscal están organizadas o te generan dolores de cabeza?",
    options: [
      { id: "a", text: "Tenemos todo ordenado y optimizado.", value: "high" },
      { id: "b", text: "Llevamos las cuentas, pero podríamos mejorar la planificación.", value: "medium" },
      { id: "c", text: "Cada mes es un desafío con impuestos y contabilidad.", value: "low" },
    ],
  },
]

// Definición de resultados
const results: Result[] = [
  {
    type: "high_potential",
    title: "Tu negocio está listo para escalar",
    description:
      "Vas por buen camino, pero podríamos optimizar aún más tu estrategia. Trabajemos juntos para llevar tu negocio al siguiente nivel y maximizar tu potencial de crecimiento.",
    ctaText: "Quiero escalar mi negocio 🚀",
    ctaLink: "https://calendly.com/vernon-plus/30min",
    icon: <Rocket size={40} className="text-[#4ECDC4]" />,
    color: "#4ECDC4",
  },
  {
    type: "growth_ready",
    title: "Tu negocio tiene potencial sin explotar",
    description:
      "Tu negocio tiene un gran potencial que todavía no está aprovechando al 100%. Queremos ayudarte a estructurar un plan estratégico para que crezcas con confianza y superes a tu competencia.",
    ctaText: "Quiero potenciar mi negocio 🚀",
    ctaLink: "https://calendly.com/vernon-plus/30min",
    icon: <BarChart size={40} className="text-[#8B7FD7]" />,
    color: "#8B7FD7",
  },
  {
    type: "optimization_needed",
    title: "Es momento de transformar tu negocio",
    description:
      "Muchos negocios exitosos pasaron por esta etapa. Con una estrategia bien pensada, podemos transformar tu marketing y acelerar tu crecimiento para que alcances todo tu potencial.",
    ctaText: "Quiero transformar mi negocio 🚀",
    ctaLink: "https://calendly.com/vernon-plus/30min",
    icon: <Target size={40} className="text-[#FF5E5B]" />,
    color: "#FF5E5B",
  },
]

interface NewAutoEvaluacionProps {
  isOpen: boolean
  onClose: () => void
}

export function NewAutoEvaluacion({ isOpen, onClose }: NewAutoEvaluacionProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (isOpen) {
      // Reset state when modal opens
      setCurrentQuestion(0)
      setAnswers([])
      setResult(null)
      setShowResult(false)
      setShowIntro(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      // Move to next question
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1)
      }, 300)
    } else {
      // Calculate result
      const highCount = newAnswers.filter((a) => a === "high").length
      const mediumCount = newAnswers.filter((a) => a === "medium").length
      const lowCount = newAnswers.filter((a) => a === "low").length

      let resultType: "high_potential" | "growth_ready" | "optimization_needed"

      if (highCount >= 5) {
        resultType = "high_potential"
      } else if (highCount >= 3 || mediumCount >= 5) {
        resultType = "growth_ready"
      } else {
        resultType = "optimization_needed"
      }

      const calculatedResult = results.find((r) => r.type === resultType)

      setTimeout(() => {
        setResult(calculatedResult || results[0])
        setShowResult(true)
      }, 500)
    }
  }

  const startQuiz = () => {
    setShowIntro(false)
  }

  // Get current section based on question
  const getCurrentSection = () => {
    if (currentQuestion < questions.length) {
      const sectionId = questions[currentQuestion].sectionId
      return sections.find((section) => section.id === sectionId)
    }
    return null
  }

  const currentSection = getCurrentSection()

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <motion.div
        className="bg-gradient-to-br from-[#1A0A4A] to-[#250F64] border border-[#8B7FD7]/30 rounded-xl shadow-xl max-w-2xl w-full p-6 relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Background decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4ECDC4]/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#FF5E5B]/10 rounded-full filter blur-3xl"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <AnimatePresence mode="wait">
          {showIntro ? (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-4">¿Está tu negocio listo para crecer?</h2>
                <p className="text-white/80 text-lg mb-6">
                  Este diagnóstico rápido te ayudará a identificar oportunidades de crecimiento y áreas donde podríamos
                  potenciar tu negocio.
                </p>
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-[#8B7FD7]/20 rounded-full flex items-center justify-center mb-6">
                    <BarChart className="text-[#8B7FD7]" size={32} />
                  </div>
                </div>
                <p className="text-white/80 mb-8">
                  Responde 9 preguntas estratégicas y descubre cómo podemos ayudarte a llevar tu negocio al siguiente
                  nivel.
                </p>
                <button
                  onClick={startQuiz}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#8B7FD7] to-[#A99FE5] hover:from-[#8B7FD7] hover:to-[#8B7FD7] text-white font-medium px-8 py-3 rounded-lg transition-all shadow-lg shadow-[#8B7FD7]/20"
                >
                  Comenzar diagnóstico
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          ) : showResult ? (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center relative z-10"
            >
              <div className="mb-6 flex justify-center">
                <div className={`w-20 h-20 rounded-full bg-[${result?.color}]/20 flex items-center justify-center`}>
                  {result?.icon}
                </div>
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{result?.title}</h3>
              <p className="text-white/80 mb-8 max-w-lg mx-auto text-lg">{result?.description}</p>

              <div className="flex flex-col items-center gap-4">
                <a
                  href={result?.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E5B] to-[#FF8C8A] hover:from-[#FF5E5B] hover:to-[#FF5E5B] text-white font-medium px-8 py-4 rounded-lg transition-all shadow-lg shadow-[#FF5E5B]/20 w-full max-w-md justify-center text-lg"
                >
                  {result?.ctaText}
                  <ArrowRight size={20} />
                </a>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors mt-2">
                  Cerrar
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10"
            >
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  {currentSection?.icon}
                  <h3 className="text-lg font-medium text-white/90">
                    {currentSection?.title}{" "}
                    <span className="text-sm text-white/60">
                      ({currentQuestion + 1}/{questions.length})
                    </span>
                  </h3>
                </div>
                <div className="h-1 bg-white/10 rounded-full w-full">
                  <div
                    className="h-1 bg-[#4ECDC4] rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
                <p className="text-white/70 text-sm mt-2">{currentSection?.description}</p>
              </div>

              <h3 className="text-xl md:text-2xl font-medium text-white mb-6">{questions[currentQuestion].text}</h3>

              <div className="space-y-3">
                {questions[currentQuestion].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-4 rounded-lg bg-gradient-to-r from-white/10 to-white/5 hover:from-white/15 hover:to-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-white/30 flex-shrink-0 mt-0.5"></div>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
