'use client'
import { Header } from '@/components/Header'
import { Input } from '@/components/ui/input'
import { UserCard } from '@/components/UserCard'

export default function Team() {
  return (
    <div>
      <Header />
      <nav className="w-full px-2 ">
        <div className="mt-4 flex items-center gap-2">
          <Input className="max-w-sm" placeholder="pesquise um usuário" />
        </div>
      </nav>
      <UserCard
      id='1'
      name='João'
      tasks={2}
      createdAt={new Date()}

       />
     
    </div>
  )
}
