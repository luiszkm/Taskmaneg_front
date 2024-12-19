'use client'
import { FilterTasks } from '@/components/FilterTaks'
import { Header } from '@/components/Header'
import { TaskProgress } from '@/components/TaskProgress'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { UserTask } from '@/components/UserTask'
import { FilterIcon } from 'lucide-react'
import { useState } from 'react'

export default function DashBoard() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col-reverse justify-between w-full sm:flex-col">
     <Header/>
      <main className="h-screen flex flex-col items-start gap-5">
        <nav className="w-full px-2 ">
          <div className="mt-4 flex items-center gap-2">
            <Input className="max-w-sm" placeholder="pesquise sua tarefa" />
            <Button onClick={() => setIsOpen(!isOpen)}>
              <FilterIcon />
            </Button>
          </div>
          <FilterTasks isOpen={isOpen} />
          <div className="flex items-center justify-between w-full p-2 mt-4 border-b border-violet-200">
            <strong>Bem vindo Fulano</strong>
            <TaskProgress completedTasks={7} totalTasks={18} />
          </div>
        </nav>

        <section className="w-full space-y-2">
          <UserTask
            id="1"
            title="Tarefa 1"
            description="Descrição da tarefa 1"
            status={false}
            createdAt={new Date()}
            completedAt={new Date()}
          />
          <UserTask
            id="1"
            title="Tarefa 1"
            description="Descrição da tarefa 1"
            status={false}
            createdAt={new Date()}
            completedAt={new Date()}
          />
          <UserTask
            id="1"
            title="Tarefa 1"
            description="Descrição da tarefa 1"
            status={false}
            createdAt={new Date()}
            completedAt={new Date()}
          />
          <UserTask
            id="1"
            title="Tarefa 1"
            description="Descrição da tarefa 1"
            status={false}
            createdAt={new Date()}
            completedAt={new Date()}
          />
        </section>
      </main>
      <footer className="border-t-2 border-b-violet-500 h-9"></footer>
    </div>
  )
}
