"use client"

import type React from "react"

import { useState } from "react"
import { ContactFormModal } from "@/components/contact-form-modal"

interface ContactCTAButtonProps {
  className?: string
  children?: React.ReactNode
}

export function ContactCTAButton({ className, children }: ContactCTAButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} className={`${className} contact-cta-button`}>
        {children || "¡Hablemos!"}
      </button>
      <ContactFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
