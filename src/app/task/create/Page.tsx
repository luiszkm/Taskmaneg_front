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

export default function TaskCreate() {
  const {push}= useRouter()
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: '',
        description: '',
      }
    })
  
  return (
    <div>
      <h1>Task Create</h1>
    </div>
  )
}