import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import Image from "next/image"
import { Title } from "./_components/title"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/barbershop-item"
import { quickSearchOptions } from "./_constants/quick-search-options"
import { Search } from "./_components/search"
import Link from "next/link"
import { BookingItem } from "./_components/booking-item"
import { getServerSession } from "next-auth"
import { authOptions } from "./_lib/auth"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const bookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: (session.user as any).id,
          date: {
            gte: new Date(),
          },
        },
        include: {
          service: {
            include: {
              barbershop: true,
            },
          },
        },
        orderBy: {
          date: "asc",
        },
      })
    : []

  return (
    <div>
      <Header />

      <div className="mt-6 px-5">
        <h2 className="text-xl font-bold">Olá, Marcelo!</h2>
        <p className="text-sm">Quinta, 08 de Agosto</p>
      </div>

      <div className="mt-6 px-5">
        <Search />
      </div>

      <div className="mt-6 flex gap-3 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
        {quickSearchOptions.map((option) => {
          return (
            <Button
              key={option.title}
              size="lg"
              className="gap-2 bg-card"
              variant="secondary"
              asChild
            >
              <Link href={`/barbershops?service=${option.title}`}>
                <Image
                  src={option.imageUrl}
                  width={16}
                  height={16}
                  alt={option.title}
                />
                {option.title}
              </Link>
            </Button>
          )
        })}
      </div>

      <div className="px-5">
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      <div className="px-5">
        <Title label="Agendamentos" />
      </div>
      <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
        {bookings.map((booking) => {
          return <BookingItem key={booking.id} booking={booking} />
        })}
      </div>

      <div className="px-5">
        <Title label="Recomendados" />
      </div>
      <div className="flex gap-4 overflow-auto p-0 pl-5 [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => {
          return <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        })}
      </div>

      <div className="px-5">
        <Title label="Populares" />
      </div>
      <div className="mb-12 flex gap-4 overflow-auto p-0 pl-5 [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershop) => {
          return <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        })}
      </div>
    </div>
  )
}
