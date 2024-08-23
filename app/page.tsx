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
import { ptBR, se } from "date-fns/locale"
import { format } from "date-fns"
import { getConfirmedBookings } from "./_data/get-confirmed-bookings"
import { BarbershopList } from "./_components/barbershop-list"
import { BookingList } from "./_components/booking-list"

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })
  const moreVisitedBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "asc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      {/* Desktop main banner */}
      <div className="hidden lg:block">
        <div className="flex h-[463px] w-full bg-barber bg-cover bg-top">
          <div className="mx-auto w-full max-w-[1224px]">
            <div className="flex h-full items-center justify-between gap-28 px-5">
              <div className="flex w-full flex-col items-center justify-center">
                {session?.user ? (
                  <div className="w-full text-left">
                    <h2 className="text-2xl font-bold">
                      Olá,{" "}
                      {session?.user ? `${session.user.name}!` : "Bem-vindo!"}
                    </h2>
                    <p className="text-sm">
                      {format(new Date(), "EEEE',' dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                ) : (
                  <div className="w-full text-left">
                    <h2 className="text-2xl font-bold">Olá, faça seu login!</h2>
                    <p className="text-sm">
                      {format(new Date(), "EEEE',' dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                )}

                <div className="mt-11 w-full">
                  <Search />

                  <div className="mt-5 overflow-hidden">
                    {session?.user && confirmedBookings.length > 0 && (
                      <>
                        <Title label="Agendamentos" />
                        <BookingList confirmedBookings={confirmedBookings} />
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col overflow-hidden">
                <Title label="Recomendados" />
                <BarbershopList barbershops={barbershops} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:hidden">
        <div className="mt-6 px-5">
          <h2 className="text-xl font-bold">
            Olá, {session?.user ? `${session.user.name}!` : "Bem-vindo!"}
          </h2>
          <p className="text-sm">
            {format(new Date(), "EEEE',' dd 'de' MMMM", { locale: ptBR })}
          </p>
        </div>

        <div className="mt-6 px-5">
          <Search />
        </div>
      </div>

      <div className="mt-6 flex gap-3 overflow-x-scroll px-5 lg:hidden [&::-webkit-scrollbar]:hidden">
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

      <div className="px-5 lg:hidden">
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>

      <div className="lg:hidden">
        {confirmedBookings.length > 0 && (
          <>
            <div className="px-5">
              <Title label="Agendamentos" />
            </div>
            <div className="flex gap-4 overflow-x-auto px-5 [&::-webkit-scrollbar]:hidden">
              {confirmedBookings.map((booking) => {
                return (
                  <BookingItem
                    key={booking.id}
                    booking={JSON.parse(JSON.stringify(booking))}
                  />
                )
              })}
            </div>
          </>
        )}

        <div className="overflow-hidden px-5">
          <Title label="Recomendados" />
          <BarbershopList barbershops={barbershops} />
        </div>
      </div>

      <div className="mx-auto mb-12 max-w-[1184px] overflow-hidden max-lg:px-5">
        <Title label="Populares" />
        <BarbershopList barbershops={popularBarbershops} />

        <div className="max-lg:hidden">
          <Title label="Mais visitados" />
          <BarbershopList barbershops={moreVisitedBarbershops} />
        </div>
      </div>
    </div>
  )
}
