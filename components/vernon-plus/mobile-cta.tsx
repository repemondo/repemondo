"use client"

import { MessageCircle } from "lucide-react"

interface MobileCTAProps {
  onClick: () => void
}

export function MobileCTA({ onClick }: MobileCTAProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40 bg-[#FF5E5B] hover:bg-[#FF5E5B]/90 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all md:hidden flex items-center gap-2"
    >
      <MessageCircle size={18} />
      Hablemos
    </button>
  )
}
