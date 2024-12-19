import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <main>
        <h1>Task Managed WeGenCoop </h1>
        <section>
          <div>
            <h2>Descrição do Projeto</h2>
            <div>
              <h3>Gerencie e Organize suas tarefas!</h3>
              <p>
                Este projeto visa criar uma plataforma de gerenciamento de
                tarefas
              </p>
            </div>
          </div>
          <div>
            <strong> Bem vindo ao seu gerenciador de tarefas </strong>
            <p>por favor, faça seu login ou crie uma conta para continuar</p>
            <div>
              <Link href="/login">
                <Button>Entrar</Button>
              </Link>
              <Link href="/register">
                <Button>Registrar</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
