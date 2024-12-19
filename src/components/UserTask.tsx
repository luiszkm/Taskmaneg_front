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
import { useRouter } from 'next/navigation'
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

type UserTaskProps = {
  id: string
  title: string
  description: string
  status: boolean
  createdAt: Date
  completedAt: Date
}

export function UserTask({
  id,
  title,
  description,
  status,
  createdAt,
  completedAt
}: UserTaskProps) {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  function handleDeleteTask() {
    console.log('deletar tarefa')
  }

  function handleUpdateTask() {
    push(`/task/${id}`)
  }

  function convertDate(date: Date) {
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  return (
    <div className="border px-2 rounded-2xl w-full max-w-96 shadow-lg bg">
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
        <p className="overflow-auto max-h-32 text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          repudiandae alias necessitatibus totam hic doloremque ex et iusto
          harum exercitationem numquam, dolor quod, ea facere minima minus odit?
          Iure, repudiandae.
        </p>
      ) : null}

      {status ? (
        <div className="flex justify-between ">
          <small>Concluída</small>
          <small>{convertDate(completedAt)}</small>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <small>{convertDate(createdAt)}</small>
          <small className="text-yellow-500">Pendente</small>
          <Button className=" flex items-center gap-1 max-h-fit p-1 text-xs">
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
