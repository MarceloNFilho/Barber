import { Menu } from "@/app/_components/menu"
import { PhoneItem } from "@/app/_components/phone-item"
import { ServiceItem } from "@/app/_components/service-item"
import { Title } from "@/app/_components/title"
import { Button } from "@/app/_components/ui/button"
import { Sheet, SheetTrigger } from "@/app/_components/ui/sheet"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface BarbershopPageProps {
  params: {
    id: string
  }
}

export default async function BarbershopPage({ params }: BarbershopPageProps) {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
    include: {
      services: true,
    },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div className="relative rounded-t-xl">
      <div className="relative h-[250px] w-full">
        <Image
          src={barbershop?.imageUrl}
          alt={barbershop?.name}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="outline"
          className="absolute left-5 top-6"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Sheet>
          <SheetTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-5 top-6"
            >
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <Menu />
        </Sheet>
      </div>

      <div className="relative z-10 mt-[-1.5rem] rounded-t-3xl border-b border-solid bg-background p-5 pb-6">
        <h1 className="text-xl font-bold">{barbershop?.name}</h1>

        <div className="mt-3 space-y-2">
          <div className="flex items-center gap-1">
            <MapPinIcon className="h-4 fill-primary stroke-none" />
            <p className="text-sm">{barbershop?.address}</p>
          </div>

          <div className="flex items-center gap-1">
            <StarIcon className="h-4 fill-primary stroke-none" />
            <p className="text-sm">5,0 (889 avaliações)</p>
          </div>
        </div>
      </div>

      <div className="border-b border-solid pb-6">
        <Title label="Sobre nós" />
        <p className="px-5 text-justify text-sm">{barbershop?.description}</p>
      </div>

      <Title label="Serviços" />
      <div className="space-y-3">
        {barbershop.services.map((service) => {
          return <ServiceItem key={service.id} service={service} />
        })}
      </div>

      <div className="mb-12 mt-6 border-t border-solid">
        <Title label="Contato" />
        <div className="space-y-3 px-5">
          {barbershop.phones.map((phone) => {
            return <PhoneItem key={phone} phone={phone} />
          })}
        </div>
      </div>
    </div>
  )
}
