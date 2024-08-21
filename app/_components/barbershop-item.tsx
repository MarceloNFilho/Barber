import { Barbershop } from "@prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

export function BarbershopItem({ barbershop }: BarbershopItemProps) {
  return (
    <Card className="h-fit min-w-[168px] lg:min-w-[196px]">
      <CardContent className="p-0">
        <div className="relative h-[159px] w-full">
          <Image
            src={barbershop.imageUrl}
            alt={barbershop.name}
            fill
            className="rounded-xl object-cover p-1"
          />

          {/* <Badge
            className="absolute left-2 top-2 space-x-1 bg-black/60"
            variant="secondary"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-bold">5,0</p>
          </Badge> */}
        </div>

        <div className="px-2 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-xs text-gray-400">{barbershop.address}</p>

          <Button className="mt-3 w-full" variant="secondary" asChild>
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
