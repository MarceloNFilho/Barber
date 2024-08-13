"use server"

import { Booking } from "@prisma/client"
import { db } from "../_lib/prisma"
import { revalidatePath } from "next/cache"

interface CreateBookingParams {
  userId: string
  serviceId: string
  date: Date
}

export async function createBooking(params: CreateBookingParams) {
  await db.booking.create({
    data: params,
  })

  revalidatePath("/barbershops/[id]")
}
