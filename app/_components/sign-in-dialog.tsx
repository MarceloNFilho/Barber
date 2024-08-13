import Image from "next/image"
import { Button } from "./ui/button"
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog"
import { signIn } from "next-auth/react"

export function SignInDialog() {
  function handleSignInWithGoogleClick() {
    signIn("google")
  }

  return (
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
        <Image src="/google.svg" alt="google" width={16} height={16} />
        <p className="text-sm font-bold">Google</p>
      </Button>
    </DialogContent>
  )
}
