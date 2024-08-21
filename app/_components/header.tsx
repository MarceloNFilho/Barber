"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { CalendarIcon, MenuIcon, UserCircle } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Menu } from "./menu"
import Link from "next/link"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"
import { useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"

export function Header() {
  const { data } = useSession()

  return (
    <Card className="rounded-t-none">
      <CardContent className="mx-auto flex max-w-[1224px] items-center justify-between p-5 lg:h-24">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
        </Link>

        <div className="block lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline">
                <MenuIcon size={20} />
              </Button>
            </SheetTrigger>
            <Menu />
          </Sheet>
        </div>

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          <Button
            variant="ghost"
            className="justify-start gap-2 rounded-lg"
            asChild
          >
            <Link href="/bookings">
              <CalendarIcon size={16} />
              <p className="text-sm font-bold">Agendamentos</p>
            </Link>
          </Button>

          {data?.user ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src={data.user.image ?? ``}
                  className="rounded-full object-cover"
                />
              </Avatar>

              <p className="font-bold">{data.user.name}</p>
            </div>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2 rounded-lg">
                  <UserCircle size={16} />
                  <p className="text-sm font-bold">Perfil</p>
                </Button>
              </DialogTrigger>
              <SignInDialog />
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
