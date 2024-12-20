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

export default function DashBoardId() {
  const [isOpen, setIsOpen] = useState(false)
  const { userId } = useParams()
  const [userTasks, setUserTasks] = useState<UserTaskResponse[]>([])

  const [search, setSearch] = useState('')

  var token = Cookies.get('token')
  async function GetTask() {
    const response = await api.get(`/Task/?UserId=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    setUserTasks(response.data.data)
  }

  async function handleFilter(values: any) {
    try {
      if (values.username && values.category ) {
        const response = await api.get(
          `/Task/?username=${values.username}&category=${values.category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setUserTasks(response.data.data)
      }
      if (!values.username && values.category ) {
        const response = await api.get(
          `/Task/?category=${values.category}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setUserTasks(response.data.data)
      }
      if (values.username && !values.category ) {
        const response = await api.get(
          `/Task/?username=${values.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setUserTasks(response.data.data)
      }

      if (!values.username && !values.category ) {
        GetTask()
      }


    } catch (error) {}
  }

  async function handleSearch() {
    try {
      const response = await api.get(`/Task/${search}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setUserTasks([response.data.data])
    } catch (error) {}
  }

  useEffect(() => {
    GetTask()
  }, [])
  return (
    <div className="min-h-screen flex flex-col-reverse justify-between w-full sm:flex-col">
      <Header />
      <main className="h-screen flex flex-col items-start gap-5">
        <nav className="w-full px-2 ">
          <div className="mt-4 flex items-center gap-2">
            <Input
              onChange={e => setSearch(e.target.value)}
              className="max-w-sm"
              placeholder="pesquise sua tarefa por id"
            />
            <Button onClick={() => setIsOpen(!isOpen)}>
              <FilterIcon />
            </Button>
            <Button onClick={handleSearch}>pesquisar</Button>
          </div>
          <FilterTasks onSubmitValues={handleFilter} isOpen={isOpen} />
          <div className="flex items-center justify-between w-full p-2 mt-4 border-b border-violet-200">
            <strong>Bem vindo Fulano</strong>
            <TaskProgress
              title="Total Tarefas Completas"
              completedTasks={userTasks.filter(task => task.isCompleted).length}
              totalTasks={userTasks.length}
            />
          </div>
        </nav>

        <section className="w-full p-2 grid grid-cols-1 gap-4 sm:grid-cols-2 ">
          {userTasks &&
            userTasks.map(task => (
              <UserTask
                key={task.id}
                category={task.category}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.isCompleted}
                createdAt={task.createdAt}
                completedAt={task.updatedAt}
              />
            ))}
        </section>
      </main>
      <div className=""></div>
    </div>
  )
}
