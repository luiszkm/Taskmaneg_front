import Link from 'next/link'

type useCardProps = {
  id: string
  name: string
  createdAt: Date
  tasks: number
}
export function UserCard({ name, tasks }: useCardProps) {
  return (
    <div>
      <Link
        href={`/dashboard/${name}`}
        className=" rounded-lg p-2 border shadow-md flex items-center justify-between w-full max-w-sm mt-2"
      >
        <strong>{name}</strong>
        <p>Tasks: {tasks}</p>
      </Link>
    </div>
  )
}
