import { BarbershopInfos } from "@/app/_components/barbershop-infos"
import { Header } from "@/app/_components/header"
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
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="mx-auto flex max-w-[1224px] items-start lg:mt-10 lg:gap-6 lg:px-5">
        <div className="flex flex-col">
          <div className="relative h-[250px] w-full lg:h-[400px]">
            <Image
              src={barbershop?.imageUrl}
              alt={barbershop?.name}
              fill
              className="rounded-lg object-cover"
              quality={100}
            />

            <Button
              size="icon"
              variant="outline"
              className="absolute left-5 top-6 lg:hidden"
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
                  className="absolute right-5 top-6 lg:hidden"
                >
                  <MenuIcon size={20} />
                </Button>
              </SheetTrigger>
              <Menu />
            </Sheet>
          </div>

          <div className="relative z-10 rounded-t-3xl border-b border-solid bg-background py-5 max-lg:mt-[-1.5rem] max-lg:p-5 max-lg:pb-6 lg:border-0">
            <h1 className="text-xl font-bold lg:text-3xl">
              {barbershop?.name}
            </h1>

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

          <div className="border-b border-solid pb-6 max-lg:px-5 lg:hidden">
            <Title label="Sobre nós" />
            <p className="text-justify text-sm">{barbershop?.description}</p>
          </div>

          <div className="space-y-3 max-lg:px-5 lg:mb-12">
            <Title label="Serviços" />
            <div className="lg:grid lg:grid-cols-2 lg:gap-4">
              {barbershop.services.map((service) => {
                return (
                  <ServiceItem
                    key={service.id}
                    service={JSON.parse(JSON.stringify(service))}
                    barbershop={JSON.parse(JSON.stringify(barbershop))}
                  />
                )
              })}
            </div>
          </div>

          <div className="mb-12 mt-6 border-t border-solid max-lg:px-5 lg:hidden">
            <Title label="Contato" />
            <div className="space-y-3">
              {barbershop.phones.map((phone, index) => {
                return <PhoneItem key={index} phone={phone} />
              })}
            </div>
          </div>
        </div>

        <div className="max-lg:hidden">
          <BarbershopInfos barbershop={barbershop} />
        </div>
      </div>
    </div>
  )
}
