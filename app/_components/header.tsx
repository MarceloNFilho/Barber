import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import {
  CalendarIcon,
  HomeIcon,
  LogOut,
  LogOutIcon,
  MenuIcon,
} from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/quick-search-options"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Menu } from "./menu"

export function Header() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline">
              <MenuIcon size={20} />
            </Button>
          </SheetTrigger>
          <Menu />
        </Sheet>
      </CardContent>
    </Card>
  )
}
