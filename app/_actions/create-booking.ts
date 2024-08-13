"use server"

import { Booking } from "@prisma/client"
import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"
import { getServerSession } from "next-auth"
import { authOptions } from "../_lib/auth"

interface CreateBookingParams {
  serviceId: string
  date: Date
}

export async function createBooking(params: CreateBookingParams) {
  const user = await getServerSession(authOptions)
  if (!user) {
    throw new Error("Usuário não autenticado.")
  }

  await db.booking.create({
    data: {
      ...params,
      userId: (user.user as any).id,
    },
  })

  revalidatePath("/barbershops/[id]")
}
