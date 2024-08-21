import { Card, CardContent } from "./ui/card"

export function Footer() {
  return (
    <footer>
      <Card className="rounded-b-none">
        <CardContent className="mx-auto max-w-[1224px] px-5 py-6">
          <p className="text-xs text-gray-400">
            © 2024 Copyright <span className="font-bold">FSW Barber</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}
