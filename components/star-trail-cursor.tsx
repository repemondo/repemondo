"use client"

import { useEffect, useState, useRef } from "react"
import { useAudio } from "@/components/audio-context-provider"

export function StarTrailCursor() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number }[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 })
  const [counter, setCounter] = useState(0)
  const lastSoundPlayedRef = useRef<number>(0)
  const { playStarSound } = useAudio()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - lastPosition.x, 2) + Math.pow(mousePosition.y - lastPosition.y, 2),
    )

    const now = Date.now()
    const timeSinceLastSound = now - lastSoundPlayedRef.current

    // Increase the distance threshold to make sound play less frequently
    if (distance > 70 && timeSinceLastSound > 700) {
      playStarSound()
      lastSoundPlayedRef.current = now
    }

    // Increase the distance threshold to create fewer stars
    if (distance > 15) {
      // Only create a star with 70% probability to make the effect more subtle
      if (Math.random() > 0.3) {
        const newStar = {
          id: counter,
          x: mousePosition.x,
          y: mousePosition.y,
          size: Math.random() * 0.3 + 0.3, // Smaller size range: 0.3 to 0.6 (was 0.5 to 1)
        }

        setStars((prevStars) => [...prevStars, newStar])
        setCounter((prev) => prev + 1)
        setLastPosition({ x: mousePosition.x, y: mousePosition.y })

        // Remove star after animation completes
        setTimeout(() => {
          setStars((prevStars) => prevStars.filter((star) => star.id !== newStar.id))
        }, 1200) // Match the animation duration
      } else {
        // Update the last position even when we don't create a star
        setLastPosition({ x: mousePosition.x, y: mousePosition.y })
      }
    }
  }, [mousePosition, lastPosition, counter, playStarSound])

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="star-trail"
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
            transform: `scale(${star.size})`,
          }}
        />
      ))}
    </>
  )
}
