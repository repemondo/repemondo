"use client"

import { useEffect } from "react"

export function AudioPreloader() {
  useEffect(() => {
    // Simplemente registrar que el componente se ha montado
    console.log("Audio system initialized")

    // Detectar interacción del usuario para habilitar audio en navegadores restrictivos
    const handleUserInteraction = () => {
      console.log("User interaction detected")
      // No intentamos precargar audio aquí, solo registramos la interacción
    }

    // Agregar listeners para varios eventos de interacción
    document.addEventListener("click", handleUserInteraction, { once: true })
    document.addEventListener("touchstart", handleUserInteraction, { once: true })

    return () => {
      // Limpiar
      document.removeEventListener("click", handleUserInteraction)
      document.removeEventListener("touchstart", handleUserInteraction)
    }
  }, [])

  return null // Este componente no renderiza nada visible
}
