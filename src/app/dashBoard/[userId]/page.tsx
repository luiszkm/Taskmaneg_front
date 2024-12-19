import { UserTask } from "@/components/UserTask";



export default function DashBoard (){
  return (
    <div>
      <header>
        filter
        <strong>Bem vindo Fulano</strong>
      </header>
      <aside>
        menu lateral
      </aside>
      <main>
        <h1>Dashboard</h1>
        <div>
          sua visao geral de quantas tarefas foram, feitas
          categorias / quantiade concluidas
        </div>
        <section>
          <h2>Suas Tarefas</h2>
          <UserTask 
            id="1"
            title="Tarefa 1"
            description="Descrição da tarefa 1"
            status={true}
            createdAt={new Date()} 
          />
        </section>
      </main>
    </div>
  )
}