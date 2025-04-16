"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLinkModal } from "@/components/external-link-modal"
import { StickyMenu } from "@/components/vernon-plus/sticky-menu"
import { MobileCTA } from "@/components/vernon-plus/mobile-cta"
import { WhatsAppButton } from "@/components/vernon-plus/whatsapp-button"
import { ContactForm } from "@/components/vernon-plus/contact-form"
import { NewAutoEvaluacion } from "@/components/vernon-plus/new-auto-evaluacion"
import { FaqSection } from "@/components/vernon-plus/faq-section"
import {
  ArrowRight,
  Calendar,
  Rocket,
  BarChart2,
  ShoppingCart,
  BarChart,
  Building2,
  Briefcase,
  Check,
  Target,
  Zap,
  ChevronRight,
} from "lucide-react"
import { motion } from "framer-motion"

export default function VernonPlusPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
  const [evaluacionModalOpen, setEvaluacionModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleExternalLinkClick = (url: string) => {
    setExternalUrl(url)
    setModalOpen(true)
  }

  const handleMobileCTAClick = () => {
    window.open(
      "https://wa.me/yourphonenumber?text=Hola%20Vernon+,%20quiero%20información%20sobre%20sus%20servicios",
      "_blank",
    )
  }

  // Función para generar estrellas con colores aleatorios según la distribución solicitada
  const generateStars = (count: number) => {
    return [...Array(count)].map((_, i) => {
      // Determinar el color de la estrella (90% blancas, 5% moradas, 5% cian)
      const colorRandom = Math.random() * 100
      let starColor = "white" // Color por defecto (90%)

      if (colorRandom > 90 && colorRandom <= 95) {
        starColor = "#8B7FD7" // 5% moradas
      } else if (colorRandom > 95) {
        starColor = "#4ECDC4" // 5% cian
      }

      return (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: starColor,
          }}
        />
      )
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Variantes para animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#1A0A4A] to-[#250F64] text-white font-sans">
      {/* Sticky Menu */}
      <StickyMenu onOpenEvaluacion={() => setEvaluacionModalOpen(true)} />

      {/* Mobile CTA */}
      <MobileCTA onClick={handleMobileCTAClick} />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Modals */}
      <ExternalLinkModal isOpen={modalOpen} onClose={() => setModalOpen(false)} url={externalUrl} />
      <NewAutoEvaluacion isOpen={evaluacionModalOpen} onClose={() => setEvaluacionModalOpen(false)} />

      {/* Stars Background */}
      <div className="fixed inset-0 pointer-events-none">{generateStars(40)}</div>

      {/* Sección 1: Hero – Impacto Directo */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        <div className="container max-w-6xl mx-auto px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-12 items-center"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div className="text-left" variants={fadeInUp}>
              <span className="inline-block px-4 py-1 rounded-full bg-[#8B7FD7]/20 text-[#8B7FD7] text-sm font-medium mb-6">
                Marketing para startups y pymes
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Más que una agencia, el equipo que tu negocio necesita.
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl">
                Estrategia, marketing y ventas diseñados para startups y pymes que buscan resultados sin complicaciones.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF5E5B] to-[#FF8C8A] hover:from-[#FF5E5B] hover:to-[#FF5E5B] text-white font-medium px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg shadow-[#FF5E5B]/20"
                >
                  <Calendar size={20} />
                  Hablemos de tu negocio 🚀
                </button>
                <button
                  onClick={() => scrollToSection("planes")}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full transition-all border border-white/10"
                >
                  <ArrowRight size={20} />
                  Ver planes y servicios
                </button>
              </div>
            </motion.div>
            <motion.div
              className="relative"
              variants={fadeInUp}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 0.8,
                  ease: "easeOut",
                },
              }}
            >
              <div className="relative h-[400px] w-full">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#4ECDC4]/20 rounded-full filter blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#8B7FD7]/20 rounded-full filter blur-3xl"></div>
                <Image
                  src="/mouse-laptop.svg"
                  alt="Vernon+ para startups y pymes"
                  fill
                  className="object-contain floating z-10"
                  priority
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              duration: 0.6,
              delay: 1.2,
              ease: "easeOut",
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              repeatDelay: 0.5,
            },
          }}
        >
          <ChevronRight size={24} className="text-white/60 rotate-90" />
        </motion.div>
      </section>

      {/* Sección 2: Quiénes Somos */}
      <section id="nosotros" className="py-20 bg-[#1A0A4A]/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A4A] to-[#250F64] opacity-80"></div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" variants={fadeInUp}>
              ¿Quiénes somos?
            </motion.h2>
            <motion.p className="text-xl text-white/80 mb-8 text-center" variants={fadeInUp}>
              Vernon+ <span className="text-[#4ECDC4] font-medium">no es una agencia tradicional</span>. No hacemos
              marketing porque "hay que estar en redes" ni vendemos publicidad sin estrategia.
            </motion.p>
            <motion.p className="text-xl text-white/80 mb-12 text-center" variants={fadeInUp}>
              Somos un equipo de profesionales con experiencia en agencias como Ogilvy, JWT y Publicis, que decidimos
              crear una propuesta diferente:{" "}
              <span className="text-[#FF5E5B] font-medium">
                marketing de primer nivel a precio justo, sin burocracia y con resultados reales.
              </span>
            </motion.p>

            <motion.div className="grid md:grid-cols-2 gap-8 mb-12" variants={staggerContainer}>
              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-bold mb-4 text-[#FF5E5B]">Lo que NO somos</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF5E5B] font-bold">✕</span>
                    <span>No ofrecemos servicios genéricos ni aplicamos tácticas vacías.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF5E5B] font-bold">✕</span>
                    <span>No hacemos marketing sin sentido ni prometemos milagros.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#FF5E5B] font-bold">✕</span>
                    <span>No somos un proveedor más que desaparece cuando surgen problemas.</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-md rounded-xl p-8 border border-white/10 hover:border-white/20 transition-all"
                variants={fadeInUp}
              >
                <h3 className="text-xl font-bold mb-4 text-[#4ECDC4]">Lo que SÍ somos</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#4ECDC4] font-bold">✓</span>
                    <span>Un equipo de marketing y estrategia diseñado para startups y pymes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4ECDC4] font-bold">✓</span>
                    <span>Especialistas en posicionamiento, ventas y escalabilidad.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#4ECDC4] font-bold">✓</span>
                    <span>Aliados en tu crecimiento, con una estructura ágil y enfocada en resultados.</span>
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            <motion.h3 className="text-2xl font-bold mb-6 text-center" variants={fadeInUp}>
              ¿Por qué Vernon+?
            </motion.h3>
            <motion.p className="text-xl text-white/80 mb-8 text-center" variants={fadeInUp}>
              Las startups y pymes no necesitan solo marketing. Necesitan claridad, estrategia y acción.
            </motion.p>

            <motion.div className="grid md:grid-cols-2 gap-6" variants={staggerContainer}>
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-[#8B7FD7]/20 rounded-full flex items-center justify-center mb-4">
                  <Target className="text-[#8B7FD7]" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Primero estrategia, después ejecución</h3>
                <p className="text-white/70">
                  Sin improvisaciones. Cada acción responde a un objetivo claro y medible.
                </p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mb-4">
                  <BarChart className="text-[#4ECDC4]" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Marketing que vende, no solo que se ve bien</h3>
                <p className="text-white/70">Claridad y conversión. Nos enfocamos en resultados, no en vanidad.</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-[#FF5E5B]/20 rounded-full flex items-center justify-center mb-4">
                  <Rocket className="text-[#FF5E5B]" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Planes que crecen con vos</h3>
                <p className="text-white/70">Diseñados para escalar. Nos adaptamos a tus necesidades en cada etapa.</p>
              </motion.div>

              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300"
                variants={fadeInUp}
              >
                <div className="w-12 h-12 bg-[#F7C45A]/20 rounded-full flex items-center justify-center mb-4">
                  <Zap className="text-[#F7C45A]" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Transparencia total</h3>
                <p className="text-white/70">
                  Sin costos ocultos ni tecnicismos innecesarios. Comunicación clara y directa.
                </p>
              </motion.div>
            </motion.div>

            <motion.div className="mt-12 text-center" variants={fadeInUp}>
              <button
                onClick={() => scrollToSection("planes")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg transition-all border border-white/10"
              >
                Conocé nuestros planes
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección 3: Planes y Servicios */}
      <section id="planes" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#250F64] to-[#1A0A4A] opacity-80"></div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" variants={fadeInUp}>
              Planes y Servicios
            </motion.h2>
            <motion.h3 className="text-2xl font-bold mb-12 text-center text-[#4ECDC4]" variants={fadeInUp}>
              Marketing a medida para cada etapa de tu negocio
            </motion.h3>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12" variants={staggerContainer}>
              {/* Plan 1: Lanzamiento Startup */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-[#FF5E5B]/30 group"
                variants={fadeInUp}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#FF5E5B]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Rocket className="text-[#FF5E5B]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan "Lanzamiento Startup"</h3>
                  <p className="text-[#FF5E5B] font-medium mb-4">3 meses intensivos</p>
                  <p className="text-white/70 mb-4">
                    Para emprendedores que quieren construir su marca y empezar con una estrategia clara.
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#FF5E5B] mt-1 flex-shrink-0" />
                      <span>Posicionamiento de marca y diferenciación estratégica</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#FF5E5B] mt-1 flex-shrink-0" />
                      <span>Identidad visual y diseño de marca con alto impacto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#FF5E5B] mt-1 flex-shrink-0" />
                      <span>Página web optimizada para captar clientes desde el día uno</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#FF5E5B] mt-1 flex-shrink-0" />
                      <span>Estrategia de marketing digital con publicidad segmentada</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#FF5E5B] mt-1 flex-shrink-0" />
                      <span>Producción de contenido inicial para redes con enfoque en conversión</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="w-full bg-gradient-to-r from-[#FF5E5B] to-[#FF8C8A] hover:from-[#FF5E5B] hover:to-[#FF5E5B] text-white font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-[#FF5E5B]/10"
                  >
                    Solicitar asesoramiento gratis
                  </button>
                </div>
              </motion.div>

              {/* Plan 2: Presencia 360° Pyme */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-[#8B7FD7]/30 group"
                variants={fadeInUp}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#8B7FD7]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart2 className="text-[#8B7FD7]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan "Presencia 360° Pyme"</h3>
                  <p className="text-[#8B7FD7] font-medium mb-4">Servicio mensual</p>
                  <p className="text-white/70 mb-4">
                    Marketing estructurado para negocios que buscan escalar con inteligencia.
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#8B7FD7] mt-1 flex-shrink-0" />
                      <span>Estrategia de comunicación con foco en posicionamiento real</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#8B7FD7] mt-1 flex-shrink-0" />
                      <span>Gestión profesional de redes y publicidad digital efectiva</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#8B7FD7] mt-1 flex-shrink-0" />
                      <span>SEO local optimizado para aumentar visibilidad y captación</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#8B7FD7] mt-1 flex-shrink-0" />
                      <span>Automatización y fidelización de clientes sin esfuerzo manual</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#8B7FD7] mt-1 flex-shrink-0" />
                      <span>Reportes estratégicos para decisiones basadas en datos</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="w-full bg-gradient-to-r from-[#8B7FD7] to-[#A99FE5] hover:from-[#8B7FD7] hover:to-[#8B7FD7] text-white font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-[#8B7FD7]/10"
                  >
                    Solicitar asesoramiento gratis
                  </button>
                </div>
              </motion.div>

              {/* Plan 3: Ecommerce Growth */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-[#4ECDC4]/30 group"
                variants={fadeInUp}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart className="text-[#4ECDC4]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan "Ecommerce Growth"</h3>
                  <p className="text-[#4ECDC4] font-medium mb-4">Ventas online escalables</p>
                  <p className="text-white/70 mb-4">
                    Para negocios digitales que buscan aumentar tráfico y ventas sin desperdiciar inversión.
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>Optimización de tienda online: UX, diseño y textos persuasivos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>Publicidad en Google Ads y Meta con estrategias de performance avanzadas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>Fidelización y remarketing inteligente para maximizar conversión</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>Análisis de datos y optimización constante basada en KPIs</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="w-full bg-gradient-to-r from-[#4ECDC4] to-[#7EDBD6] hover:from-[#4ECDC4] hover:to-[#4ECDC4] text-black font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-  hover:to-[#4ECDC4] text-black font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-[#4ECDC4]/10"
                  >
                    Solicitar asesoramiento gratis
                  </button>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" variants={staggerContainer}>
              {/* Plan 4: Impulso en MercadoLibre */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-[#F7C45A]/30 group"
                variants={fadeInUp}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-[#F7C45A]/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <BarChart className="text-[#F7C45A]" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan "Impulso en MercadoLibre"</h3>
                  <p className="text-[#F7C45A] font-medium mb-4">Ventas efectivas en marketplaces</p>
                  <p className="text-white/70 mb-4">
                    Porque vender en MercadoLibre no es solo publicar productos, es dominar la plataforma.
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#F7C45A] mt-1 flex-shrink-0" />
                      <span>Optimización de fichas de producto con copywriting persuasivo</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#F7C45A] mt-1 flex-shrink-0" />
                      <span>Estrategia de precios y promociones competitivas con análisis de mercado</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#F7C45A] mt-1 flex-shrink-0" />
                      <span>Publicidad en MercadoLibre con segmentación avanzada para conversión</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#F7C45A] mt-1 flex-shrink-0" />
                      <span>Automatización de logística y estrategias de retención de clientes</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="w-full bg-gradient-to-r from-[#F7C45A] to-[#FFD78A] hover:from-[#F7C45A] hover:to-[#F7C45A] text-black font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-[#F7C45A]/10"
                  >
                    Solicitar asesoramiento gratis
                  </button>
                </div>
              </motion.div>

              {/* Plan 5: Protección y Registro de Marca */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-white/30 group"
                variants={fadeInUp}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Building2 className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan "Protección y Registro de Marca"</h3>
                  <p className="text-white/80 font-medium mb-4">Legal para startups y pymes</p>
                  <p className="text-white/70 mb-4">
                    Si tu negocio crece, tu marca debe estar protegida con visión estratégica.
                  </p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Registro de marca en Argentina, España y Estados Unidos con asesoramiento experto</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>
                        Protección de propiedad intelectual y contratos comerciales específicos para negocios digitales
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Prevención de conflictos legales en comunicación y publicidad</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Estrategias legales para redes sociales y e-commerce</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="w-full bg-gradient-to-r from-white/30 to-white/20 hover:from-white/40 hover:to-white/30 text-white font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-white/5"
                  >
                    Solicitar asesoramiento gratis
                  </button>
                </div>
              </motion.div>

              {/* Plan 6: Contabilidad sin Estrés */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl overflow-hidden backdrop-blur-sm hover:from-white/15 hover:to-white/10 transition-all duration-300 flex flex-col h-full border border-white/10 hover:border-white/30 group"
                variants={fadeInUp}
              >
                <div className="p-8">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Briefcase className="text-white" size={28} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Plan "Contabilidad sin Estrés"</h3>
                  <p className="text-white/80 font-medium mb-4">Estructura financiera para negocios en crecimiento</p>
                  <p className="text-white/70 mb-4">El crecimiento sin control financiero es solo una ilusión.</p>
                  <ul className="space-y-3 mb-6 flex-grow">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Alta de empresa y asesoría fiscal en Argentina, España y EE.UU</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Gestión de impuestos y estructura contable optimizada para negocios digitales</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Facturación electrónica automatizada para eficiencia total</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-white mt-1 flex-shrink-0" />
                      <span>Planificación para inversiones estratégicas y acceso a financiamiento</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-auto p-8 pt-0">
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="w-full bg-gradient-to-r from-white/30 to-white/20 hover:from-white/40 hover:to-white/30 text-white font-medium px-4 py-3 rounded-lg transition-all shadow-lg shadow-white/5"
                  >
                    Solicitar asesoramiento gratis
                  </button>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="mt-16 text-center" variants={fadeInUp}>
              <button
                onClick={() => scrollToSection("contacto")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FF5E5B] to-[#FF8C8A] hover:from-[#FF5E5B] hover:to-[#FF5E5B] text-white font-medium px-8 py-4 rounded-lg transition-all transform hover:scale-105 shadow-lg shadow-[#FF5E5B]/20"
              >
                Hablemos sobre tu negocio 🚀
                <ArrowRight size={18} />
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección 4: Autoevaluación interactiva */}
      <section id="evaluacion" className="py-20 bg-[#1A0A4A]/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A4A] to-[#250F64] opacity-80"></div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" variants={fadeInUp}>
              ¿Está tu negocio listo para crecer?
            </motion.h2>
            <motion.p className="text-xl text-white/80 mb-8 text-center" variants={fadeInUp}>
              Descubrí en 3 minutos si tu estrategia de marketing está optimizada para el crecimiento.
            </motion.p>

            <motion.div
              className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-8 backdrop-blur-sm mb-8 border border-white/10"
              variants={fadeInUp}
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="md:w-1/3 flex justify-center">
                  <div className="w-32 h-32 bg-[#8B7FD7]/20 rounded-full flex items-center justify-center">
                    <BarChart className="text-[#8B7FD7]" size={48} />
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-bold mb-4">Diagnóstico Estratégico</h3>
                  <p className="text-lg mb-6">
                    Este diagnóstico rápido te ayudará a identificar oportunidades de crecimiento y áreas donde
                    podríamos potenciar tu negocio.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>9 preguntas estratégicas sobre tu negocio</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>Resultados personalizados al instante</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                      <span>Recomendaciones específicas para tu situación</span>
                    </li>
                  </ul>
                  <button
                    onClick={() => setEvaluacionModalOpen(true)}
                    className="w-full bg-gradient-to-r from-[#8B7FD7] to-[#A99FE5] hover:from-[#8B7FD7] hover:to-[#8B7FD7] text-white font-medium px-6 py-4 rounded-lg transition-all text-lg shadow-lg shadow-[#8B7FD7]/20"
                  >
                    Realizar diagnóstico gratuito
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección 5: Empresas con las que hemos trabajado */}
      <section id="clientes" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#250F64] to-[#1A0A4A] opacity-80"></div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" variants={fadeInUp}>
              Empresas que confían en nosotros
            </motion.h2>
            <motion.p className="text-xl text-white/80 mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
              Estas son algunas de las startups y pymes con las que hemos trabajado para potenciar su crecimiento.
            </motion.p>

            <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" variants={staggerContainer}>
              {/* Startup 1 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#4ECDC4]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#4ECDC4]">Startup 1</span>
                </div>
              </motion.div>

              {/* Startup 2 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#8B7FD7]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#8B7FD7]">Startup 2</span>
                </div>
              </motion.div>

              {/* Pyme 1 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#FF5E5B]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#FF5E5B]">Pyme 1</span>
                </div>
              </motion.div>

              {/* Pyme 2 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#F7C45A]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#F7C45A]">Pyme 2</span>
                </div>
              </motion.div>

              {/* Startup 3 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#4ECDC4]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#4ECDC4]">Startup 3</span>
                </div>
              </motion.div>

              {/* Startup 4 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#8B7FD7]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#8B7FD7]">Startup 4</span>
                </div>
              </motion.div>

              {/* Pyme 3 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#FF5E5B]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#FF5E5B]">Pyme 3</span>
                </div>
              </motion.div>

              {/* Pyme 4 */}
              <motion.div
                className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 transition-all duration-300 flex items-center justify-center h-28 hover:from-white/15 hover:to-white/10 border border-white/10 hover:border-[#F7C45A]/30 group"
                variants={fadeInUp}
              >
                <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl font-bold text-[#F7C45A]">Pyme 4</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div className="mt-12 text-center" variants={fadeInUp}>
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg transition-all border border-white/10"
              >
                Tu marca podría estar aquí
                <ArrowRight size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección 6: Contacto */}
      <section id="contacto" className="py-20 bg-[#1A0A4A]/80 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A4A] to-[#250F64] opacity-80"></div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-8 text-center" variants={fadeInUp}>
              Hablemos sobre tu negocio
            </motion.h2>
            <motion.p className="text-xl text-white/80 mb-12 text-center" variants={fadeInUp}>
              Completá el formulario y nos pondremos en contacto contigo lo antes posible, o agendá directamente una
              reunión en nuestro calendario.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <ContactForm />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FAQ - Preguntas frecuentes */}
      <section id="faq" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#250F64] to-[#1A0A4A] opacity-80"></div>
        <div className="container max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
          >
            <motion.h2 className="text-3xl md:text-4xl font-bold mb-4 text-center" variants={fadeInUp}>
              Preguntas Frecuentes
            </motion.h2>
            <motion.p className="text-xl text-white/80 mb-12 text-center max-w-3xl mx-auto" variants={fadeInUp}>
              Todo lo que necesitás saber sobre cómo Vernon+ puede ayudar a tu negocio a crecer
            </motion.p>

            <motion.div variants={fadeInUp}>
              <FaqSection />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 bg-[#1A0A4A] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A0A4A] to-[#250F64] opacity-80"></div>
        <div className="container max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-bold mb-2">Vernon+</h3>
              <Link href="#nosotros" className="text-white/60 hover:text-white transition-colors">
                Quiénes somos
              </Link>
              <Link href="#planes" className="text-white/60 hover:text-white transition-colors">
                Planes y servicios
              </Link>
              <Link href="#evaluacion" className="text-white/60 hover:text-white transition-colors">
                ¿Vernon+ es para vos?
              </Link>
              <Link href="#clientes" className="text-white/60 hover:text-white transition-colors">
                Nuestros clientes
              </Link>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-bold mb-2">Legal</h3>
              <Link href="/terms" className="text-white/60 hover:text-white transition-colors">
                Términos y condiciones
              </Link>
              <Link href="/privacy" className="text-white/60 hover:text-white transition-colors">
                Política de privacidad
              </Link>
            </div>

            <div className="flex flex-col space-y-4">
              <h3 className="text-lg font-bold mb-2">Contacto</h3>
              <a href="mailto:HELLO@WEAREVERNON.COM" className="text-white/60 hover:text-white transition-colors">
                HELLO@WEAREVERNON.COM
              </a>
              <a
                href="https://wa.me/yourphonenumber"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Vernon Creative Bureau
              </Link>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">© {new Date().getFullYear()} Vernon Creative Bureau</p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/vernon-creative-bureau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                LinkedIn
              </a>
              <a
                href="https://www.instagram.com/vernon.creative.bureau"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
