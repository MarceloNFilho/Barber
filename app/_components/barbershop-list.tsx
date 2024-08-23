"use client"

import { Barbershop, Prisma } from "@prisma/client"
import { BarbershopItem } from "./barbershop-item"
import { useState } from "react"
import { useKeenSlider } from "keen-slider/react"
import { Button } from "./ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface BarbershopListProps {
  barbershops: Barbershop[]
}

export function BarbershopList({ barbershops }: BarbershopListProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: { perView: 2, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3.5, spacing: 16 },
      },
      "(min-width: 748px)": {
        slides: { perView: 4, spacing: 16 },
      },
      "(min-width: 1024px)": {
        slides: { perView: "auto", spacing: 16 },
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel)
        },
      },
      "(min-width: 1280px)": {
        slides: { perView: "auto", spacing: 16 },
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel)
        },
      },
    },
  })

  return (
    <div ref={sliderRef} className="relative flex w-full">
      <Button
        className="absolute bottom-[30%] left-4 z-10 hidden h-14 w-14 -translate-y-1/2 rounded-full border border-solid border-secondary bg-background disabled:hidden lg:block"
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
        disabled={currentSlide === 0}
      >
        <ChevronLeft className="text-white hover:brightness-125" size={24} />
      </Button>
      {barbershops.map((barbershop) => {
        return (
          <div key={barbershop.id} className="keen-slider__slide">
            <BarbershopItem
              barbershop={JSON.parse(JSON.stringify(barbershop))}
            />
          </div>
        )
      })}
      <Button
        className="absolute bottom-[30%] right-4 hidden h-14 w-14 -translate-y-1/2 rounded-full border border-solid border-secondary bg-background disabled:hidden lg:block"
        onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
        disabled={
          currentSlide ===
          instanceRef?.current?.track.details.slides.length! - 1
        }
      >
        <ChevronRight className="text-white hover:brightness-125" size={24} />
      </Button>
    </div>
  )
}
