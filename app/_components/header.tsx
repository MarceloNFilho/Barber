"use client"

import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
  CalendarIcon,
  ChevronDown,
  LogOutIcon,
  MenuIcon,
  UserCircle,
} from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Menu } from "./menu"
import Link from "next/link"
import { Dialog, DialogTrigger } from "./ui/dialog"
import { SignInDialog } from "./sign-in-dialog"
import { signOut, useSession } from "next-auth/react"
import { Avatar, AvatarImage } from "./ui/avatar"
import { usePathname } from "next/navigation"
import { Search } from "./search"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Header() {
  const router = usePathname()
  const { data } = useSession()

  function handleSignOutClick() {
    signOut()
  }

  return (
    <Card className="rounded-t-none">
      <CardContent className="mx-auto flex max-w-[1224px] items-center justify-between p-5 lg:h-24 lg:gap-11">
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

        {router !== "/" && (
          <div className="flex-1">
            <Search />
          </div>
        )}

        <div className="hidden lg:flex lg:items-center lg:gap-6">
          {data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarImage
                      src={data.user.image ?? ``}
                      className="rounded-full object-cover"
                    />
                  </Avatar>

                  <p className="text-sm font-bold">{data.user.name}</p>

                  <ChevronDown size={16} />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="w-[236px]">
                <DropdownMenuItem className="p-0">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 rounded-lg"
                    asChild
                  >
                    <Link href="/bookings">
                      <CalendarIcon size={16} />
                      <p className="text-sm font-bold">Agendamentos</p>
                    </Link>
                  </Button>
                </DropdownMenuItem>

                {data?.user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="p-0">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:text-destructive"
                        onClick={handleSignOutClick}
                      >
                        <LogOutIcon size={16} />
                        <p className="text-sm font-bold">Sair</p>
                      </Button>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="items-center gap-2 rounded-lg">
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
