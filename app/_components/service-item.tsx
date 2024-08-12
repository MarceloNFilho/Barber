"use client"

import { Barbershop, BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { currencyFormatter } from "../_helpers/currency-formatter"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { Calendar } from "./ui/calendar"
import { ptBR } from "date-fns/locale"
import { useState } from "react"
import { Card, CardContent } from "./ui/card"
import { format, set } from "date-fns"
import { createBooking } from "../_actions/create-booking"
import { useSession } from "next-auth/react"
import { toast } from "sonner"

interface ServiceItemProps {
  service: BarbershopService
  barbershop: Pick<Barbershop, "name">
}

const TIME_LIST = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
]

export function ServiceItem({ service, barbershop }: ServiceItemProps) {
  const { data } = useSession()
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  )

  function handleDateSelect(date: Date | undefined) {
    setSelectedDay(date)
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time)
  }

  async function handleCreateBooking() {
    try {
      if (!selectedDay || !selectedTime) return

      const hour = Number(selectedTime?.split(":")[0])
      const minutes = Number(selectedTime?.split(":")[1])
      const newDate = set(selectedDay, {
        minutes: minutes,
        hours: hour,
      })

      await createBooking({
        userId: (data?.user as any).id,
        serviceId: service.id,
        date: newDate,
      })

      toast.success("Reserva criada com sucesso!")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao criar reserva!")
    }
  }

  return (
    <div className="mx-5 flex items-center gap-2 rounded-xl bg-card p-3">
      <div className="relative h-[110px] min-w-[110px]">
        <Image
          src={service.imageUrl}
          alt={service.name}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="space-y-1">
          <h2 className="text-sm font-bold">{service.name}</h2>
          <p className="text-sm text-gray-400">{service.description}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-primary">
            {currencyFormatter(Number(service.price))}
          </span>

          <Sheet>
            <SheetTrigger asChild>
              <Button size="default" variant="secondary">
                Reservar
              </Button>
            </SheetTrigger>

            <SheetContent className="px-0">
              <SheetHeader>
                <SheetTitle className="px-5 text-left text-lg font-bold">
                  Fazer Reserva
                </SheetTitle>
              </SheetHeader>

              <div className="border-b border-solid py-5">
                <Calendar
                  mode="single"
                  locale={ptBR}
                  selected={selectedDay}
                  onSelect={handleDateSelect}
                  styles={{
                    head_cell: {
                      width: "100%",
                      textTransform: "capitalize",
                    },
                    cell: {
                      width: "100%",
                    },
                    button: {
                      width: "100%",
                    },
                    nav_button_previous: {
                      width: "32px",
                      height: "32px",
                    },
                    nav_button_next: {
                      width: "32px",
                      height: "32px",
                    },
                    caption: {
                      textTransform: "capitalize",
                    },
                  }}
                />
              </div>

              {selectedDay && (
                <div className="flex gap-3 overflow-auto border-b border-solid p-5 [&::-webkit-scrollbar]:hidden">
                  {TIME_LIST.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="rounded-full"
                      onClick={() => handleTimeSelect(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              )}

              {selectedTime && selectedDay && (
                <div className="px-5 pt-5">
                  <Card>
                    <CardContent className="space-y-3 p-3">
                      <div className="flex items-center justify-between">
                        <h2 className="font-bold">{service.name}</h2>
                        <p className="text-sm font-bold">
                          {currencyFormatter(Number(service.price))}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Data</h2>
                        <p className="text-sm">
                          {format(selectedDay, "d 'de' MMMM", { locale: ptBR })}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Horário</h2>
                        <p className="text-sm">{selectedTime}</p>
                      </div>

                      <div className="flex items-center justify-between">
                        <h2 className="text-sm text-gray-400">Barbearia</h2>
                        <p className="text-sm">{barbershop.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              <SheetFooter className="mt-5 px-5">
                <SheetClose asChild>
                  <Button
                    type="submit"
                    onClick={handleCreateBooking}
                    disabled={!selectedDay || !selectedTime}
                  >
                    Confirmar
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )
}
