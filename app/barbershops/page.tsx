import { BarbershopItem } from "../_components/barbershop-item"
import { Header } from "../_components/header"
import { Search } from "../_components/search"
import { db } from "../_lib/prisma"

interface BarberShopsPageProps {
  searchParams: {
    title?: string
    service?: string
  }
}

export default async function BarberShopsPage({
  searchParams,
}: BarberShopsPageProps) {
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        searchParams.title
          ? {
              name: {
                contains: searchParams.title,
                mode: "insensitive",
              },
            }
          : {},
        searchParams.service
          ? {
              services: {
                some: {
                  name: {
                    contains: searchParams.service,
                    mode: "insensitive",
                  },
                },
              },
            }
          : {},
      ],
    },
  })
  return (
    <>
      <Header />
      <div className="mt-6 px-5">
        <Search />
      </div>

      <p className="mt-6 px-5 text-xs font-bold uppercase text-gray-400">
        RESULTADOS PARA “{searchParams.title || searchParams.service}”
      </p>

      <div className="mt-3 grid grid-cols-2 gap-4 px-5">
        {barbershops.map((barbershop) => {
          return <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        })}
      </div>
    </>
  )
}
