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
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

import Image from 'next/image'
import loginImage from "@/../public/images/undraw_secure-login_m11a.svg"

const formSchema = z.object({
  username: z
    .string()
    .min(3, {
      message: 'Username must be at least 2 characters.'
    })
    .max(50, {
      message: 'Username must be at most 50 characters.'
    }),
  password: z
    .string()
    .min(3, {
      message: 'Password must be at least 3 characters.'
    })
    .max(50, {
      message: 'Password must be at least 3 characters.'
    })
})

export default function Login() {
  const {push}= useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    push('/dashboard/2')
    // to-do: enviar session para backend e armazenar o cache no cookie
  }

  return (
      <main className='mx-auto w-full p-4 flex flex-col items-center'>
        <h3><strong>Bem Vindo!</strong> Faça login para visualizar suas tarefas </h3>
        <Image
        className='w-full max-w-sm m-8'
          src={loginImage}
          alt="Login"
          width={300}
          height={300}/>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-full max-w-sm">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="digite seu usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Digite sua senha" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className='w-full'
             type="submit">Efetuar Login</Button>
          </form>
        </Form>
      </main>
  )
}
