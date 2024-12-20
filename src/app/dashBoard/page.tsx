'use client'
import { api } from '@/app/api/axios'
import { FilterTasks } from '@/components/FilterTaks'
import { Header } from '@/components/Header'
import { TaskProgress } from '@/components/TaskProgress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserTask } from '@/components/UserTask'
import { FilterIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { UserTaskResponse } from '@/@types/apiTypes'
import { useParams } from 'next/navigation'
import Link from 'next/link'

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false)
  const [userTasks, setUserTasks] = useState<UserTaskResponse[]>([])

  var token = Cookies.get('token')
  var userId = Cookies.get('userId')

  async function GetTask() {
    const response = await api.get(`/Task/?UserId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setUserTasks(response.data.data)
  }

  useEffect(() => {
    GetTask()
  }, [])
  return (
    <div className="min-h-screen flex flex-col-reverse justify-between w-full sm:flex-col">
      <Header />
      <main className="h-screen flex flex-col items-start gap-5">
        <strong className="text-violet-400 mt-20 text-lg mb-10">
          Bem vindo
        </strong>
        <section className="w-full space-y-8">
          <Link href={`/dashboard/${userId}`}>
            <Button className="bg-violet-400">
              navegar para mais detalhes
            </Button>
          </Link>

          <TaskProgress
            title="Total Tarefas Completas"
            completedTasks={userTasks.filter(task => task.isCompleted).length}
            totalTasks={userTasks.length}
          />
          <TaskProgress
            title="Total Tarefas de Pessoais"
            completedTasks={
              userTasks.filter(task => task.isCompleted && task.category == 1)
                .length
            }
            totalTasks={userTasks.filter(task => task.category == 1).length}
          />
          <TaskProgress
            title="Total Tarefas de Trabalho"
            completedTasks={
              userTasks.filter(task => task.isCompleted && task.category == 2)
                .length
            }
            totalTasks={userTasks.filter(task => task.category == 2).length}
          />
          <TaskProgress
            title="Total Tarefas de Estudos"
            completedTasks={
              userTasks.filter(task => task.isCompleted && task.category == 3)
                .length
            }
            totalTasks={userTasks.filter(task => task.category == 3).length}
          />
          <TaskProgress
            title="Total outras tarefas"
            completedTasks={
              userTasks.filter(task => task.isCompleted && task.category == 4)
                .length
            }
            totalTasks={userTasks.filter(task => task.category == 4).length}
          />
        </section>
      </main>
      <div className=""></div>
    </div>
  )
}
