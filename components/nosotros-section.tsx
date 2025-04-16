"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

const features = [
  {
    id: "focused",
    title: "FOCUSED EXCELLENCE",
    subtitle: "Calidad por encima de cantidad.",
    description: [
      "Nuestra estrategia se basa en establecer relaciones significativas y a largo plazo con cada uno de nuestros valiosos clientes.",
      "Nos enfocamos en la excelencia para garantizar resultados excepcionales que superan las expectativas, y creemos que la calidad en el servicio es fundamental para el éxito.",
    ],
    color: "bg-primary",
    textColor: "text-white",
    icon: "/images/focused-excellence.png",
    selectorSize: "scale-[1.15]", // Ajuste específico para esta imagen
    containerSize: "scale-[1.15]", // Ajuste específico para esta imagen
  },
  {
    id: "agile",
    title: "AGILE MINDSET",
    subtitle: "Combinamos lo mejor de ambos mundos.",
    description: [
      "Traemos a la mesa la agilidad de las start-ups de Silicon Valley, y la experiencia de las agencias tradicionales de publicidad.",
      "Esta fusión nos permite ofrecer soluciones innovadoras y efectivas a nuestros clientes mientras mantenemos la flexibilidad necesaria para adaptarnos a los cambios del mercado.",
    ],
    color: "bg-[#8B7FD7]",
    textColor: "text-white",
    icon: "/images/agile-mindset.png",
    selectorSize: "", // Esta es la referencia, no necesita ajuste
    containerSize: "", // Esta es la referencia, no necesita ajuste
  },
  {
    id: "collab",
    title: "POWER OF COLLAB",
    subtitle: "Nuestra fórmula para el éxito conjunto.",
    description: [
      "Creemos en un modelo de propiedad colaborativa en el que cada miembro del equipo tiene un interés directo en los resultados de la marca.",
      "Esta filosofía asegura que todos estén motivados para brindar un servicio excepcional y cuidar de nuestros clientes, ya que su éxito tiene un impacto directo en el nuestro.",
    ],
    color: "bg-[#4CAF8F]",
    textColor: "text-white",
    icon: "/images/power-of-collab.png",
    selectorSize: "scale-[1.2]", // Ajuste específico para esta imagen
    containerSize: "scale-[1.2]", // Ajuste específico para esta imagen
  },
  {
    id: "shark",
    title: "SHARK TANK",
    subtitle: "Consagrados en las mejores agencias del mundo.",
    description: [
      "Nuestro equipo posee una amplia trayectoria en algunas de las agencias de publicidad más renombradas, como Ogilvy, JWT, Publicis, entre otras.",
      "Con más de una década de experiencia en el campo, hemos demostrado un historial de éxito en la creación de campañas efectivas e innovadoras para una amplia gama de marcas.",
    ],
    color: "bg-[#f7c45a]",
    textColor: "text-black",
    icon: "/images/shark-tank.png",
    selectorSize: "scale-[1.25]", // Ajuste específico para esta imagen
    containerSize: "scale-[1.25]", // Ajuste específico para esta imagen
  },
]

export function NosotrosSection() {
  const [activeFeature, setActiveFeature] = useState(features[0].id)

  return (
    <section id="nosotros" className="relative py-24 bg-black">
      <div className="container max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 headline-section">Nuestra experiencia</h2>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 headline-section">es tu ventaja.</h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Conoce los pilares que nos definen y nos hacen únicos en el mercado
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 mb-8 md:mb-12">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={cn(
                "p-3 md:p-4 rounded-lg transition-all duration-300 cursor-pointer",
                activeFeature === feature.id ? `${feature.color} shadow-lg` : "bg-white/5 hover:bg-white/10",
              )}
              onClick={() => setActiveFeature(feature.id)}
            >
              <div className="flex flex-col items-center text-center">
                <div
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center mb-2 md:mb-3",
                    feature.id === "shark" && activeFeature === feature.id ? "bg-black/10" : "bg-white/10",
                  )}
                >
                  <Image
                    src={feature.icon || "/placeholder.svg"}
                    alt={feature.title}
                    width={40}
                    height={40}
                    className={`w-10 md:w-15 h-10 md:h-15 object-contain transform ${feature.selectorSize}`}
                  />
                </div>
                <h3
                  className={cn(
                    "text-xs md:text-sm font-bold",
                    activeFeature === feature.id && feature.id === "shark" ? "text-black" : "text-white",
                  )}
                >
                  {feature.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {features.map((feature) => (
          <div
            key={feature.id}
            className={cn(
              "transition-all duration-500 overflow-hidden",
              activeFeature === feature.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 hidden",
            )}
          >
            <div className={cn("rounded-2xl p-6 md:p-8 lg:p-12", feature.color)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center">
                <div className="order-2 md:order-1">
                  <h3 className={cn("text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4", feature.textColor)}>
                    {feature.title}
                  </h3>
                  <h4 className={cn("text-lg md:text-xl font-medium mb-4 md:mb-6", feature.textColor)}>
                    {feature.subtitle}
                  </h4>
                  <div className="space-y-3 md:space-y-4">
                    {feature.description.map((paragraph, idx) => (
                      <p
                        key={idx}
                        className={cn(
                          "text-sm md:text-base",
                          feature.id === "shark" ? "text-black/80" : "text-white/80",
                        )}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="order-1 md:order-2 flex justify-center relative mb-6 md:mb-0">
                  <div
                    className={cn(
                      "w-36 h-36 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full flex items-center justify-center overflow-visible",
                      feature.id === "shark" ? "bg-black/10" : "bg-white/10",
                    )}
                  >
                    <Image
                      src={feature.icon || "/placeholder.svg"}
                      alt={feature.title}
                      width={160}
                      height={160}
                      className={`w-32 h-32 md:w-65 md:h-65 lg:w-78 lg:h-78 object-contain transform ${feature.containerSize}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
