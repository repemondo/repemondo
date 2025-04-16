"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface VernonPlusModalProps {
  isOpen: boolean
  onClose: () => void
}

export function VernonPlusModal({ isOpen, onClose }: VernonPlusModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    if (isOpen) {
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  if (!mounted) return null
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
      <div className="bg-[#1A0A4A] border border-[#8B7FD7]/30 rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/vernon%2B-logo-VeID3YGSKawXyWIOOf3Lj9S8rJxaJh.png"
              alt="Vernon+"
              width={140}
              height={40}
              className="h-10 w-auto"
              priority
            />
          </div>
          <h3 className="text-xl font-bold text-white mb-4">¿Qué es Vernon+?</h3>
          <p className="text-white/80 mb-4">
            Vernon+ es nuestra unidad especializada en acompañar a startups y pymes que buscan crecer con estrategia,
            creatividad y resultados reales.
          </p>
          <p className="text-white/80 mb-6">
            Si tenés un negocio en expansión o estás empezando, este es el espacio pensado para vos: soluciones
            prácticas, asequibles y a medida, sin perder la calidad que nos define.
          </p>
          <div className="mb-6 text-left">
            <p className="text-white/80 mb-4">
              👉 Si liderás una marca consolidada o un proyecto de alto impacto, te invitamos a seguir explorando Vernon
              Creative Bureau.
            </p>
            <p className="text-white/80">📍 ¿Querés ver qué puede hacer Vernon+ por tu negocio?</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center space-x-0 sm:space-x-4 space-y-4 sm:space-y-0">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
          >
            Seguir en Vernon
          </button>
          <Link
            href="/vernon-plus"
            className="px-4 py-2 bg-[#f7c45a] hover:bg-[#f7c45a]/80 text-black font-medium rounded-md transition-colors flex items-center justify-center"
          >
            Ir a Vernon+
          </Link>
        </div>
      </div>
    </div>
  )
}
