"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"

import Image from 'next/image'
import imageUpdate from '@/../public/images/undraw_updates_wm27.svg'
import { Header } from "@/components/Header"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  category: z
    .string({
      required_error: "Por favor selecione uma categoria.",
    }),
    description: z.string(
      {
        required_error: "Por favor insira uma descrição.",
      }

    ).max(500,
      {
        message: 'A Descrição deve ter 500 ou mais caracteres'
      }
    ).min(3, {
      message: 'A Descrição deve ter 3 ou menos caracteres'
    }),
    title: z.string(
      {
        required_error: "Por favor insira uma descrição.",
      }

    ).max(50,
      {
        message: 'A Descrição deve ter 50 ou mais caracteres'
      }
    ).min(3, {
      message: 'A Descrição deve ter 3 ou menos caracteres'
    }),
})

export default function UpdateTask() {
  const { push } = useRouter()
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: '',
      description: '',
      title: '',
    }
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)

    push('/dashboard/2')
  }

  return (
    <main className="flex w-full flex-col items-center justify-between h-screen">
    <section className='w-full'>
      <Header />
      <h1 className="font-bold mt-4">Atualize sua tarefa</h1>
      <p>preencha o formulário abaixo para atualizar essa tarefa tarefa</p>
      <section className="flex sm:flex-row 5 items-center justify-between gap-4 ">
        <Image
          className="w-full max-w-sm"
          src={imageUpdate}
          alt="Account"
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-1/3 space-y-0 flex flex-col gap-2 text-sm"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titulo</FormLabel>
                  <FormControl>
                    <Input placeholder="shadcn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione uma categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="personal">Pessoal</SelectItem>
                      <SelectItem value="work">Trabalho</SelectItem>
                      <SelectItem value="lazer">Lazer</SelectItem>
                      <SelectItem value="other">Outros</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit">Cadastrar</Button>
          </form>
        </Form>
      </section>
    </section>

    <footer>aaaa</footer>
  </main>
    
  )
}
