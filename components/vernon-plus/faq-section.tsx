"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronDown,
  MessageCircle,
  Calendar,
  ArrowRight,
  CheckCircle,
  Target,
  BarChart,
  Clock,
  Globe,
  HelpCircle,
} from "lucide-react"
import Link from "next/link"

interface FaqItem {
  id: number
  question: string
  answer: React.ReactNode
  icon: React.ReactNode
}

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null)

  const toggleItem = (id: number) => {
    setOpenItem(openItem === id ? null : id)
  }

  const faqItems: FaqItem[] = [
    {
      id: 1,
      question: "¿Qué hace Vernon+ y cómo puede ayudar a mi negocio?",
      icon: <Target className="text-[#4ECDC4]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="mt-6">
            No somos una agencia de marketing tradicional. Vernon+ es un equipo estratégico que{" "}
            <span className="font-medium text-[#4ECDC4]">
              diseña y ejecuta planes de marketing, publicidad y ventas enfocados en resultados reales.
            </span>
          </p>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <p className="font-medium mb-2">Ejemplo práctico:</p>
            <p>
              Si querés vender más en MercadoLibre,{" "}
              <span className="font-medium">no solo optimizamos tus fichas de producto.</span> También definimos una{" "}
              <span className="font-medium">estrategia de precios, posicionamiento y campañas publicitarias</span> que
              te ayuden a vender más y diferenciarte de la competencia.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      question: "¿Cómo sé si Vernon+ es lo que mi negocio necesita?",
      icon: <HelpCircle className="text-[#8B7FD7]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="mt-6">
            Si alguna de estas situaciones te resulta familiar,{" "}
            <span className="font-medium text-[#8B7FD7]">Vernon+ es para vos:</span>
          </p>
          <ul className="space-y-2">
            {[
              "Publicamos en redes, pero no sabemos si realmente funciona.",
              "Gastamos en publicidad, pero no tenemos claro si estamos invirtiendo bien.",
              "Tenemos una tienda online, pero las ventas no despegan.",
              "Vendo en MercadoLibre, pero mi competencia siempre aparece primero.",
              "No tengo tiempo para encargarme del marketing, pero sé que es clave.",
              "Mi marca está creciendo y quiero protegerla legalmente antes de que sea tarde.",
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                <span>"{item}"</span>
              </li>
            ))}
          </ul>
          <p className="font-medium">Si te identificás con alguna, es momento de hablar.</p>
          <div className="pt-2">
            <button
              onClick={() => (window.location.href = "#evaluacion")}
              className="inline-flex items-center gap-2 bg-[#8B7FD7]/20 hover:bg-[#8B7FD7]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm"
            >
              Hacer diagnóstico rápido
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      question: "¿En qué se diferencia Vernon+ de otras agencias?",
      icon: <CheckCircle className="text-[#FF5E5B]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="font-medium text-[#FF5E5B] mt-6">
            No hacemos marketing sin propósito, hacemos estrategias que generan resultados.
          </p>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center flex-shrink-0">
                <Target size={16} className="text-[#4ECDC4]" />
              </div>
              <div>
                <p className="font-medium">Estrategia antes que ejecución.</p>
                <p className="text-white/70">No hacemos campañas al azar, cada acción tiene un objetivo.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#8B7FD7]/20 flex items-center justify-center flex-shrink-0">
                <BarChart size={16} className="text-[#8B7FD7]" />
              </div>
              <div>
                <p className="font-medium">Planes que crecen con vos.</p>
                <p className="text-white/70">
                  Nos adaptamos a cada negocio, sin paquetes cerrados ni fórmulas genéricas.
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#F7C45A]/20 flex items-center justify-center flex-shrink-0">
                <CheckCircle size={16} className="text-[#F7C45A]" />
              </div>
              <div>
                <p className="font-medium">Claridad y transparencia.</p>
                <p className="text-white/70">Sin costos ocultos ni tecnicismos innecesarios.</p>
              </div>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: 4,
      question: "¿Cuánto cuesta trabajar con Vernon+?",
      icon: <BarChart className="text-[#F7C45A]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="font-medium text-[#F7C45A] mt-6">
            Cada negocio es único, y por eso nuestras estrategias son personalizadas.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
              <span>No trabajamos con tarifas estándar porque cada negocio tiene necesidades distintas.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
              <span>Tenemos planes escalables según objetivos y presupuesto.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
              <span>Podés agendar una consulta gratuita para encontrar la mejor opción para vos.</span>
            </li>
          </ul>
          <div className="pt-2">
            <a
              href="https://calendly.com/vernon-plus/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#F7C45A]/20 hover:bg-[#F7C45A]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm"
            >
              <Calendar size={16} />
              Agendar consulta gratuita
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      question: "¿Cuánto tiempo tardan en verse resultados?",
      icon: <Clock className="text-[#4ECDC4]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="font-medium text-[#4ECDC4] mt-6">Depende del servicio y el punto de partida de tu negocio.</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Publicidad digital:</p>
              <p className="text-white/80">Los primeros resultados pueden verse en semanas.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Branding y contenido:</p>
              <p className="text-white/80">Construyen una base sólida y su impacto es progresivo.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Ecommerce o MercadoLibre:</p>
              <p className="text-white/80">Optimización y mejoras en conversión en 30 a 60 días.</p>
            </div>
          </div>
          <p className="font-medium">No hacemos promesas irreales. Te damos un plan claro con expectativas medibles.</p>
        </div>
      ),
    },
    {
      id: 6,
      question: "¿Cómo funciona el proceso de trabajo?",
      icon: <Target className="text-[#8B7FD7]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="font-medium text-[#8B7FD7] mt-6">Nuestro enfoque es ágil y 100% transparente:</p>
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10"></div>
            <ul className="space-y-6 relative">
              <li className="flex items-start gap-4 pl-8 relative">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-[#4ECDC4]/20 flex items-center justify-center">
                  <span className="font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium">Consulta inicial</p>
                  <p className="text-white/70">Analizamos tu negocio y objetivos.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 pl-8 relative">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-[#8B7FD7]/20 flex items-center justify-center">
                  <span className="font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium">Estrategia</p>
                  <p className="text-white/70">Diseñamos un plan de acción concreto.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 pl-8 relative">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-[#FF5E5B]/20 flex items-center justify-center">
                  <span className="font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium">Implementación</p>
                  <p className="text-white/70">Ejecutamos las acciones con reportes constantes.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 pl-8 relative">
                <div className="absolute left-0 w-8 h-8 rounded-full bg-[#F7C45A]/20 flex items-center justify-center">
                  <span className="font-bold">4</span>
                </div>
                <div>
                  <p className="font-medium">Optimización</p>
                  <p className="text-white/70">Ajustamos la estrategia para mejorar los resultados.</p>
                </div>
              </li>
            </ul>
          </div>
          <p>Nos mantenemos en contacto en cada etapa para asegurarnos de que el trabajo tenga impacto real.</p>
        </div>
      ),
    },
    {
      id: 7,
      question: "¿Tienen contratos o permanencia mínima?",
      icon: <Clock className="text-[#FF5E5B]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="mt-6">
            <span className="font-medium text-[#FF5E5B]">
              No exigimos permanencia obligatoria, pero recomendamos al menos 3 meses
            </span>{" "}
            para ver resultados sólidos.
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Si buscás impacto rápido:</p>
              <p className="text-white/80">Tenemos planes de activación intensiva.</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Si querés crecimiento constante:</p>
              <p className="text-white/80">Ofrecemos servicio mensual con optimización continua.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 8,
      question: "¿En qué países trabajan?",
      icon: <Globe className="text-[#F7C45A]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="font-medium text-[#F7C45A] mt-6">Brindamos servicios en Argentina, España y Estados Unidos.</p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-center">
              <p className="font-medium">Argentina 🇦🇷</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-center">
              <p className="font-medium">España 🇪🇸</p>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10 flex items-center justify-center">
              <p className="font-medium">Estados Unidos 🇺🇸</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 9,
      question: "¿Qué pasa si tengo dudas o quiero ajustar mi estrategia?",
      icon: <MessageCircle className="text-[#4ECDC4]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="font-medium text-[#4ECDC4] mt-6">Siempre estamos disponibles.</p>
          <p>Podés escribirnos por WhatsApp, email o agendar una reunión rápida.</p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://wa.me/yourphonenumber"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm"
            >
              <MessageCircle size={16} />
              WhatsApp
            </a>
            <a
              href="mailto:HELLO@WEAREVERNON.COM"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm"
            >
              Email
            </a>
            <a
              href="https://calendly.com/vernon-plus/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#4ECDC4]/20 hover:bg-[#4ECDC4]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm"
            >
              <Calendar size={16} />
              Reunión rápida
            </a>
          </div>
        </div>
      ),
    },
    {
      id: 10,
      question: "¿Cómo empiezo?",
      icon: <ArrowRight className="text-[#FF5E5B]" size={24} />,
      answer: (
        <div className="space-y-4">
          <p className="mt-6">Tenés varias opciones para comenzar:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Diagnóstico rápido</p>
              <p className="text-white/80 mb-3">
                Descubrí si Vernon+ es para vos con nuestra autoevaluación interactiva.
              </p>
              <button
                onClick={() => (window.location.href = "#evaluacion")}
                className="inline-flex items-center gap-2 bg-[#8B7FD7]/20 hover:bg-[#8B7FD7]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm w-full justify-center"
              >
                Hacer diagnóstico
                <ArrowRight size={16} />
              </button>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Consulta gratuita</p>
              <p className="text-white/80 mb-3">Agendá una reunión y conversemos directamente sobre tu negocio.</p>
              <a
                href="https://calendly.com/vernon-plus/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#4ECDC4]/20 hover:bg-[#4ECDC4]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm w-full justify-center"
              >
                <Calendar size={16} />
                Agendar reunión
              </a>
            </div>
            <div className="bg-white/5 p-4 rounded-lg border border-white/10">
              <p className="font-medium mb-2">Contacto directo</p>
              <p className="text-white/80 mb-3">Escribinos por WhatsApp y te ayudamos a definir la mejor opción.</p>
              <a
                href="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-white font-medium px-4 py-2 rounded-lg transition-all text-sm w-full justify-center"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="space-y-4">
      {faqItems.map((item) => (
        <div
          key={item.id}
          className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full p-6 flex items-center justify-between text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">{item.icon}</div>
              <h3 className="text-xl font-bold">{item.question}</h3>
            </div>
            <ChevronDown
              className={`transition-transform duration-300 ${openItem === item.id ? "rotate-180" : ""}`}
              size={20}
            />
          </button>
          <AnimatePresence>
            {openItem === item.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 border-t border-white/10">{item.answer}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="mt-12 text-center">
        <Link
          href="#contacto"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E5B] to-[#FF8C8A] hover:from-[#FF5E5B] hover:to-[#FF5E5B] text-white font-medium px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#FF5E5B]/20"
        >
          Hablemos sobre tu negocio 🚀
          <ArrowRight size={20} />
        </Link>
      </div>
    </div>
  )
}
