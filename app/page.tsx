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

export default async function Home() {
  const session = await getServerSession(authOptions)
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  const confirmedBookings = await getConfirmedBookings()

  return (
    <div>
      <Header />

      <div className="hidden lg:block">
        <div className="bg-barber flex h-[463px] w-full bg-cover bg-top">
          <div className="mx-auto w-full max-w-[1224px]">
            <div className="flex h-full items-center justify-between gap-32">
              <div className="flex w-full flex-col items-center justify-center">
                {session?.user ? (
                  <div className="w-full px-5 text-left">
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
                  <>
                    <h2 className="text-2xl font-bold">Olá, faça seu login!</h2>
                    <p className="text-sm">
                      {format(new Date(), "EEEE',' dd 'de' MMMM", {
                        locale: ptBR,
                      })}
                    </p>
                  </>
                )}

                <div className="mt-11 w-full px-5">
                  <Search />

                  <div className="mt-11">
                    {session?.user && confirmedBookings.length > 0 && (
                      <>
                        <Title label="Agendamentos" />
                        <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
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
                  </div>
                </div>
              </div>

              <div className="flex flex-col overflow-x-auto px-5">
                <Title label="Recomendados" />
                <div className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden">
                  {barbershops.map((barbershop) => {
                    return (
                      <BarbershopItem
                        key={barbershop.id}
                        barbershop={barbershop}
                      />
                    )
                  })}
                </div>
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

        <div className="px-5">
          <Title label="Recomendados" />
        </div>
        <div className="flex gap-4 overflow-auto p-0 pl-5 [&::-webkit-scrollbar]:hidden">
          {barbershops.map((barbershop) => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1224px] overflow-x-auto lg:px-5">
        <div className="max-lg:px-5">
          <Title label="Populares" />
        </div>
        <div className="mb-12 flex gap-4 overflow-x-auto p-0 max-lg:pl-5 [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => {
            return (
              <BarbershopItem key={barbershop.id} barbershop={barbershop} />
            )
          })}
        </div>
      </div>
    </div>
  )
}
