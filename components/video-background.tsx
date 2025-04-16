"use client"

import { useEffect, useRef } from "react"

interface VideoBackgroundProps {
  src: string
  className?: string
}

export function VideoBackground({ src, className = "" }: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Intentar reproducir el video automáticamente
    if (videoRef.current) {
      const playVideo = async () => {
        try {
          await videoRef.current?.play()
          console.log("Video playing successfully")
        } catch (error) {
          console.log("Autoplay prevented:", error)

          // Agregar listener para reproducir en la primera interacción
          const playOnInteraction = () => {
            videoRef.current
              ?.play()
              .then(() => console.log("Video playing after interaction"))
              .catch((err) => console.error("Failed to play after interaction:", err))
            document.removeEventListener("click", playOnInteraction)
            document.removeEventListener("touchstart", playOnInteraction)
          }

          document.addEventListener("click", playOnInteraction, { once: true })
          document.addEventListener("touchstart", playOnInteraction, { once: true })
        }
      }

      playVideo()
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause()
        videoRef.current.src = ""
        videoRef.current.load()
      }
    }
  }, [])

  return (
    <div className={`absolute inset-0 overflow-hidden z-0 ${className}`}>
      <video
        ref={videoRef}
        className="absolute w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta videos HTML5.
      </video>
      <div className="absolute inset-0 bg-black/50" />
    </div>
  )
}
