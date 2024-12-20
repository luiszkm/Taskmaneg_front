import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

import taskListImage from '@/../public/images/undraw_task-list_qe3p.svg'
import TaskProblem from '@/../public/images/undraw_problem-solving_8lg7.svg'
import { Check } from 'lucide-react'
export default function Home() {
  return (
    <main className="mx-auto w-full p-8 flex flex-col items-center justify-between h-screen">
      <h1 className="text-2xl mb-5">Task Managed WeGenCoop </h1>
      <section className="flex flex-col gap-10">
        <div className="flex flex-col  gap-5">
          <div className="flex flex-col sm:flex-row-reverse items-center  gap-5">
            <p className="text-start w-full max-w-72">
              Uma aplicação para organização pessoal e profissional, permitindo
              criar, categorizar e acompanhar tarefas.
            </p>
            <Image
              className="w-full max-w-sm mb-4"
              src={taskListImage}
              alt="Task Manager"
              width={300}
              height={300}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="flex flex-col gap-2">
              <h3>Gerencie e Organize suas tarefas!</h3>
              <p>
                Este projeto visa criar uma plataforma de gerenciamento de
                tarefas, abaixo algumas funcionalidades:
              </p>
              <ul>
                <li className="flex items-center gap-1">
                  <Check className="w-3" /> Criar Tarefa
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-3" /> Editar Tarefa
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-3" /> Excluir Tarefa
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-3" /> Categorizar Tarefa
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-3" /> Visual Tarefa
                </li>
                <li className="flex items-center gap-1">
                  <Check className="w-3" /> Filtrar Tarefa
                </li>
              </ul>
            </div>
            <Image
              className="hidden sm:flex"
              src={TaskProblem}
              alt="Task Problem"
              width={300}
              height={300}
            />
          </div>
        </div>
        <div className="mt-6">
          <strong> Bem vindo ao seu gerenciador de tarefas </strong>
          <small>
            por favor, faça seu login ou crie uma conta para continuar
          </small>
          <div className=" w-full items-center justify-center gap-5 flex">
            <Link className="w-full" href="/login">
              <Button className="w-full">Entrar</Button>
            </Link>
            <Link className="w-full " href="/register">
              <Button className="w-full">Registrar</Button>
            </Link>
          </div>
        </div>
      </section>
      <div></div>
    </main>
  )
}
