import Image from "next/image"
import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { MenuIcon } from "lucide-react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { Menu } from "./menu"
import Link from "next/link"

export function Header() {
  return (
    <Card>
      <CardContent className="flex items-center justify-between p-5">
        <Link href="/">
          <Image src="/logo.png" alt="FSW Barber" height={18} width={120} />
        </Link>

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
