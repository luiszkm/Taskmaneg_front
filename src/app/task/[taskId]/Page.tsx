import { CategoriesEnum } from "@/utils/categoriesEnum";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";


const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: 'O titulo deve ter 3 ou mais caracteres'
    })
    .max(50, {
      message: 'O titulo deve ter 50 ou menos caracteres'
    }),
  description: z
    .string()
    .min(3, {
      message: 'A Descrição deve ter 3 ou menos caracteres'
    })
    .max(500, {
      message: 'A Descrição deve ter 500 ou mais caracteres'
    }),
    Category: z.nativeEnum(CategoriesEnum)                                         
})


export default function TaskUpdate(){
  const {taskId} = useParams()
  const {push}= useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
    }
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    push('/dashboard')
    // to-do: enviar session para backend e armazenar o cache no cookie
  }


  return (
    <div>
      <h1>Task Update</h1>
      <p>Task ID: {taskId}</p>
    </div>
  )
}