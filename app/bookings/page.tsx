import { getServerSession } from "next-auth"
import { Header } from "../_components/header"
import { Title } from "../_components/title"
import { db } from "../_lib/prisma"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { BookingItem } from "../_components/booking-item"

export default async function Bookings() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await db.booking.findMany({
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

  const concludedBookings = await db.booking.findMany({
    where: {
      userId: (session.user as any).id,
      date: {
        lte: new Date(),
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
      date: "desc",
    },
  })

  return (
    <>
      <Header />

      <div className="mt-6 px-5">
        <h2 className="text-xl font-bold">Agendamentos</h2>
        <Title label="Confirmados" />

        <div className="space-y-3">
          {confirmedBookings.map((booking) => {
            return <BookingItem key={booking.id} booking={booking} />
          })}
        </div>

        <Title label="Finalizados" />
        <div className="mb-12 space-y-3">
          {concludedBookings.map((booking) => {
            return <BookingItem key={booking.id} booking={booking} />
          })}
        </div>
      </div>
    </>
  )
}
