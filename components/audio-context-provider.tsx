"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AudioContextType {
  playStarSound: () => void
}

const AudioContext = createContext<AudioContextType>({
  playStarSound: () => {},
})

export const useAudio = () => useContext(AudioContext)

interface AudioProviderProps {
  children: ReactNode
}

export function AudioContextProvider({ children }: AudioProviderProps) {
  const [audioEnabled, setAudioEnabled] = useState(false)

  useEffect(() => {
    // Habilitar audio después de la primera interacción del usuario
    const enableAudio = () => {
      setAudioEnabled(true)
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }

    document.addEventListener("click", enableAudio, { once: true })
    document.addEventListener("touchstart", enableAudio, { once: true })

    return () => {
      document.removeEventListener("click", enableAudio)
      document.removeEventListener("touchstart", enableAudio)
    }
  }, [])

  const playStarSound = () => {
    if (!audioEnabled) return

    try {
      // Intentar con el nuevo archivo de audio
      const audio = new Audio("/star-sound.mp3")
      audio.volume = 0.4

      // Reproducir sin esperar a que se cargue completamente
      const playPromise = audio.play()

      // Manejar errores silenciosamente
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Audio playback failed, trying alternative format:", err)

          // Intentar con formato alternativo
          try {
            const audioFallback = new Audio("/stardust-magic.wav")
            audioFallback.volume = 0.4
            audioFallback.play().catch((e) => console.log("Fallback audio also failed:", e))
          } catch (fallbackError) {
            console.log("Fallback audio creation failed:", fallbackError)
          }
        })
      }
    } catch (error) {
      console.log("Error creating audio:", error)
    }
  }

  return <AudioContext.Provider value={{ playStarSound }}>{children}</AudioContext.Provider>
}
