"use client"

import { useEffect, useRef } from "react"

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const attemptPlay = () => {
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error)
      })
    }

    attemptPlay()

    // Habilitar reproducción después de interacción del usuario
    const enableOnInteraction = () => {
      video.play().catch((e) => console.log("Play failed after interaction:", e))
    }

    document.addEventListener("click", enableOnInteraction, { once: true })
    document.addEventListener("touchstart", enableOnInteraction, { once: true })

    return () => {
      document.removeEventListener("click", enableOnInteraction)
      document.removeEventListener("touchstart", enableOnInteraction)
    }
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/stars-in-space.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
}
