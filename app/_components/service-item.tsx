import { BarbershopService } from "@prisma/client"
import Image from "next/image"
import { Button } from "./ui/button"
import { currencyFormatter } from "../_helpers/currency-formatter"

interface ServiceItemProps {
  service: BarbershopService
}

export function ServiceItem({ service }: ServiceItemProps) {
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

          <Button size="default" variant="secondary">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  )
}
