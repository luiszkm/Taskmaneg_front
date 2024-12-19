'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'

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
    message: "Senhas devem ser iguais",
    path: ['passwordConfirm']
  })

export default function Register() {
  const {push}= useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    push('/login')
    // to-do: enviar session para backend e armazenar o cache no cookie
  }

  return (
    <div>
      <main>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="digite seu usuário" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
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
            <Button type="submit">Registrar</Button>
          </form>
        </Form>
      </main>
    </div>
  )
}
