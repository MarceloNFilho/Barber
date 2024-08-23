import { getServerSession } from "next-auth"
import { Header } from "../_components/header"
import { Title } from "../_components/title"
import { authOptions } from "../_lib/auth"
import { notFound } from "next/navigation"
import { BookingItem } from "../_components/booking-item"
import { getConfirmedBookings } from "../_data/get-confirmed-bookings"
import { getConcludedBookings } from "../_data/get-concluded-bookings"

export default async function Bookings() {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return notFound()
  }

  const confirmedBookings = await getConfirmedBookings()
  const concludedBookings = await getConcludedBookings()

  return (
    <>
      <Header />

      <div className="mx-auto mt-6 max-w-[1224px] px-5">
        <h2 className="text-xl font-bold">Agendamentos</h2>

        {confirmedBookings.length === 0 && concludedBookings.length === 0 && (
          <p className="text-gray-400">Você não possui nenhum agendamento.</p>
        )}

        {confirmedBookings.length > 0 && <Title label="Confirmados" />}
        <div className="max-lg:space-y-3 lg:grid lg:grid-cols-3 lg:items-center lg:gap-4">
          {confirmedBookings.map((booking) => {
            return (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            )
          })}
        </div>

        {concludedBookings.length > 0 && <Title label="Finalizados" />}
        <div className="mb-12 max-lg:space-y-3 lg:grid lg:grid-cols-3 lg:items-center lg:gap-4">
          {concludedBookings.map((booking) => {
            return (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            )
          })}
        </div>
      </div>
    </>
  )
}
