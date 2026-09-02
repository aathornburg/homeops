import { createFileRoute } from '@tanstack/react-router'
import { loadTodayTasks } from '../../features/today/load-today-tasks'
import type { TodayTaskProjection, TodayTasksModel } from '../../features/today/types';
import { groupTasks } from '../../features/today/task-grouper';
import { parseCalendarDate } from '../../shared/calendar-date';
import dayjs from 'dayjs';

export const Route = createFileRoute('/_postAuth/today')({
  loader: getTasksModel,
  component: TodayComponent,
})

function getTasksModel(): Promise<TodayTasksModel> {
  return loadTodayTasks().then((tasks: TodayTaskProjection[]) =>
    groupTasks(tasks, parseCalendarDate(dayjs().format('YYYY-MM-DD')))
  )
}

function TodayComponent() {
  const tasksModel: TodayTasksModel = Route.useLoaderData();

  return (
    <main className="p-3">
      <div className="flex justify-between">
        <h1 className="text-3xl">Today</h1>
      </div>
      <div>
        <h2>For Today</h2>
        <div>
          {
            tasksModel.todayTasks.map((task) => (
              <div key={task.referenceTaskId}>
                {task.title}
              </div>
            ))
          }
        </div>
        <h2>Upcoming</h2>
        <div>
          {
            tasksModel.upcomingTasks.map((task) => (
              <div key={task.referenceTaskId}>
                {task.title}
              </div>
            ))
          }
        </div>
      </div>
    </main>
  );
}
