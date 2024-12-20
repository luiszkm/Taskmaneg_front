'use client'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from './ui/button'
import {
  BookmarkCheckIcon,
  CheckCheckIcon,
  ChevronsDown,
  ChevronsUp,
  Pencil,
  Trash
} from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { api } from '@/app/api/axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { CategoriesEnum } from '@/utils/categoriesEnum'

type UserTaskProps = {
  category: number
  id: string
  title: string
  description: string
  status: boolean
  createdAt: string
  completedAt: string
}

export function UserTask({
  id,
  category,
  title,
  description,
  status,
  createdAt,
  completedAt
}: UserTaskProps) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  var token = Cookies.get('token')
  async function handleDeleteTask() {
    try {
      const response = await api.delete(`/Task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      push(`/dashboard`)
    } catch (error) {}
  }
  
  async function handleCompleteTask() {
    try {
      const response = await api.patch(`/Task/changestatus`,
        {
          taskId: id,
          completed: !status
        }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log(response.data.data)
      push(`/dashboard`)
    } catch (error) {}
  }

  function convertDate(date: string) {
    const newDate = new Date(date)
    return newDate.toLocaleDateString()
  }

  return (
    <div className="border px-2 rounded-2xl w-full shadow-lg bg">
      <div className="flex justify-between items-center mt-2">
        <strong>{title}</strong>
        <div className="flex gap-2 items-center ">
          <Link href={`/usertask/${id}`}>
            <Pencil className="hover:text-violet-600" width={20} />
          </Link>

          <AlertDialog>
            <AlertDialogTrigger>
              <Trash className="hover:text-red-600" width={20} />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tem certeza que deseja excluir esta tarefa?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação não pode ser desfeita. Esta tarefa será excluída
                  permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteTask}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {isOpen ? (
        <p className="overflow-auto max-h-32 text-sm">{description}</p>
      ) : null}
      <small className="border  rounded-full px-1">
        {CategoriesEnum[category]}
      </small>

      {status ? (
        <div className="flex justify-between ">
          <small className='bg-green-200 text-green-900 rounded-2xl px-2'>Concluída</small>
          <small>concluída em {convertDate(completedAt)}</small>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <small>{convertDate(createdAt)}</small>
          <small className="text-yellow-900 bg-yellow-200 rounded-2xl px-2">Pendente</small>
          <Button onClick={handleCompleteTask}
          className=" flex items-center gap-1 max-h-fit p-1 text-xs">
            <BookmarkCheckIcon />
            concluir tarefa
          </Button>
        </div>
      )}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className=" mx-auto  flex items-center gap-1 max-h-fit p-1 text-xs"
      >
        {isOpen ? <ChevronsUp /> : <ChevronsDown />}
      </Button>
    </div>
  )
}
