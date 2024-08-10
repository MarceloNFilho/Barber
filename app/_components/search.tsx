"use client"

import { SearchIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useRouter } from "next/navigation"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { FormField, FormItem, FormControl, FormMessage, Form } from "./ui/form"

const formSchema = z.object({
  search: z.string().trim().min(1, {
    message: "Digite algo para buscar.",
  }),
})

export function Search() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      search: "",
    },
  })
  const router = useRouter()

  function handleSubmit(data: z.infer<typeof formSchema>) {
    router.push(`/barbershops?search=${data.search}`)
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex items-center justify-between gap-2"
      >
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Faça sua busca..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button size="icon" className="min-w-10" type="submit">
          <SearchIcon className="h-5 w-5" />
        </Button>
      </form>
    </Form>
  )
}
