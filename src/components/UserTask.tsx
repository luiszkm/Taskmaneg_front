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
import { UUID } from 'crypto'

type UserTaskProps = {
  id: string
  title: string
  description: string
  status: boolean
  createdAt: Date
}

export function UserTask({
  id,
  title,
  description,
  status,
  createdAt
}: UserTaskProps) {
  const {push} = useRouter()
  function handleDeleteTask() {
    console.log('deletar tarefa')
  }

  function handleUpdateTask() {
    push(`/task/${id}`)
  }

  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <span>{status ? 'Concluído' : 'Pendente'}</span>
      <span>{createdAt.toString()}</span>
      <div>
        <Button disabled={status}
        >
          {status ? 'Concluído' : 'Concluir'}
        </Button>
        <Button>Editar</Button>
        <Button>
          <AlertDialog>
            <AlertDialogTrigger>Excluir</AlertDialogTrigger>
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
        </Button>
      </div>
      
    </div>
  )
}
