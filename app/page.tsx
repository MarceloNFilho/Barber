import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"
import { Title } from "./_components/title"
import { Card, CardContent } from "./_components/ui/card"
import { Badge } from "./_components/ui/badge"
import { Avatar, AvatarImage } from "./_components/ui/avatar"
import { db } from "./_lib/prisma"
import { BarbershopItem } from "./_components/barbershop-item"
import { Footer } from "./_components/footer"
import { quickSearchOptions } from "./_constants/quick-search-options"
import { Search } from "./_components/search"

export default async function Home() {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

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
            >
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
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

      <Title label="Agendamentos" />

      <div className="px-5">
        <Card>
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge className="w-fit">Confirmado</Badge>
              <h3>Corte de Cabelo</h3>

              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png" />
                </Avatar>
                <p>Barbearia da FSW</p>
              </div>
            </div>

            <div className="flex w-[106px] flex-col items-center justify-center gap-2 border-l-2 px-5">
              <p className="text-sm">Agosto</p>
              <p className="text-2xl">05</p>
              <p className="text-sm">20:00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Title label="Recomendados" />

      <div className="flex gap-4 overflow-auto p-0 pl-5 [&::-webkit-scrollbar]:hidden">
        {barbershops.map((barbershop) => {
          return <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        })}
      </div>

      <Title label="Populares" />

      <div className="mb-12 flex gap-4 overflow-auto p-0 pl-5 [&::-webkit-scrollbar]:hidden">
        {popularBarbershops.map((barbershop) => {
          return <BarbershopItem key={barbershop.id} barbershop={barbershop} />
        })}
      </div>
    </div>
  )
}
