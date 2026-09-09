import { createFileRoute } from '@tanstack/react-router'
import { loadTodayTasks } from '../../features/today/load-today-tasks'
import type { TimingFact, TodayPresentationModel, TodayTaskPresentationModel, TodayTaskProjection, TodayTasksModel } from '../../features/today/types';
import { groupTasks } from '../../features/today/task-grouper';
import { formatFullReadableDate, parseCalendarDate } from '../../shared/calendar-date';
import dayjs from 'dayjs';
import { prepareTodayPresentation } from '../../features/today/task-presenter';
import { LinkButton } from '../../shared/ui/linkButton';
import { CalendarClock, Check, Plus, Sparkle, Sun } from 'lucide-react';
import { Checkbox } from '@mantine/core';

export const Route = createFileRoute('/_postAuth/today')({
  loader: getTasksModel,
  component: TodayComponent,
})

function getTasksModel(): Promise<TodayPresentationModel> {
  const referenceDate = parseCalendarDate(dayjs().format('YYYY-MM-DD'));

  return loadTodayTasks()
    .then((tasks: TodayTaskProjection[]) => groupTasks(tasks, referenceDate))
    .then((tasksModel: TodayTasksModel) => prepareTodayPresentation(tasksModel, referenceDate));
}

function TodayComponent() {
  const tasksModel: TodayPresentationModel = Route.useLoaderData();

  return (
    <main className="p-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1 items-start">
            <h1 className="text-5xl">Today</h1>
            <span className="text-(color:--color-status-warning)">{formatFullReadableDate(tasksModel.date)}</span>
          </div>
          <LinkButton
            to="/tasks"
            className="flex gap-2 items-center rounded font-bold h-min bg-(color:--color-action-primary) px-4 py-2.5 text-(color:--color-background-panel) hover:bg-(color:--color-action-primary-hover)"
          >
            <Plus />
            <span>Add task</span>
          </LinkButton>
        </div>
        {
          (tasksModel.todayTasks.length || tasksModel.upcomingTasks.length) ? (
            <>
              <div
                className="
                  mt-8
                  grid grid-cols-[minmax(0,1fr)_7rem_7rem]
                  items-end gap-x-4
                  border-x border-transparent
                "
              >
                <div className="flex gap-3 items-center">
                  <Sun className="text-(--color-status-warning)"/>
                  <h2 className="text-2xl text-left mb-0!">For Today</h2>
                  {
                    tasksModel.todayTasks.length ? (
                      <div className="bg-(color:--color-surface-raised) rounded-full px-3 py-1 ml-2 text-sm font-bold">
                        {tasksModel.todayTasks.length}
                      </div>
                    ) : null
                  }
                </div>
                {
                  tasksModel.todayTasks.length ? (<>
                    <div className="text-sm font-semibold text-left pl-4">Due</div>
                    <div className="text-sm font-semibold text-left pr-4">Planned</div>
                  </>) : null
                }
              </div>
              <TodayTaskGroup tasks={tasksModel.todayTasks} noTasksMessage="Nothing for today" />
              <div
                className="
                  mt-8
                  grid grid-cols-[minmax(0,1fr)_7rem_7rem]
                  items-end gap-x-4
                  border-x border-transparent
                "
              >
                <div className="flex gap-3 items-center">
                  <CalendarClock className="text-(--color-status-warning)"/>
                  <div className="flex flex-col items-start">
                    <h2 className="text-2xl text-left mb-0!">Upcoming</h2>
                    <span className="text-sm text-(color:--color-text-muted)">
                      Next 30 days
                    </span>
                  </div>
                  {
                    tasksModel.upcomingTasks.length ? (
                      <div className="bg-(color:--color-surface-raised) rounded-full px-3 py-1 ml-2 text-sm font-bold">
                        {tasksModel.upcomingTasks.length}
                      </div>
                    ) : null
                  }
                </div>
                {
                tasksModel.upcomingTasks.length ? (<>
                    <div className="text-sm font-semibold text-left pl-4">Due</div>
                    <div className="text-sm font-semibold text-left pr-4">Planned</div>
                  </>) : null
                }
              </div>
              <TodayTaskGroup tasks={tasksModel.upcomingTasks} noTasksMessage="Nothing upcoming in the next 30 days" />
            </>
          ) : (
            <div className="mt-10 flex flex-col justify-center items-center p-8 text-(color:--color-text-subtle) bg-(color:--color-background-panel) rounded-2xl shadow border border-(color:--color-border-default)">
              <div
                className="relative inline-grid place-items-center"
                aria-hidden="true"
              >
                <div
                  className="
                    grid size-16 place-items-center rounded-full
                    bg-(--color-status-success-surface)
                    text-(--color-status-success)
                  "
                >
                  <Check className="size-7" strokeWidth={2.25} />
                </div>

                <Sparkle
                  className="
                    absolute -right-3 top-0 size-4
                    text-(--color-status-warning)
                  "
                  strokeWidth={2}
                />

                <Sparkle
                  className="
                    absolute -left-2 bottom-1 size-3
                    text-(--color-status-warning)
                  "
                  strokeWidth={2}
                />
              </div>
              <span className="font-semibold text-xl mt-5">Nothing needs attention</span>
              <span className="">You're clear for today and the next 30 days.</span>
            </div>
          )
        }
      </div>
    </main>
  );
}

function TodayTaskGroup({tasks, noTasksMessage}: {tasks: TodayTaskPresentationModel[], noTasksMessage: string}) {
  return (
    tasks.length ?
      <ul className="
        mt-3
        rounded-2xl shadow overflow-hidden
        border border-(color:--color-border-default)
        divide-y divide-(color:--color-border-default)
      ">
        {
          tasks.map((task) => (
            <TodayTaskRow key={task.task.referenceTaskId} task={task} />
          ))
        }
      </ul>
      : (
        <div className="mt-3 flex justify-center items-center p-4 text-(color:--color-text-subtle) bg-(color:--color-background-panel) rounded-2xl shadow border border-(color:--color-border-default)">
          {noTasksMessage}
        </div>
      )
  );
}

function TodayTaskRow({task}: {task: TodayTaskPresentationModel}) {
  return (
    <li
      className="
        grid grid-cols-[minmax(0,1fr)_7rem_7rem]
        items-center gap-x-4
        bg-(color:--color-background-panel) py-4
      "
    >
      <div className="min-w-0 pl-4 flex items-center gap-2">
        <Checkbox />
        <div className="flex flex-col gap-1 items-start ml-3">
          <div>{task.task.title}</div>
          {
            task.task.projectProjection || task.task.taskCompletionState.blocking.kind === 'blocked' ? (
              <div className="flex gap-2 text-(color:--color-text-muted) text-sm">
                {
                  task.task.projectProjection ? (
                    <span>{task.task.projectProjection.title}</span>
                  ) : null
                }
                {
                  task.task.projectProjection && task.task.taskCompletionState.blocking.kind === 'blocked' ? (
                    <span>•</span>
                  ) : null
                }
                {
                  task.task.taskCompletionState.blocking.kind === 'blocked' ? (
                    <span className="text-(color:--color-text-muted) text-sm">Blocked</span>
                  ) : null
                }
              </div>
            ) : null
          }
        </div>
      </div>
      <div className="flex flex-col items-start justify-center text-left text-sm border-l border-(color:--color-border-default) pl-4 w-full h-full">
        <TodayTaskTimingFact fact={task.timing.due} isPrimary={task.timing.primary === 'due'} />
      </div>
      <div className="flex flex-col text-left text-sm pr-4">
        <TodayTaskTimingFact fact={task.timing.scheduled} isPrimary={task.timing.primary === 'scheduled'} />
      </div>
    </li>
  );
}

function TodayTaskTimingFact({fact, isPrimary,}: {fact: TimingFact | null, isPrimary: boolean}) {
  if (!fact) {
    return null
  }

  return (
    <>
      {fact.label ? (
        <span
          className={
            isPrimary
              ? 'font-semibold text-(--color-text-primary)'
              : 'font-medium text-(--color-text-secondary)'
          }
        >
          {fact.label}
        </span>
      ) : null}

      <span className="text-sm text-(--color-text-muted)">
        {fact.formattedDate}
      </span>
    </>
  );
}