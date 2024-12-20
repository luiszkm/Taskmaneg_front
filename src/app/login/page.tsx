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
import Cookies from 'js-cookie'
import Image from 'next/image'
import loginImage from '@/../public/images/undraw_secure-login_m11a.svg'
import { api } from '../api/axios'

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
  const { push } = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post('/Session', {
        username: values.username,
        password: values.password
      })

      // Armazenar o token no cookie
      Cookies.set('token', response.data.data.token, {
        expires: 1 // 1 dia
      })
      Cookies.set('userId', response.data.data.userId, {
        expires: 1 // 1 dia
      })

      push(`/dashboard/${response.data.data.userId}`)
    } catch (error) {
      console.error(error)

      // Opcional: Exibir feedback ao usuário
    }
  }

  return (
    <main className="mx-auto w-full p-4 flex flex-col items-center justify-between h-screen">
      <section className="mx-auto w-full p-4 flex flex-col items-center">
        <h3>
          <strong className="text-violet-500">Bem Vindo!</strong> Faça login
          para visualizar suas tarefas{' '}
        </h3>
        <Image
          className="w-full max-w-sm m-8"
          src={loginImage}
          alt="Login"
          width={300}
          height={300}
        />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-full max-w-sm"
          >
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
            <Button className="w-full" type="submit">
              Efetuar Login
            </Button>
          </form>
        </Form>
      </section>
      <div></div>
    </main>
  )
}
