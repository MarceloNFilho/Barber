"use client"

import { HomeIcon, CalendarIcon, LogOutIcon, LogInIcon } from "lucide-react"
import { quickSearchOptions } from "../_constants/quick-search-options"
import { Button } from "./ui/button"
import { SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Avatar, AvatarImage } from "./ui/avatar"
import Image from "next/image"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { signIn, signOut, useSession } from "next-auth/react"
import { notFound } from "next/navigation"

export function Menu() {
  function handleSignInWithGoogleClick() {
    signIn("google")
  }

  function handleSignOutClick() {
    signOut()
  }

  const { data } = useSession()

  return (
    <SheetContent className="p-5">
      <SheetHeader>
        <SheetTitle className="text-left text-lg font-bold">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center gap-3 border-b border-solid py-5">
        {data?.user ? (
          <>
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={data.user.image ?? ``}
                className="rounded-full border-2 border-primary object-cover"
              />
            </Avatar>

            <div className="flex flex-col">
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </>
        ) : (
          <div className="flex w-full items-center justify-between">
            <h2 className="font-bold">Olá, faça seu login!</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" className="rounded-lg">
                  <LogInIcon size={20} />
                </Button>
              </DialogTrigger>

              <DialogContent className="w-[85%] rounded-xl">
                <DialogHeader className="flex gap-0.5">
                  <DialogTitle>Faça login na plataforma</DialogTitle>
                  <DialogDescription>
                    Conecte-se usando sua conta do Google
                  </DialogDescription>
                </DialogHeader>
                <Button
                  variant="outline"
                  className="mt-1 flex items-center gap-2"
                  onClick={handleSignInWithGoogleClick}
                >
                  <Image
                    src="/google.svg"
                    alt="google"
                    width={16}
                    height={16}
                  />
                  <p className="text-sm font-bold">Google</p>
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 border-b border-solid py-5">
        <Button className="justify-start gap-2" asChild>
          <Link href="/">
            <HomeIcon size={16} />
            <p className="text-sm font-normal">Inicio</p>
          </Link>
        </Button>

        <Button variant="ghost" className="justify-start gap-2">
          <CalendarIcon size={16} />
          <p className="text-sm font-normal">Agendamentos</p>
        </Button>
      </div>

      <div className="flex flex-col gap-1 border-b border-solid py-5">
        {quickSearchOptions.map((option) => {
          return (
            <Button
              key={option.title}
              variant="ghost"
              className="justify-start gap-2"
            >
              <Image
                src={option.imageUrl}
                alt={option.title}
                height={16}
                width={16}
              />
              <p className="text-sm font-normal">{option.title}</p>
            </Button>
          )
        })}
      </div>

      <div className="flex flex-col gap-1 py-5">
        <Button
          variant="ghost"
          className="justify-start gap-2"
          onClick={handleSignOutClick}
        >
          <LogOutIcon size={16} />
          <p className="text-sm font-normal">Sair da conta</p>
        </Button>
      </div>
    </SheetContent>
  )
}
