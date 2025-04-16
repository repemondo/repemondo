"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ExternalLinkModal } from "@/components/external-link-modal"
import { AutoEvaluacionModal } from "@/components/auto-evaluacion-modal"
import { StickyMenu } from "@/components/vernon-plus/sticky-menu"
import { MobileCTA } from "@/components/vernon-plus/mobile-cta"
import { WhatsAppButton } from "@/components/vernon-plus/whatsapp-button"
import { ContactForm } from "@/components/vernon-plus/contact-form"
import { Check, ArrowRight, MessageCircle, Star, Zap, Users, BarChart, Calendar } from "lucide-react"

export default function VernonPlusClientPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [externalUrl, setExternalUrl] = useState("")
  const [evaluacionModalOpen, setEvaluacionModalOpen] = useState(false)

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

  return (
    <main className="min-h-screen bg-[#250F64] text-white">
      {/* Sticky Menu */}
      <StickyMenu onOpenEvaluacion={() => setEvaluacionModalOpen(true)} />

      {/* Mobile CTA */}
      <MobileCTA onClick={handleMobileCTAClick} />

      {/* WhatsApp Button */}
      <WhatsAppButton />

      {/* Modals */}
      <ExternalLinkModal isOpen={modalOpen} onClose={() => setModalOpen(false)} url={externalUrl} />
      <AutoEvaluacionModal isOpen={evaluacionModalOpen} onClose={() => setEvaluacionModalOpen(false)} />

      {/* Stars Background */}
      <div className="fixed inset-0 pointer-events-none">{generateStars(40)}</div>

      {/* Sección 1: Hero – Impacto Directo */}
      <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Marketing y Publicidad Estratégica para Startups y Pymes.
              </h1>
              <p className="text-xl text-white/80 mb-8 max-w-xl">
                Después de +10 años trabajando con grandes marcas, decidimos poner nuestra experiencia al servicio de
                startups y pymes. Creamos estrategias de comunicación y crecimiento para negocios que quieren avanzar al
                siguiente nivel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="inline-flex items-center justify-center gap-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-8 py-4 rounded-full transition-all transform hover:scale-105"
                >
                  <MessageCircle size={20} />
                  Hablemos y llevemos tu negocio al siguiente nivel
                </button>
                <button
                  onClick={() => scrollToSection("servicios")}
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-4 rounded-full transition-all"
                >
                  <ArrowRight size={20} />
                  Explorá cómo podemos ayudarte
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/mouse-laptop.svg"
                  alt="Vernon+ para startups y pymes"
                  fill
                  className="object-contain floating"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 2: No somos una agencia de marketing más */}
      <section id="nosotros" className="py-20 bg-[#1A0A4A]">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              No somos un proveedor, somos tu equipo de marketing y publicidad.
            </h2>
            <p className="text-xl text-white/80 mb-12 text-center">
              Sabemos lo difícil que es hacer crecer un negocio. Los costos suben, la competencia crece y el tiempo
              nunca alcanza. Pero con una estrategia clara, creatividad bien aplicada y comunicación efectiva, cualquier
              pyme puede escalar como una gran marca.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-[#8B7FD7] rounded-full flex items-center justify-center mb-4">
                  <Users className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Nos integramos a tu equipo</h3>
                <p className="text-white/70">
                  Trabajamos como parte de tu empresa, entendiendo tus objetivos y alineándonos con tu visión.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-[#4ECDC4] rounded-full flex items-center justify-center mb-4">
                  <BarChart className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Estrategias para escalar</h3>
                <p className="text-white/70">
                  Diseñamos planes de crecimiento sostenible y medible, enfocados en resultados concretos.
                </p>
              </div>

              <div className="bg-white/5 rounded-xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="w-12 h-12 bg-[#FF5E5B] rounded-full flex items-center justify-center mb-4">
                  <Zap className="text-white" size={20} />
                </div>
                <h3 className="text-xl font-bold mb-2">Experiencia adaptada</h3>
                <p className="text-white/70">
                  Aplicamos lo aprendido con grandes marcas, adaptado a las necesidades y presupuestos de pymes.
                </p>
              </div>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => scrollToSection("servicios")}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-medium px-8 py-3 rounded-lg transition-all"
              >
                Explorá cómo podemos ayudarte
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 3: Problemas comunes que resolvemos */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Si te sentís identificado con alguno de estos problemas, podemos ayudarte.
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#FF5E5B]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#FF5E5B] text-xl font-bold">📉</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">"Sé que necesito marketing, pero no sé por dónde empezar."</h3>
                  <p className="text-white/70">
                    Te damos un roadmap claro para hacer crecer tu negocio de forma estratégica.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#F7C45A]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#F7C45A] text-xl font-bold">💰</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    "No quiero gastar en marketing sin saber si va a funcionar."
                  </h3>
                  <p className="text-white/70">
                    Diseñamos estrategias medibles, sin promesas vacías. Lo que no genera resultados, no se hace.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#4ECDC4]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#4ECDC4] text-xl font-bold">⏳</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    "No tengo tiempo ni equipo para manejar redes y publicidad."
                  </h3>
                  <p className="text-white/70">
                    Nos convertimos en tu equipo de marketing sin que tengas que contratar gente interna.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-[#8B7FD7]/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-[#8B7FD7] text-xl font-bold">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    "Probé con agencias antes, pero sentí que no entendían mi negocio."
                  </h3>
                  <p className="text-white/70">
                    Nos involucramos en el ADN de tu empresa y trabajamos contigo, no en piloto automático.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => scrollToSection("contacto")}
              className="inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              Quiero una estrategia pensada para mi negocio
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Sección 4: Nuestros Servicios */}
      <section id="servicios" className="py-20 bg-[#1A0A4A]">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Estrategia + Creatividad + Performance</h2>
          <h3 className="text-2xl font-bold mb-12 text-center text-[#4ECDC4]">= Crecimiento real</h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Branding & Identidad */}
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#8B7FD7] rounded-full flex items-center justify-center mb-6">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Branding & Identidad</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Naming y estrategia de marca</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Diseño de identidad visual</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Posicionamiento estratégico</span>
                </li>
              </ul>
            </div>

            {/* Comunicación & Contenidos */}
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#FF5E5B] rounded-full flex items-center justify-center mb-6">
                <MessageCircle className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Comunicación & Contenidos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Gestión de redes sociales</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Contenido estratégico</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Desarrollo de landing pages</span>
                </li>
              </ul>
            </div>

            {/* Performance & Escalabilidad */}
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#4ECDC4] rounded-full flex items-center justify-center mb-6">
                <BarChart className="text-white" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Performance & Escalabilidad</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Meta Ads y Google Ads</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>SEO y posicionamiento</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Growth Marketing</span>
                </li>
              </ul>
            </div>

            {/* Acompañamiento mensual */}
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="w-16 h-16 bg-[#F7C45A] rounded-full flex items-center justify-center mb-6">
                <Calendar className="text-black" size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-4">Acompañamiento mensual</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Tu departamento de marketing</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Estrategia y ejecución</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check size={18} className="text-[#4ECDC4] mt-1 flex-shrink-0" />
                  <span>Reportes y optimización</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => scrollToSection("contacto")}
              className="inline-flex items-center gap-2 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-8 py-4 rounded-lg transition-all transform hover:scale-105"
            >
              Explorá cómo podemos ayudarte
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* Sección 5: Autoevaluación interactiva */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              ¿Tu negocio está listo para crecer con marketing estratégico?
            </h2>
            <p className="text-xl text-white/80 mb-8 text-center">
              Hacé este test de 7 preguntas y descubrí si Vernon+ es lo que tu empresa necesita.
            </p>

            <div className="bg-white/5 rounded-xl p-8 backdrop-blur-sm mb-8">
              <p className="text-xl mb-6">
                No somos para todos. Si buscás atajos o soluciones genéricas, esta no es tu agencia.
              </p>
              <p className="text-xl mb-6">Si querés hacer crecer tu negocio con estrategias reales, hablemos.</p>

              <button
                onClick={() => setEvaluacionModalOpen(true)}
                className="w-full bg-[#8B7FD7] hover:bg-[#8B7FD7]/90 text-white font-medium px-6 py-4 rounded-lg transition-all text-lg"
              >
                Hacé nuestra autoevaluación
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-20 bg-[#1A0A4A]">
        <div className="container max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">Lo que dicen nuestros clientes</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#F7C45A] fill-[#F7C45A]" size={20} />
                ))}
              </div>
              <p className="text-xl mb-6">"Gracias a Vernon+ escalamos nuestras ventas un 200% en 6 meses."</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#8B7FD7] rounded-full"></div>
                <div>
                  <p className="font-bold">Martín Rodríguez</p>
                  <p className="text-white/60">CEO, TechStartup</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="text-[#F7C45A] fill-[#F7C45A]" size={20} />
                ))}
              </div>
              <p className="text-xl mb-6">
                "No teníamos equipo de marketing, ahora sentimos que somos una gran marca."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#FF5E5B] rounded-full"></div>
                <div>
                  <p className="font-bold">Laura Gómez</p>
                  <p className="text-white/60">Fundadora, EcoEmprende</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección 6: Contacto */}
      <section id="contacto" className="py-20">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              ¿Listo para llevar tu negocio al siguiente nivel?
            </h2>
            <p className="text-xl text-white/80 mb-12 text-center">
              Completá el formulario y nos pondremos en contacto contigo lo antes posible, o agendá directamente una
              reunión en nuestro calendario.
            </p>

            <ContactForm />
          </div>
        </div>
      </section>

      {/* Footer Simple */}
      <footer className="py-8 border-t border-white/10">
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 mb-4 md:mb-0">© {new Date().getFullYear()} Vernon Creative Bureau</p>
            <div className="flex items-center gap-6">
              <Link href="/" className="text-white/60 hover:text-white transition-colors">
                Volver a Vernon
              </Link>
              <a href="mailto:HELLO@WEAREVERNON.COM" className="text-white/60 hover:text-white transition-colors">
                HELLO@WEAREVERNON.COM
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
