'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
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

import Image from 'next/image'
import imageUpdate from '@/../public/images/undraw_updates_wm27.svg'
import { Header } from '@/components/Header'
import { useParams, useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import { api } from '@/app/api/axios'
import { useEffect, useState } from 'react'
import { UserTaskResponse } from '@/@types/apiTypes'
import { CategoriesEnum } from '@/utils/categoriesEnum'

const FormSchema = z.object({
  category: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  title: z.string().nullable().optional()
})

export default function UpdateTask() {
  const { push } = useRouter()
  const { taskId } = useParams()
  const [task, setTask] = useState<UserTaskResponse>()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      category: null,
      description: null,
      title: null
    }
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    var token = Cookies.get('token')
    var userId = Cookies.get('userId')

    var category = Number(data.category)
    category === 0 ? (category = task!.category) : category
    try {
      const response = await api.put(
        `/Task/${taskId}`,
        {
          category: category,
          description: data.description,
          title: data.title,
          taskId: taskId
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

  async function getTask() {
    var token = Cookies.get('token')
    try {
      const response = await api.get(`/Task/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data.data)
      setTask(response.data.data)
    } catch (error) {}
  }

  useEffect(() => {
    getTask()
  }, [])
  return (
    <main className="flex w-full flex-col items-center justify-between h-screen">
      <section className="w-full">
        <Header />
        <div className="p-4">
          <h1 className="font-bold mt-4">Atualize sua tarefa</h1>
          <p>preencha o formulário abaixo para atualizar essa tarefa tarefa</p>
        </div>
        <section className="flex flex-col sm:flex-row p-4 items-center justify-between gap-4 ">
          <Image className="w-full max-w-sm" src={imageUpdate} alt="Account" />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="sm:w-1/3 w-full space-y-0 flex flex-col gap-2 text-sm"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Titulo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Opcional: alter titulo"
                        {...field}
                        value={field.value ?? ''}
                      />
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
                        placeholder="Opcional: alterar descrição"
                        className="resize-none"
                        {...field}
                        value={field.value ?? ''}
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
                      defaultValue={field.value ?? undefined}
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
              <Button type="submit">Atualizar</Button>
            </form>
          </Form>
        </section>
      </section>
      <div></div>
    </main>
  )
}
