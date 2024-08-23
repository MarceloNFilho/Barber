import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Barbershop } from "@prisma/client"
import { Title } from "./title"
import { PhoneItem } from "./phone-item"

interface BarbershopInfosProps {
  barbershop: Barbershop
}

export function BarbershopInfos({ barbershop }: BarbershopInfosProps) {
  return (
    <Card className="flex w-[386px] flex-col space-y-5 p-5">
      <div className="relative flex h-[180px] w-full items-end">
        <Image
          alt={`Mapa da barbearia ${barbershop.imageUrl}`}
          src="/map.png"
          fill
          className="rounded-xl object-cover"
        />

        <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
          <CardContent className="flex items-center gap-3 px-5 py-3">
            <Avatar>
              <AvatarImage src={barbershop.imageUrl} />
            </Avatar>
            <div>
              <h3 className="font-bold">{barbershop.name}</h3>
              <p className="text-xs">{barbershop.address}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Title label="Sobre nós" />
        <p className="text-justify text-sm text-gray-400">
          {barbershop?.description}
        </p>
      </div>

      <div className="mb-12 mt-6 border-t border-solid">
        <Title label="Contato" />
        <div className="space-y-3">
          {barbershop.phones.map((phone, index) => {
            return <PhoneItem key={index} phone={phone} />
          })}
        </div>
      </div>

      <div className="mb-12 mt-6 flex items-center justify-between border-t border-solid pt-5">
        <p className="text-sm text-gray-400">Em parceria com</p>
        <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
      </div>
    </Card>
  )
}
