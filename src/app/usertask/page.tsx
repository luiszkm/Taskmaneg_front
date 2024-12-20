'use client'

import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import imageRegister from '@/../public/images/undraw_account_g3rf.svg'
import { Header } from '@/components/Header'
import { useRouter } from 'next/navigation'
import { api } from '../api/axios'
import Cookies from 'js-cookie'
import { FooterMain } from '@/components/Footer'

const FormSchema = z.object({
  category: z.string({
    required_error: 'Por favor selecione uma categoria.'
  }),
  description: z
    .string({
      required_error: 'Por favor insira uma descrição.'
    })
    .max(500, {
      message: 'A Descrição deve ter 500 ou mais caracteres'
    })
    .min(3, {
      message: 'A Descrição deve ter 3 ou menos caracteres'
    }),
  title: z
    .string({
      required_error: 'Por favor insira uma descrição.'
    })
    .max(50, {
      message: 'A Descrição deve ter 50 ou mais caracteres'
    })
    .min(3, {
      message: 'A Descrição deve ter 3 ou menos caracteres'
    })
})

export default function UserTask() {
  const { push } = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: '1',
      description: '',
      title: ''
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    var userId = Cookies.get('userId')
    var token = Cookies.get('token')
    try {
      const response = await api.post(
        '/Task',
        {
          title: data.title,
          description: data.description,
          category: Number(data.category),
          userId: userId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      push(`/dashboard/${userId}`)
    } catch (error) {}
  }

  return (
    <main className="flex w-full flex-col items-center justify-between h-screen">
      <section className="w-full">
        <Header />
        <div className='p-4'>
          <h1 className="font-bold mt-4">Crie sua tarefa</h1>
          <p>preecha o formulário abaixo para cadastrar uma nova tarefa</p>
        </div>
        <section className="flex flex-col p-4 sm:flex-row items-center justify-between gap-4 ">
          <Image
            className="w-full max-w-sm"
            src={imageRegister}
            alt="Account"
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="sm:w-1/3 space-y-0 flex flex-col gap-2 text-sm w-full"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input placeholder="seu titulo " {...field} />
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
                        placeholder="descrição"
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
                        <SelectItem value="1">Pessoal</SelectItem>
                        <SelectItem value="2">Trabalho</SelectItem>
                        <SelectItem value="3">Estudos</SelectItem>
                        <SelectItem value="4">Outros</SelectItem>
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
      <div></div>
    </main>
  )
}
