"use client"

import { SmartphoneIcon } from "lucide-react"
import { Button } from "./ui/button"
import { toast } from "sonner"

interface PhoneItemProps {
  phone: string
}

export function PhoneItem({ phone }: PhoneItemProps) {
  function handleCopyPhone(phone: string) {
    navigator.clipboard.writeText(phone)

    toast.success("Telefone copiado com sucesso!")
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <p className="text-sm">{phone}</p>
      </div>

      <Button variant="outline" onClick={() => handleCopyPhone(phone)}>
        Copiar
      </Button>
    </div>
  )
}
