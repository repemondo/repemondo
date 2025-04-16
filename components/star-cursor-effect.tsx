"use client"

import { useEffect } from "react"

export function StarCursorEffect() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const moveX = clientX - window.innerWidth / 2
      const moveY = clientY - window.innerHeight / 2

      // Calcular el porcentaje de movimiento para hacer el efecto más sutil
      const moveFactorX = (moveX / (window.innerWidth / 2)) * 2 // Factor entre -2 y 2
      const moveFactorY = (moveY / (window.innerHeight / 2)) * 1 // Factor entre -1 y 1

      // Seleccionar todas las estrellas con la clase cursor-follow
      const stars = document.querySelectorAll(".cursor-follow")

      // Aplicar transformación a cada estrella con intensidad variable
      stars.forEach((star, index) => {
        // Crear variación en la intensidad del movimiento para cada estrella
        const variationFactor = 0.5 + (index % 5) * 0.1 // Variación entre 0.5 y 0.9

        // Aplicar transformación con movimiento sutil
        const translateX = moveFactorX * variationFactor * 5 // Máximo 10px de movimiento
        const translateY = moveFactorY * variationFactor * 3 // Máximo 3px de movimiento

        // Aplicar la transformación con transición suave
        const element = star as HTMLElement
        element.style.transform = `translate(${translateX}px, ${translateY}px)`
      })
    }

    // Añadir event listener para el movimiento del mouse
    window.addEventListener("mousemove", handleMouseMove)

    // Limpiar event listener al desmontar
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return null // Este componente no renderiza nada visible
}
