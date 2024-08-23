import { useState } from "react"
import { Button } from "./ui/button"
import { useKeenSlider } from "keen-slider/react"

interface BookingTimeListProps {
  timeList: string[]
  selectedTime: string | undefined
  setSelectedTime: (time: string) => void
}

export function BookingTimeList({
  timeList,
  selectedTime,
  setSelectedTime,
}: BookingTimeListProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: "auto",
      spacing: 12,
    },
  })

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }
  return (
    <div
      ref={sliderRef}
      className="relative flex border-b border-solid px-5 py-5"
    >
      {timeList.length > 0 ? (
        timeList.map((time) => (
          <div key={time} className="keen-slider__slide">
            <Button
              variant={selectedTime === time ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleTimeSelect(time)}
            >
              {time}
            </Button>
          </div>
        ))
      ) : (
        <p className="w-full text-center text-xs text-gray-400">
          Não há horários disponíveis para esse dia.
        </p>
      )}
    </div>
  )
}
