"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

interface StickyMenuProps {
  onOpenEvaluacion: () => void
}

export function StickyMenu({ onOpenEvaluacion }: StickyMenuProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <>
      {/* Desktop Menu */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
          isScrolled ? "py-2 bg-[#1A0A4A]/95 backdrop-blur-md shadow-lg" : "py-4 bg-transparent"
        }`}
      >
        <div className="container max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vernon%2B-logo-VeID3YGSKawXyWIOOf3Lj9S8rJxaJh.png"
                alt="Vernon+"
                width={140}
                height={40}
                className={`transition-all duration-300 ${isScrolled ? "h-8" : "h-10"} w-auto`}
                priority
              />
            </Link>

            <div className="flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-white hover:text-[#4ECDC4] transition-colors text-sm font-medium"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("nosotros")}
                className="text-white hover:text-[#4ECDC4] transition-colors text-sm font-medium"
              >
                Nosotros
              </button>
              <button
                onClick={onOpenEvaluacion}
                className="text-white hover:text-[#4ECDC4] transition-colors text-sm font-medium"
              >
                ¿Es Vernon+ para vos?
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-white hover:text-[#4ECDC4] transition-colors text-sm font-medium"
              >
                Contacto
              </button>
              <Link href="/" className="text-white hover:text-[#4ECDC4] transition-colors text-sm font-medium">
                Vernon Creative Bureau
              </Link>
              <button
                onClick={() => scrollToSection("contacto")}
                className="bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-4 py-2 rounded-full transition-all text-sm"
              >
                Quiero crecer 🚀
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden ${
          isScrolled ? "py-2 bg-[#1A0A4A]/95 backdrop-blur-md shadow-lg" : "py-4 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vernon%2B-logo-VeID3YGSKawXyWIOOf3Lj9S8rJxaJh.png"
              alt="Vernon+"
              width={120}
              height={40}
              className={`transition-all duration-300 ${isScrolled ? "h-7" : "h-8"} w-auto`}
              priority
            />
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#1A0A4A]/98 backdrop-blur-md pt-20 md:hidden">
          <div className="container mx-auto px-4 flex flex-col items-center space-y-6 py-8">
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xl font-medium w-full text-center py-3"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection("nosotros")}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xl font-medium w-full text-center py-3"
            >
              Nosotros
            </button>
            <button
              onClick={() => {
                onOpenEvaluacion()
                setMobileMenuOpen(false)
              }}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xl font-medium w-full text-center py-3"
            >
              ¿Es Vernon+ para vos?
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xl font-medium w-full text-center py-3"
            >
              Contacto
            </button>
            <Link
              href="/"
              className="text-white hover:text-[#4ECDC4] transition-colors text-xl font-medium w-full text-center py-3"
            >
              Vernon Creative Bureau
            </Link>
            <button
              onClick={() => {
                scrollToSection("contacto")
                setMobileMenuOpen(false)
              }}
              className="bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-8 py-3 rounded-full transition-all text-lg w-full mt-4"
            >
              Quiero crecer 🚀
            </button>
          </div>
        </div>
      )}

      {/* Mini Menu Sticky en Mobile */}
      <div className="fixed bottom-16 left-0 right-0 z-40 md:hidden">
        <div className="container mx-auto px-4">
          <div className="bg-[#1A0A4A]/95 backdrop-blur-md rounded-full flex justify-between items-center shadow-lg mx-auto max-w-xs">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xs font-medium py-3 px-3 flex-1 text-center"
            >
              Inicio
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xs font-medium py-3 px-3 flex-1 text-center"
            >
              Servicios
            </button>
            <button
              onClick={() => {
                onOpenEvaluacion()
                setMobileMenuOpen(false)
              }}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xs font-medium py-3 px-3 flex-1 text-center"
            >
              Test
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-white hover:text-[#4ECDC4] transition-colors text-xs font-medium py-3 px-3 flex-1 text-center"
            >
              Contacto
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
