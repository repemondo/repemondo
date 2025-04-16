"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { VernonPlusModal } from "@/components/vernon-plus-modal"
import { ContactFormModal } from "@/components/contact-form-modal"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [vernonPlusModalOpen, setVernonPlusModalOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const pathname = usePathname()
  const isVernonPlus = pathname === "/vernon-plus"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Manejar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("no-scroll")
    } else {
      document.body.classList.remove("no-scroll")
    }

    return () => {
      document.body.classList.remove("no-scroll")
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Función para manejar el scroll suave a las secciones
  const scrollToSection = useCallback((sectionId: string) => {
    // Cerrar el menú móvil
    setMobileMenuOpen(false)

    // Pequeño retraso para permitir que el menú se cierre antes de desplazarse
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        // Calcular la posición considerando el header fijo
        const headerHeight = 80 // Altura aproximada del header
        const elementPosition = element.getBoundingClientRect().top + window.scrollY
        const offsetPosition = elementPosition - headerHeight

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }, 300)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-6",
          scrolled ? "backdrop-blur-md bg-[#220909]/80" : "bg-[#220909]",
          isVernonPlus && (scrolled ? "backdrop-blur-md bg-[#250F64]/80" : "bg-[#250F64]"),
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between relative">
          {/* Botón de menú móvil */}
          <button
            className="md:hidden text-white z-50 mobile-menu-button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection("servicios")} className="nav-link-underline text-[#f7c45a] text-xs">
              SERVICIOS
            </button>
            <button onClick={() => scrollToSection("nosotros")} className="nav-link-underline text-[#f7c45a] text-xs">
              NOSOTROS
            </button>
            <button onClick={() => scrollToSection("clientes")} className="nav-link-underline text-[#f7c45a] text-xs">
              CLIENTES
            </button>
            <button onClick={() => scrollToSection("prensa")} className="nav-link-underline text-[#f7c45a] text-xs">
              PRENSA
            </button>
          </nav>

          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center">
              {isVernonPlus ? (
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vernon%2B-logo-VeID3YGSKawXyWIOOf3Lj9S8rJxaJh.png"
                  alt="Vernon+"
                  width={140}
                  height={40}
                  className={`transition-all duration-300 ${scrolled ? "h-8" : "h-10"} w-auto`}
                  priority
                />
              ) : (
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vernon-logo-Gs3EFaxjLZyMVDQhVa7u8snK3YPWyu.png"
                  alt="Vernon Creative Bureau"
                  width={220}
                  height={75}
                  className="h-16 w-auto hover:scale-105 transition-transform duration-300"
                  priority
                />
              )}
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {isVernonPlus ? (
              <Link href="/" className="nav-link-underline text-[#f7c45a] text-xs">
                VERNON CREATIVE BUREAU
              </Link>
            ) : (
              // TEMPORALMENTE DESACTIVADO: Botón de acceso a Vernon+
              // Para reactivar, simplemente elimina los comentarios /* */ alrededor del botón
              /* 
              <button
                onClick={() => setVernonPlusModalOpen(true)}
                className="nav-link-underline text-[#f7c45a] text-xs"
              >
                VERNON+
              </button>
              */
              // Espacio en blanco para mantener el layout
              <span></span>
            )}
            <button
              onClick={() => setContactModalOpen(true)}
              className="bg-[#f7c45a] hover:bg-[#f7c45a]/90 text-black font-medium px-4 py-2 rounded-full text-xs transition-all"
            >
              HABLEMOS
            </button>
          </nav>
        </div>
      </header>

      {/* Menú móvil - Mejorado con animaciones y transiciones */}
      <div
        className={`fixed inset-0 bg-[#220909] z-40 transition-all duration-300 md:hidden ${
          mobileMenuOpen ? "opacity-98 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <div
          className={`flex flex-col items-center justify-center h-full transition-transform duration-300 ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-10"
          }`}
        >
          <nav className="flex flex-col items-center space-y-8">
            <button onClick={() => scrollToSection("servicios")} className="mobile-menu-button text-lg font-medium">
              SERVICIOS
            </button>
            <button onClick={() => scrollToSection("nosotros")} className="mobile-menu-button text-lg font-medium">
              NOSOTROS
            </button>
            <button onClick={() => scrollToSection("clientes")} className="mobile-menu-button text-lg font-medium">
              CLIENTES
            </button>
            <button onClick={() => scrollToSection("prensa")} className="mobile-menu-button text-lg font-medium">
              PRENSA
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                setTimeout(() => setContactModalOpen(true), 300)
              }}
              className="bg-[#f7c45a] hover:bg-[#f7c45a]/90 text-black font-medium px-6 py-3 rounded-full text-base transition-all mt-4 focus:outline-none"
            >
              HABLEMOS
            </button>
          </nav>
        </div>
      </div>

      {/* Vernon+ Modal */}
      <VernonPlusModal isOpen={vernonPlusModalOpen} onClose={() => setVernonPlusModalOpen(false)} />

      {/* Contact Form Modal */}
      <ContactFormModal isOpen={contactModalOpen} onClose={() => setContactModalOpen(false)} />
    </>
  )
}
