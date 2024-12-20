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
import wellcomeImage from '@/../public/images/undraw_welcome_nk8k.svg'
import Image from 'next/image'
import { api } from '../api/axios'
const formSchema: z.ZodSchema = z
  .object({
    username: z
      .string()
      .min(3, {
        message: 'Username deve ter 3 ou mais caracteres.'
      })
      .max(50, {
        message: 'Username deve ter 50 ou menos caracteres.'
      }),
    password: z
      .string()
      .min(3, {
        message: 'Senha deve ter 3 ou mais caracteres.'
      })
      .max(50, {
        message: 'Senha deve ter 50 ou menos caracteres.'
      }),
    passwordConfirm: z
      .string()
      .min(3, {
        message: 'Senha deve ter 3 ou mais caracteres.'
      })
      .max(50, {
        message: 'Senha deve ter 50 ou menos caracteres.'
      })
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: 'Senhas devem ser iguais',
    path: ['passwordConfirm']
  })

export default function Register() {
  const { push } = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: ''
    }
  })
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    const response = await api.post('/User', {
      username: values.username,
      password: values.password
    })
    push('/login')
    return response.data
  }

  return (
    <main className="p-4 flex flex-col items-center justify-between h-screen ">
      <section  className="p-4 flex flex-col items-center ">
        <h4 className='text-lg'>
          Seja Bem vindo!! Preencha o formulário abaixo para se cadastrar{' '}
        </h4>
        <div className="flex flex-col sm:flex-row mt-8 gap-3 sm:gap-8 sm:mt-20 items-center">
          <Image
            className="w-full max-w-sm mb-4"
            src={wellcomeImage}
            alt="Bem vindo"
            width={300}
            height={300}
          />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 max-w-sm"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Usuário</FormLabel>
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
                    <FormLabel>Senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite sua senha" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="passwordConfirm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirme sua senha</FormLabel>
                    <FormControl>
                      <Input placeholder="Confirme sua senha" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Registrar
              </Button>
            </form>
          </Form>
        </div>
      </section>
    </main>
  )
}
