"use client"

import { useEffect, useRef } from "react"

export function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // No hacer nada aquí, solo permitir que el elemento de audio exista en el DOM
  }, [])

  return <audio ref={audioRef} src="/star-sound.mp3" preload="auto" style={{ display: "none" }} />
}
