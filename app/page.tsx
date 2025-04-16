"use client"

import { useState, useEffect, useRef } from "react"
import { Navbar } from "@/components/navbar"
import { ExternalLinkModal } from "@/components/external-link-modal"
import Image from "next/image"
import { Instagram, Linkedin, ExternalLink } from "lucide-react"
import { NosotrosSection } from "@/components/nosotros-section"
import { StarCursorEffect } from "@/components/star-cursor-effect"
import { ContactCTAButton } from "@/components/contact-cta-button"

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
  const scrollRef = useRef<HTMLDivElement>(null)

  // Efecto para la animación de desplazamiento horizontal
  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.3 // Velocidad reducida para una transición más suave

    const scroll = () => {
      if (!scrollContainer) return

      scrollPosition += scrollSpeed

      // Cuando llegamos al final, reiniciamos suavemente al principio
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        // Reiniciar al principio sin salto visual
        scrollPosition = 0
      }

      scrollContainer.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    // Iniciar la animación
    animationFrameId = requestAnimationFrame(scroll)

    // Pausar la animación cuando el mouse está sobre el contenedor
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId)
    }

    // Reanudar la animación cuando el mouse sale del contenedor
    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", handleMouseEnter)
    scrollContainer.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handleMouseEnter)
        scrollContainer.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  const handleExternalLinkClick = (url: string) => {
    setExternalUrl(url)
    setModalOpen(true)
  }

  // Función para generar estrellas con colores aleatorios según la distribución solicitada
  const generateStars = (count: number) => {
    return [...Array(count)].map((_, i) => {
      // Determinar el color de la estrella (90% blancas, 5% rojas, 5% amarillas)
      const colorRandom = Math.random() * 100
      let starColor = "white" // Color por defecto (90%)

      if (colorRandom > 90 && colorRandom <= 95) {
        starColor = "#fc6059" // 5% rojas
      } else if (colorRandom > 95) {
        starColor = "#f7c45a" // 5% amarillas
      }

      // Añadir variación en el tamaño para más dinamismo
      const size = Math.random() * 1.5 + 1 // Tamaño entre 1px y 2.5px

      return (
        <div
          key={i}
          className="fixed star cursor-follow"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${Math.random() * 2}s`,
            backgroundColor: starColor,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )
    })
  }

  // Función para mostrar el título con formato
  const renderTitle = () => {
    return (
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium leading-tight headline-hero">
        <div className="mb-2">
          Comunicación <span className="text-[#f7c45a]">con propósito</span>
        </div>
        <div className="relative inline-block">
          para{" "}
          <span className="relative">
            marcas que lo entienden
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#fc6059]"></span>
          </span>
          .
        </div>
      </h1>
    )
  }

  return (
    <main className="min-h-screen bg-[#220909] starry-bg text-white">
      <Navbar />
      <ExternalLinkModal isOpen={modalOpen} onClose={() => setModalOpen(false)} url={externalUrl} />
      <StarCursorEffect />

      {/* Stars */}
      <div className="fixed inset-0 pointer-events-none z-0">{generateStars(48)}</div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center pt-24">
        <div className="container max-w-6xl mx-auto text-center px-6">
          <div className="mb-8 h-[180px] md:h-[220px] flex items-center justify-center relative z-10">
            <div className="relative inline-block text-center">{renderTitle()}</div>
          </div>

          {/* TRUSTED BY Section */}
          <div className="mt-12 mb-16">
            <p className="text-[#f7c45a] text-sm tracking-widest font-medium mb-6">CON LA CONFIANZA DE:</p>

            {/* Contenedor con desplazamiento horizontal */}
            <div className="relative overflow-hidden w-full">
              <div
                ref={scrollRef}
                className="flex items-center gap-12 py-4 whitespace-nowrap overflow-x-hidden"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {/* Primera serie de logos */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_accenture_NOcolor-G0bTsRRXjygZlSeOh7MqUqee17T24Z.svg"
                  alt="Accenture"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_aon_NOcolor-S81fxFjSTUuOY1DmZoAFqb3WSfByK3.svg"
                  alt="AON"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_bayer_NOcolor-D2YIHXk3hv1Ob1XgeaNuMXdG23cIns.svg"
                  alt="Bayer"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_bsasciudad_NOcolor-iBTZg46gCsAHYvZ42PxCx8Qco6H6SM.png"
                  alt="Buenos Aires Ciudad"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_cartier_NOcolor-AzATK6nykjYJYG1LOKn9XU1DuqEBrH.svg"
                  alt="Cartier"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_casalta_NOcolor-QpcuG9hsHeFmgvB6Bm4i0bz28tPz0z.svg"
                  alt="Casalta"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_despegar_NOcolor-0wTWnxJvg3wwpuylDUmGDBRz3zIBv1.svg"
                  alt="Despegar"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_eurosilicone_NOcolor-co1VeIHDXROmZMPZvJvD0SUgefarcw.svg"
                  alt="Eurosilicone"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_greenpeace_NOcolor-Cfi1pGgbVIfRK8BQ6k9LBe7BZpUCma.svg"
                  alt="Greenpeace"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_gsk_NOcolor-olj51pwPHgmYaPf04bezO7D17n7xAD.svg"
                  alt="GSK"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/merz-aesthetics-bK0LpU72jlFFDcQllsviKDFLo3P342.png"
                  alt="Merz Aesthetics"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_mondelez_NOcolor-pppLhhxhXfWKuQVc9CK7V7Ao0axH8g.svg"
                  alt="Mondelez"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_porta_NOcolor-FHflkcjRhIUuKO34NPOcKeClXWAogz.png"
                  alt="Porta"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_roche_NOcolor-HbqRxMo7Y7ToF6fGLFaSMOjMnfYmTV.svg"
                  alt="Roche"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_roggio_NOcolor-OkmNMUsr9pSIKB0skFuxOAHXK8WE8N.svg"
                  alt="Roggio"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />

                {/* Duplicar los logos para crear un efecto continuo */}
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_accenture_NOcolor-G0bTsRRXjygZlSeOh7MqUqee17T24Z.svg"
                  alt="Accenture"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_aon_NOcolor-S81fxFjSTUuOY1DmZoAFqb3WSfByK3.svg"
                  alt="AON"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_bayer_NOcolor-D2YIHXk3hv1Ob1XgeaNuMXdG23cIns.svg"
                  alt="Bayer"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_bsasciudad_NOcolor-iBTZg46gCsAHYvZ42PxCx8Qco6H6SM.png"
                  alt="Buenos Aires Ciudad"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_cartier_NOcolor-AzATK6nykjYJYG1LOKn9XU1DuqEBrH.svg"
                  alt="Cartier"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_casalta_NOcolor-QpcuG9hsHeFmgvB6Bm4i0bz28tPz0z.svg"
                  alt="Casalta"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_despegar_NOcolor-0wTWnxJvg3wwpuylDUmGDBRz3zIBv1.svg"
                  alt="Despegar"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_eurosilicone_NOcolor-co1VeIHDXROmZMPZvJvD0SUgefarcw.svg"
                  alt="Eurosilicone"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_greenpeace_NOcolor-Cfi1pGgbVIfRK8BQ6k9LBe7BZpUCma.svg"
                  alt="Greenpeace"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_gsk_NOcolor-olj51pwPHgmYaPf04bezO7D17n7xAD.svg"
                  alt="GSK"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/merz-aesthetics-bK0LpU72jlFFDcQllsviKDFLo3P342.png"
                  alt="Merz Aesthetics"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_mondelez_NOcolor-pppLhhxhXfWKuQVc9CK7V7Ao0axH8g.svg"
                  alt="Mondelez"
                  width={80}
                  height={40}
                  className="h-8 w-auto opacity-80 hover:opacity-100 transition-all duration-300 brightness-[0] sepia-[100%] hue-rotate-[5deg] saturate-[1000%] invert-[50%]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="scroll-indicator"
          onClick={() => {
            const servicesSection = document.getElementById("servicios")
            servicesSection?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#f7c45a]"
          >
            <path
              d="M12 5L12 19M12 19L19 12M12 19L5 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-24 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 headline-section">¿Cómo podemos</h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 headline-section">ayudarte?</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Nuestros servicios están diseñados para potenciar tu marca y conectar con tu audiencia
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Strategic Consulting */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-[#fc3536]/30 transition-all duration-300 flex flex-col min-h-[500px]">
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#fc3536]/20 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M12 2V4" stroke="#fc3536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M12 20V22"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M4.93 4.93L6.34 6.34"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M17.66 17.66L19.07 19.07"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M2 12H4" stroke="#fc3536" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M20 12H22"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M6.34 17.66L4.93 19.07"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M19.07 4.93L17.66 6.34"
                        stroke="#fc3536"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg uppercase tracking-wider text-[#fc3536] font-medium mb-3">
                    CONSULTORÍA
                    <br />
                    EN COMUNICACIÓN
                  </h3>
                  <div className="border-b border-white/20 mb-4"></div>
                  <div className="mb-4">
                    <h4 className="text-2xl font-bold">SER UNA MARCA RELEVANTE</h4>
                    <p className="text-lg font-caveat text-[#fc3536]">es aportar valor a las personas</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 flex-grow">
                  Guiamos a nuestros clientes en la superación de los desafíos más complejos en la comunicación de
                  marca, con el objetivo de convertirla en una marca altamente relevante que aporte un valor
                  significativo a las personas.
                </p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#fc3536]">•</span>
                    <span className="text-white/80">Investigación/Diagnóstico</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#fc3536]">•</span>
                    <span className="text-white/80">Estrategia y Planificación</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Solutions */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-[#ff7c00]/30 transition-all duration-300 flex flex-col min-h-[500px]">
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#ff7c00]/20 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="#ff7c00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8 14C8 14 9.5 16 12 16C14.5 16 16 14 16 14"
                        stroke="#ff7c00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 9H9.01"
                        stroke="#ff7c00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M15 9H15.01"
                        stroke="#ff7c00"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg uppercase tracking-wider text-[#ff7c00] font-medium mb-3">
                    SOLUCIONES
                    <br />
                    CREATIVAS
                  </h3>
                  <div className="border-b border-white/20 mb-4"></div>
                  <div className="mb-4">
                    <h4 className="text-2xl font-bold">BASTA DE DECIR ALWAYS-ON</h4>
                    <p className="text-lg font-caveat text-[#ff7c00]">digamos "Always-In"</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 flex-grow">
                  La comunicación marcaria debe ser coherente en todos los canales donde esté presente. Trabajamos en
                  estrategias de comunicación 360 que conecten eficazmente con nuestro público objetivo y generen un
                  impacto real y medible.
                </p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff7c00]">•</span>
                    <span className="text-white/80">Conceptualización/Creación</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#ff7c00]">•</span>
                    <span className="text-white/80">Gestión</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Technological Development */}
            <div className="bg-gradient-to-b from-white/10 to-white/5 rounded-xl overflow-hidden shadow-lg border border-white/10 hover:border-[#5657a9]/30 transition-all duration-300 flex flex-col min-h-[500px]">
              <div className="p-8 flex flex-col h-full">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#5657a9]/20 flex items-center justify-center mb-4">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
                        stroke="#5657a9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M22 12H18"
                        stroke="#5657a9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M6 12H2" stroke="#5657a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M12 6V2" stroke="#5657a9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M12 22V18"
                        stroke="#5657a9"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg uppercase tracking-wider text-[#5657a9] font-medium mb-3">
                    DESARROLLO
                    <br />
                    TECNOLÓGICO
                  </h3>
                  <div className="border-b border-white/20 mb-4"></div>
                  <div className="mb-4">
                    <h4 className="text-2xl font-bold">LO RETRO NO SIEMPRE ES COOL</h4>
                    <p className="text-lg font-caveat text-[#5657a9]">la presencia digital es clave</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 flex-grow">
                  Ofrecemos desarrollo tecnológico con soluciones de vanguardia, brindando experiencias digitales
                  alineadas a la estrategia de marca, para que puedas mostrar tu presencia digital con orgullo y generar
                  resultados tangibles.
                </p>
                <div className="mt-auto space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[#5657a9]">•</span>
                    <span className="text-white/80">Desarrollo</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5657a9]">•</span>
                    <span className="text-white/80">UX / UI</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#5657a9]">•</span>
                    <span className="text-white/80">Nerdy Stuff (AI, APIs, etc.)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nosotros Section */}
      <NosotrosSection />

      {/* Clientes Section */}
      <section id="clientes" className="py-24 bg-black">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 headline-section">Creyeron en nosotros.</h2>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 headline-section">Creamos con ellos.</h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Cuáles son algunas de las marcas que han confiado y confían en Vernon Creative Bureau
            </p>
          </div>

          {/* Grid de logos ordenados alfabéticamente */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 md:gap-12">
            {/* Accenture */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_accenture_NOcolor-G0bTsRRXjygZlSeOh7MqUqee17T24Z.svg"
                alt="Accenture"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* AON */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_aon_NOcolor-S81fxFjSTUuOY1DmZoAFqb3WSfByK3.svg"
                alt="AON"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Bayer */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_bayer_NOcolor-D2YIHXk3hv1Ob1XgeaNuMXdG23cIns.svg"
                alt="Bayer"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Buenos Aires Ciudad */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_bsasciudad_NOcolor-iBTZg46gCsAHYvZ42PxCx8Qco6H6SM.png"
                alt="Buenos Aires Ciudad"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Cartier */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_cartier_NOcolor-AzATK6nykjYJYG1LOKn9XU1DuqEBrH.svg"
                alt="Cartier"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Casalta */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_casalta_NOcolor-QpcuG9hsHeFmgvB6Bm4i0bz28tPz0z.svg"
                alt="Casalta"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Despegar */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_despegar_NOcolor-0wTWnxJvg3wwpuylDUmGDBRz3zIBv1.svg"
                alt="Despegar"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Eurosilicone */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_eurosilicone_NOcolor-co1VeIHDXROmZMPZvJvD0SUgefarcw.svg"
                alt="Eurosilicone"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Greenpeace */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_greenpeace_NOcolor-Cfi1pGgbVIfRK8BQ6k9LBe7BZpUCma.svg"
                alt="Greenpeace"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* GSK */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_gsk_NOcolor-olj51pwPHgmYaPf04bezO7D17n7xAD.svg"
                alt="GSK"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Merz Aesthetics (Reemplazado) */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/merz-aesthetics-bK0LpU72jlFFDcQllsviKDFLo3P342.png"
                alt="Merz Aesthetics"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Mondelez */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_mondelez_NOcolor-pppLhhxhXfWKuQVc9CK7V7Ao0axH8g.svg"
                alt="Mondelez"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Porta */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_porta_NOcolor-FHflkcjRhIUuKO34NPOcKeClXWAogz.png"
                alt="Porta"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Roche */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_roche_NOcolor-HbqRxMo7Y7ToF6fGLFaSMOjMnfYmTV.svg"
                alt="Roche"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>

            {/* Roggio */}
            <div className="flex items-center justify-center p-4 transition-all duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo_roggio_NOcolor-OkmNMUsr9pSIKB0skFuxOAHXK8WE8N.svg"
                alt="Roggio"
                width={100}
                height={60}
                className="h-12 w-auto opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Prensa Section */}
      <section id="prensa" className="py-24 bg-gradient-to-b from-black to-[#1a0a0a]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-[#f7c45a] headline-accent">
              ABRAKADABRA!
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto">
              Momentos en la prensa que nos llenan de orgullo :)
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Press Item 1 - Forbes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 flex items-center">
                  <Image src="/logos/forbes-white.svg" alt="Forbes" width={120} height={40} className="h-8 w-auto" />
                </div>
                <button
                  onClick={() =>
                    handleExternalLinkClick(
                      "https://www.forbesargentina.com/columnistas/las-audiencias-evolucionan-mas-rapido-estrategia-corporativa-hay-adaptarse-asap-n33237",
                    )
                  }
                  className="text-[#f7c45a] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Ver artículo original"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-4 text-[#f7c45a]">
                  Las audiencias evolucionan más rápido que la estrategia corporativa: hay que adaptarse ASAP
                </h3>
                <p className="text-white/70 mb-4">
                  Las audiencias cambian más rápido de lo que muchas marcas pueden reaccionar. Adaptarse no es una
                  opción, es una necesidad. En este artículo, exploramos cómo la segmentación y personalización en la
                  comunicación corporativa pueden marcar la diferencia en un entorno donde la identidad de marca debe
                  mantenerse sólida, pero flexible a la vez.
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#f7c45a] font-medium">Forbes</span>
                <span className="text-white/60"></span>
              </div>
            </div>

            {/* Press Item 2 - La Nación */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 flex items-center">
                  <Image
                    src="/logos/lanacion-white.svg"
                    alt="La Nación"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={() =>
                    handleExternalLinkClick(
                      "https://www.lanacion.com.ar/economia/negocios/inteligencia-artificial-creatividad-la-sorprendente-aliada-de-la-publicidad-nid04022023/",
                    )
                  }
                  className="text-[#f7c45a] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Ver artículo original"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-4 text-[#f7c45a]">
                  Creatividad e Inteligencia Artificial: La nueva dupla de la publicidad
                </h3>
                <p className="text-white/70 mb-4">
                  Las herramientas de IA generativa están transformando la industria publicitaria, pero la creatividad
                  humana sigue siendo el factor clave para diferenciación y valor agregado. En esta nota, Roberto
                  Repetto, Co-founder y General Manager de Vernon Creative Bureau, analiza el impacto de la IA en los
                  procesos creativos y cómo las agencias pueden potenciar su uso sin perder su esencia estratégica.
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#f7c45a] font-medium">La Nación</span>
                <span className="text-white/60"></span>
              </div>
            </div>

            {/* Press Item 3 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 flex items-center">
                  <Image
                    src="/logos/marketingdirecto-white.png"
                    alt="Marketing Directo"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={() =>
                    handleExternalLinkClick(
                      "https://www.marketingdirecto.com/especiales/reportajes-a-fondo/publicidad-necesita-milagros-industria-ruega-san-publicito",
                    )
                  }
                  className="text-[#f7c45a] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Ver artículo original"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-4 text-[#f7c45a]">
                  San Publicito al rescate: la publicidad necesita milagros (y esta campaña lo deja claro)
                </h3>
                <p className="text-white/70 mb-4">
                  En el Día de la Publicidad, MarketingDirecto.com y Vernon Creative Bureau presentan una campaña que
                  mezcla humor, ironía y una cruda realidad: la industria publicitaria sigue arrastrando vicios
                  difíciles de erradicar. Con un sketch satírico y estampitas milagrosas, San Publicito se convierte en
                  el santo al que todos los publicistas le rezan. Pero, ¿qué pasa si en vez de esperar un milagro, nos
                  ponemos a cambiar la industria?
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#f7c45a] font-medium">Marketing Directo</span>
                <span className="text-white/60"></span>
              </div>
            </div>

            {/* Press Item 4 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 flex items-center">
                  <Image
                    src="/logos/marketingdirecto-white.png"
                    alt="Marketing Directo"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={() =>
                    handleExternalLinkClick(
                      "https://www.marketingdirecto.com/punto-de-vista/la-columna/inteligencia-artificial-reemplaza-trabajo-creativo-publicidad",
                    )
                  }
                  className="text-[#f7c45a] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Ver artículo original"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-4 text-[#f7c45a]">
                  Creatividad vs. Inteligencia Artificial: ¿Aliados o competidores en la publicidad?
                </h3>
                <p className="text-white/70 mb-4">
                  Con la llegada de la IA, la industria publicitaria enfrenta un dilema: ¿puede la tecnología reemplazar
                  el ingenio humano o es simplemente una herramienta para potenciarlo? Lejos de ser una amenaza, la
                  inteligencia artificial ofrece nuevas posibilidades para optimizar procesos creativos, agilizar la
                  toma de decisiones y llevar la imaginación más allá de sus límites. Pero la pregunta sigue en el aire:
                  ¿es el fin de la creatividad o el comienzo de una nueva era en la publicidad?
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#f7c45a] font-medium">MarketingDirecto</span>
                <span className="text-white/60"></span>
              </div>
            </div>

            {/* Press Item 5 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 flex items-center">
                  <Image
                    src="/logos/dossiernet-white.svg"
                    alt="DossierNET"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={() =>
                    handleExternalLinkClick(
                      "https://dossiernet.com/articulo/hacete-hpver-la-campana-de-vernon-para-roche-se-expande-a-la-region/28836",
                    )
                  }
                  className="text-[#f7c45a] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Ver artículo original"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-4 text-[#f7c45a]">
                  "Hacete HPVer": la campaña de Vernon para Roche que cruzó fronteras y llegó a toda LATAM
                </h3>
                <p className="text-white/70 mb-4">
                  Lo que comenzó como una campaña disruptiva en Argentina para concientizar sobre el Virus del Papiloma
                  Humano (VPH) se convirtió en un fenómeno regional. "Hacete HPVer", la iniciativa de Vernon Creative
                  Bureau para Roche, no solo generó conversación y engagement en redes, sino que logró expandirse a toda
                  LATAM con versiones adaptadas en distintos países. Con un mensaje claro, cercano y sin distinciones,
                  la campaña sigue derribando mitos y promoviendo la prevención en millones de personas en la región.
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#f7c45a] font-medium">DossierNET</span>
                <span className="text-white/60"></span>
              </div>
            </div>

            {/* Press Item 6 */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 hover:bg-white/10 transition-all duration-300 flex flex-col h-full">
              <div className="flex justify-between items-center mb-6">
                <div className="h-12 flex items-center">
                  <Image
                    src="/logos/totalmedios-white.png"
                    alt="TotalMedios"
                    width={120}
                    height={40}
                    className="h-8 w-auto"
                  />
                </div>
                <button
                  onClick={() =>
                    handleExternalLinkClick(
                      "https://www.totalmedios.com/nota/49835/amame-como-soy-la-campana-de-concientizacion-sobre-la-atrofia-muscular-espinal",
                    )
                  }
                  className="text-[#f7c45a] hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                  aria-label="Ver artículo original"
                >
                  <ExternalLink size={18} />
                </button>
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-4 text-[#f7c45a]">
                  "Amame como soy": la campaña que busca visibilizar la atrofia muscular espinal y derribar prejuicios
                </h3>
                <p className="text-white/70 mb-4">
                  En el Mes de Concientización sobre la Atrofia Muscular Espinal (AME), Familias AME Argentina (FAME),
                  junto a Vernon Creative Bureau y Paradigma, lanzan "Amame como soy", una campaña que invita a
                  reflexionar sobre la realidad de quienes conviven con esta enfermedad genética. a reflexionar sobre la
                  realidad de quienes conviven con esta enfermedad genética. Más allá de las limitaciones físicas, la
                  AME no define los sueños ni las emociones de quienes la padecen. Con un mensaje potente y emotivo, la
                  iniciativa busca generar empatía, derribar estigmas y fomentar una sociedad más inclusiva.
                </p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[#f7c45a] font-medium">TotalMedios</span>
                <span className="text-white/60"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-24 relative">
        <div className="container max-w-6xl mx-auto px-6 text-center">
          <div
            className="relative max-w-4xl mx-auto mb-8 cursor-pointer overflow-hidden rounded-lg"
            onClick={() => document.querySelector(".contact-cta-button")?.click()}
          >
            <Image
              src="/hagamoslos-realidad-banner.png"
              alt="Hagámoslos Realidad - Conejo mágico saliendo de un sombrero"
              width={1200}
              height={300}
              className="w-full h-auto transition-all duration-500 hover:scale-105"
              priority
            />
          </div>
          <ContactCTAButton className="inline-flex items-center justify-center gap-2 bg-[#f7c45a] hover:bg-[#f7c45a]/90 text-black font-medium px-8 py-4 rounded-full text-lg transition-all transform hover:scale-105 mt-6 contact-cta-button">
            ¡Hablemos de tu proyecto!
          </ContactCTAButton>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-[#220909] py-12 overflow-hidden">
        <div className="container max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center">
            {/* Social Media and Copyright - Centered above the eye ball */}
            <div className="flex flex-col items-center justify-center space-y-4 mb-8">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleExternalLinkClick("https://www.linkedin.com/company/vernon-creative-bureau")}
                  className="text-white/80 hover:text-white"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </button>
                <button
                  onClick={() => handleExternalLinkClick("https://www.instagram.com/vernoncreativebureau")}
                  className="text-white/80 hover:text-white"
                  aria-label="Instagram"
                >
                  <Instagram size={20} />
                </button>
              </div>
              <div className="text-center">
                <p className="text-white/80 text-xs">CRAFTED BY VERNON CREATIVE</p>
                <p className="text-white/80 text-xs">© {new Date().getFullYear()} Vernon Creative Bureau</p>
              </div>
            </div>

            {/* Eye Crystal Ball */}
            <div className="relative w-72 h-72 mb-4">
              <Image src="/dibujo_BOLAOJO.png" alt="Eye Crystal Ball" fill className="object-contain" priority />
            </div>
          </div>
        </div>

        {/* Humo izquierdo */}
        <Image
          src="/humo-izq.png"
          alt="Humo izquierdo"
          width={320}
          height={320}
          className="absolute left-0 bottom-0 z-0"
        />

        {/* Humo derecho */}
        <Image
          src="/humo-der.png"
          alt="Humo derecho"
          width={320}
          height={320}
          className="absolute right-0 bottom-0 z-0"
        />
      </footer>
    </main>
  )
}
