"use client"

import { Booking } from "@prisma/client"
import { BookingItem } from "./booking-item"
import { useKeenSlider } from "keen-slider/react"

interface BookingListProps {
  confirmedBookings: Booking[]
}

export function BookingList({ confirmedBookings }: BookingListProps) {
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 16,
    },
  })

  return (
    <div ref={sliderRef} className="flex lg:w-[380px]">
      {confirmedBookings.map((booking) => {
        return (
          <div key={booking.id} className="keen-slider__slide">
            <BookingItem booking={JSON.parse(JSON.stringify(booking))} />
          </div>
        )
      })}
    </div>
  )
}
