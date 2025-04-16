"use client"

import { MessageSquare } from "lucide-react"

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/yourphonenumber?text=Hola%20Vernon+,%20quiero%20información%20sobre%20sus%20servicios"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 z-40 bg-[#25D366] hover:bg-[#25D366]/90 text-white p-3 rounded-full shadow-lg transition-all"
      aria-label="Contactar por WhatsApp"
    >
      <MessageSquare size={24} fill="white" />
    </a>
  )
}
