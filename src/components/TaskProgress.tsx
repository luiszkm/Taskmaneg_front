import { Progress } from '@/components/ui/progress'

type ProgressProps = {
  title: string
  totalTasks: number
  completedTasks: number
}

export function TaskProgress({
  title,
  completedTasks,
  totalTasks
}: ProgressProps) {

  const progressPercent =  completedTasks / totalTasks * 100

  return (
    <div className=' border rounded-xl shadow-lg p-2'>
      <strong>{title}</strong>
      <span>{`${totalTasks}/${completedTasks}`}</span>
      <Progress title={`${progressPercent.toFixed(1)}%`}
       value={progressPercent} />
    </div>
  )
}
