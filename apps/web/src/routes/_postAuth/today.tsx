import { createFileRoute } from '@tanstack/react-router'
import { loadTodayTasks } from '../../features/today/load-today-tasks'
import type { TodayTaskProjection } from '../../features/today/types';

export const Route = createFileRoute('/_postAuth/today')({
  loader: loadTodayTasks,
  component: TodayComponent,
})

function TodayComponent() {
  const tasks: TodayTaskProjection[] = Route.useLoaderData();

  return <div>
    {tasks.map((task) => (
      <div key={task.referenceTaskId}>
        {task.title}
      </div>
    ))}
  </div>
}
