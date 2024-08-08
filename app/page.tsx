import { Search } from "lucide-react"
import { Header } from "./_components/header"
import { Button } from "./_components/ui/button"
import { Input } from "./_components/ui/input"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Marcelo!</h2>
        <p className="text-sm">Quinta, 08 de Agosto</p>

        <div className="mt-6 flex items-center justify-between gap-2">
          <Input placeholder="Faça sua busca..." />
          <Button size="icon" className="min-w-10">
            <Search className="h-5 w-5" />
          </Button>
        </div>

        <div className="relative mt-6 h-[150px] w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores"
            fill
            className="rounded-xl object-cover"
          />
        </div>
      </div>
    </div>
  )
}
