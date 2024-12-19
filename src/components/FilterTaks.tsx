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
import { Checkbox } from './ui/checkbox'


const formSchema = z.object({
  username: z.string().default(''),
  items: z.array(z.string()).default([])
})

const items = [
  {
    id: 'personal',
    label: 'Pessoal'
  },
  {
    id: 'work',
    label: 'Trabalho'
  },
  {
    id: 'lazer',
    label: 'Lazer'
  },
  {
    id: 'others',
    label: 'Outros'
  }
] as const

type FilterTasksProps = {
  isOpen: boolean
}

export function FilterTasks({isOpen}: FilterTasksProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      items: []
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }
  return (
    <div className='flex items-center gap-5 mt-4'>
      
      {isOpen ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-2 ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="nome do usuário"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
            
              control={form.control}
              name="items"
              render={() => (
                <FormItem className='flex items-center gap-2'>
                  <div className="">
                    <FormLabel className="text-base font-bold">Categorias</FormLabel>
                  </div>
                  {items.map(item => (
                    <FormField 
                      key={item.id}
                      control={form.control}
                      name="items"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={checked => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          value => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Aplicar filtros</Button>
          </form>
        </Form>
      ) : null}
    </div>
  )
}
