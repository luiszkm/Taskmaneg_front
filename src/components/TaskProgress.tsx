import { Progress } from '@/components/ui/progress'

type ProgressProps = {
  totalTasks: number
  completedTasks: number
}

export function TaskProgress({
  completedTasks,
  totalTasks
}: ProgressProps) {

  const progressPercent =  completedTasks / totalTasks * 100

  return (
    <div className=' border rounded-xl shadow-lg p-2'>
      <strong>Suas tarefas</strong>
      <span>{`${totalTasks}/${completedTasks}`}</span>
      <Progress title={`${progressPercent.toFixed(1)}%`}
       value={progressPercent} />
    </div>
  )
}
