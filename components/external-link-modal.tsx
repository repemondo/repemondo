"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

interface ExternalLinkModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
}

export function ExternalLinkModal({ isOpen, onClose, url }: ExternalLinkModalProps) {
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

  const handleConfirm = () => {
    window.open(url, "_blank", "noopener,noreferrer")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-black border border-white/20 rounded-lg shadow-lg max-w-md w-full p-6 relative animate-fadeIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white">
          <X size={20} />
        </button>

        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-white mb-4">Estás saliendo de Vernon Creative Bureau</h3>
          <p className="text-white/80 mb-4">
            Estás a punto de visitar un sitio externo para leer la nota completa. ¿Deseas continuar?
          </p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-[#f7c45a] hover:bg-[#f7c45a]/80 text-black font-medium rounded-md transition-colors"
          >
            Continuar
          </button>
        </div>
      </div>
    </div>
  )
}
