"use client"

import { useState, useEffect } from "react"
import { X, ArrowRight, CheckCircle, AlertCircle, HelpCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Question {
  id: number
  text: string
  options: {
    text: string
    value: "aligned" | "mixed" | "negative"
  }[]
}

interface Result {
  type: "aligned" | "mixed" | "negative"
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "¿Cuál es el principal desafío de tu negocio en este momento?",
    options: [
      { text: "Crecer y posicionarnos mejor en el mercado.", value: "aligned" },
      { text: "Aumentar nuestras ventas, pero no sabemos cómo.", value: "mixed" },
      { text: "Conseguir más clientes sin invertir demasiado en marketing o publicidad.", value: "negative" },
    ],
  },
  {
    id: 2,
    text: "¿Cuánto tiempo dedicás a planificar la comunicación de tu empresa?",
    options: [
      { text: "Planificamos todo con anticipación, pero necesitamos un equipo para ejecutarlo.", value: "aligned" },
      { text: "A veces planificamos, pero muchas veces improvisamos.", value: "mixed" },
      { text: "No le dedicamos tiempo porque creemos que no es tan importante.", value: "negative" },
    ],
  },
  {
    id: 3,
    text: "¿Cómo te diferenciás de tu competencia?",
    options: [
      { text: "Con una propuesta de valor clara y una comunicación sólida.", value: "aligned" },
      { text: "Creemos que nuestro producto/servicio es bueno, pero no sabemos cómo destacarlo.", value: "mixed" },
      { text: "No creemos que haga falta diferenciarnos, el boca a boca nos funciona.", value: "negative" },
    ],
  },
  {
    id: 4,
    text: 'Cuando pensás en "marketing y publicidad", ¿qué es lo primero que se te viene a la mente?',
    options: [
      { text: "Una inversión clave para crecer y posicionarnos.", value: "aligned" },
      { text: "Algo necesario, pero muchas veces difícil de medir.", value: "mixed" },
      { text: "Un gasto innecesario que solo usan las grandes empresas.", value: "negative" },
    ],
  },
  {
    id: 5,
    text: "Si hoy un cliente potencial busca tu negocio en redes sociales o en Google, ¿qué encontraría?",
    options: [
      { text: "Una presencia profesional con contenido de valor y estrategias bien ejecutadas.", value: "aligned" },
      { text: "Un perfil activo, pero sin una estrategia clara.", value: "mixed" },
      { text: "Poca o ninguna presencia digital porque creemos que no la necesitamos.", value: "negative" },
    ],
  },
  {
    id: 6,
    text: "¿Cuál es tu expectativa cuando contratás a una agencia o equipo de marketing y publicidad?",
    options: [
      { text: "Que trabajen estratégicamente como parte de nuestro equipo a largo plazo.", value: "aligned" },
      { text: "Que nos ayuden con piezas de comunicación y campañas cuando lo necesitamos.", value: "mixed" },
      { text: "Que hagan algunos posteos en redes y con eso ya estemos cubiertos.", value: "negative" },
    ],
  },
  {
    id: 7,
    text: "¿Qué harías si alguien te dijera que el marketing y la publicidad no sirven para nada?",
    options: [
      { text: "Le explicaría con datos por qué son clave para cualquier negocio.", value: "aligned" },
      { text: "Le diría que depende de cómo se usen y que pueden marcar la diferencia.", value: "mixed" },
      { text: "Probablemente estaría de acuerdo con esa afirmación.", value: "negative" },
    ],
  },
]

const results: Result[] = [
  {
    type: "aligned",
    title: "¡Estamos alineados!",
    description:
      "Vernon+ es la agencia ideal para acompañarte en el crecimiento de tu negocio con estrategia, creatividad y resultados reales.",
    ctaText: "Agendemos una reunión para analizar tu caso",
    ctaLink:
      "https://wa.me/yourphonenumber?text=Hola%20Vernon+,%20quiero%20agendar%20una%20reunión%20para%20analizar%20mi%20caso",
  },
  {
    type: "mixed",
    title: "Tenés potencial para crecer",
    description:
      "Sabemos que el marketing y la publicidad pueden parecer un gasto, pero cuando se hacen bien, son una inversión que genera crecimiento. Queremos ayudarte a estructurar una estrategia efectiva para que dejes de improvisar.",
    ctaText: "Descubrí cómo podemos hacer crecer tu negocio",
    ctaLink: "/vernon-plus/recursos",
  },
  {
    type: "negative",
    title: "Quizás aún no es el momento",
    description:
      "Entendemos que algunos negocios todavía no ven la importancia del marketing y la publicidad. Pero la realidad es que las empresas que invierten en comunicación estratégica crecen más rápido y tienen una presencia más sólida. Si en el futuro querés explorar cómo transformar tu negocio con marketing bien hecho, acá estaremos.",
    ctaText: "Leé más sobre la importancia del marketing estratégico",
    ctaLink: "/vernon-plus/articulos/importancia-marketing-estrategico",
  },
]

interface AutoEvaluacionModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AutoEvaluacionModal({ isOpen, onClose }: AutoEvaluacionModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [result, setResult] = useState<Result | null>(null)
  const [showResult, setShowResult] = useState(false)
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
      const alignedCount = newAnswers.filter((a) => a === "aligned").length
      const mixedCount = newAnswers.filter((a) => a === "mixed").length
      const negativeCount = newAnswers.filter((a) => a === "negative").length

      let resultType: "aligned" | "mixed" | "negative"

      if (alignedCount >= 4) {
        resultType = "aligned"
      } else if (mixedCount >= 4 || (alignedCount >= 2 && mixedCount >= 2)) {
        resultType = "mixed"
      } else {
        resultType = "negative"
      }

      const calculatedResult = results.find((r) => r.type === resultType)

      setTimeout(() => {
        setResult(calculatedResult || results[0])
        setShowResult(true)
      }, 500)
    }
  }

  if (!mounted || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#1A0A4A] border border-[#8B7FD7]/30 rounded-xl shadow-xl max-w-2xl w-full p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
          aria-label="Cerrar"
        >
          <X size={24} />
        </button>

        <div className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {!showResult ? "¿Es Vernon+ para vos?" : "Tu resultado"}
          </h2>
          {!showResult && (
            <div className="flex items-center gap-2">
              <div className="h-1 bg-white/20 rounded-full flex-grow">
                <div
                  className="h-1 bg-[#4ECDC4] rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-white/60 text-sm">
                {currentQuestion + 1}/{questions.length}
              </span>
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={`question-${currentQuestion}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl md:text-2xl font-medium text-white mb-6">{questions[currentQuestion].text}</h3>
              <div className="space-y-4">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option.value)}
                    className="w-full text-left p-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full border-2 border-[#4ECDC4] flex-shrink-0 mt-0.5"></div>
                    <span>{option.text}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                {result?.type === "aligned" && (
                  <div className="w-20 h-20 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center">
                    <CheckCircle size={40} className="text-[#4ECDC4]" />
                  </div>
                )}
                {result?.type === "mixed" && (
                  <div className="w-20 h-20 rounded-full bg-[#F7C45A]/20 flex items-center justify-center">
                    <HelpCircle size={40} className="text-[#F7C45A]" />
                  </div>
                )}
                {result?.type === "negative" && (
                  <div className="w-20 h-20 rounded-full bg-[#FF5E5B]/20 flex items-center justify-center">
                    <AlertCircle size={40} className="text-[#FF5E5B]" />
                  </div>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{result?.title}</h3>
              <p className="text-white/80 mb-8 max-w-lg mx-auto">{result?.description}</p>

              <div className="flex flex-col items-center gap-4">
                <a
                  href={result?.ctaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#8B7FD7] hover:bg-[#8B7FD7]/90 text-white font-medium px-6 py-3 rounded-lg transition-all"
                >
                  {result?.ctaText}
                  <ArrowRight size={18} />
                </a>
                <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
                  Cerrar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
