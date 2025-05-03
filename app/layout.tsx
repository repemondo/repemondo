import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins, Caveat, Playfair_Display } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { StarTrailCursor } from "@/components/star-trail-cursor"
import { AudioContextProvider } from "@/components/audio-context-provider"
import { AudioPlayer } from "@/components/audio-player"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["400", "500", "600", "700"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Vernon Creative Bureau",
  description:
    "Estudio de comunicación integral enfocado en marcas y proyectos que busquen generar impacto positivo en las personas.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-[#220909] text-white font-sans antialiased",
          inter.variable,
          poppins.variable,
          caveat.variable,
          playfair.variable,
        )}
      >
        <AudioContextProvider>
          <StarTrailCursor />
          <AudioPlayer />
          {children}
        </AudioContextProvider>
      </body>
    </html>
  )
}
