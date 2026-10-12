import { createFileRoute, useRouter } from '@tanstack/react-router'
import type { TodayTaskPresentationModel } from '../../features/today/types';
import { groupTasks } from '../../features/today/task-grouper';
import { formatFullReadableDate, parseCalendarDate } from '../../shared/calendar-date';
import dayjs from 'dayjs';
import { prepareTodayPresentation } from '../../features/today/task-presenter';
import { LinkButton } from '../../shared/ui/linkButton';
import { CalendarClock, Check, CircleAlert, Lock, Plus, Sparkle, Sun } from 'lucide-react';
import { Checkbox, Loader } from '@mantine/core';
import type { CalendarDate } from '../../shared/types';
import { Button } from '../../shared/ui/button';
import { useContext } from 'react';
import { TaskSelectionContext } from '../../features/tasks/task-selection-context';
import { useQuery } from '@tanstack/react-query';
import { incompleteTasksQueryOptions } from '../../features/tasks/task-queries';
import { mapTaskToTodayTaskProjection } from '../../features/today/task-mapper';
import { useCompleteTask, useIsCompletingTask } from '../../features/tasks/complete-task';

export const Route = createFileRoute('/_postAuth/today')({
  beforeLoad: () => ({
    referenceDate: getReferenceDate(),
  }),
  pendingComponent: TodayPendingComponent,
  component: TodayComponent,
  errorComponent: TodayRouteErrorComponent
})

function getReferenceDate(): CalendarDate {
  return parseCalendarDate(dayjs().format('YYYY-MM-DD'));
}

function TodayPageShell({referenceDate, children}: {referenceDate: CalendarDate, children: React.ReactNode}) {
  return (
    <main className="p-2 md:p-10">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex flex-col items-start gap-4 min-[390px]:flex-row min-[390px]:justify-between min-[390px]:items-center">
          <div className="flex flex-col gap-1 items-start">
            <h1 className="text-3xl md:text-5xl">Today</h1>
            <span className="text-left text-(color:--color-status-warning)">{formatFullReadableDate(referenceDate)}</span>
          </div>
          <LinkButton
            to="/tasks"
            className="flex gap-2 items-center rounded font-bold h-min bg-(color:--color-action-primary) px-4 py-2.5 text-(color:--color-background-panel) hover:bg-(color:--color-action-primary-hover) w-full min-[390px]:w-auto shrink-0 justify-center whitespace-nowrap"
          >
            <Plus />
            <span>Add task</span>
          </LinkButton>
        </div>
        {children}
      </div>
    </main>
  );
}

function TodayComponent() {
  const tasksQuery = useQuery(incompleteTasksQueryOptions);
  const taskSelection = useContext(TaskSelectionContext);
  const { referenceDate } = Route.useRouteContext();

  if (tasksQuery.isPending) {
    return <TodayPendingComponent />;
  }

  if (tasksQuery.isError) {
    return <TodayErrorComponent
      onRetry={() => {
        void tasksQuery.refetch();
      }}
    />;
  }

  const tasksModel = prepareTodayPresentation(
    groupTasks(
      tasksQuery.data.map(mapTaskToTodayTaskProjection),
      referenceDate,
    ),
    referenceDate,
  );

  return (
    <TodayPageShell referenceDate={tasksModel.date}>
      {
          tasksModel.todayTasks.length || tasksModel.upcomingTasks.length ? (
          <>
            <div
              className="
                mt-8
                grid md:grid-cols-[minmax(0,1fr)_7rem_7rem]
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
            </div>
            <TodayTaskGroup
              tasks={tasksModel.todayTasks}
              noTasksMessage="Nothing for today"
              selectedTaskId={taskSelection.selectedTaskId}
              onSelect={taskSelection.selectTask}
            />
            <div
              className="
                mt-8
                grid md:grid-cols-[minmax(0,1fr)_7rem_7rem]
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
            </div>
            <TodayTaskGroup
              tasks={tasksModel.upcomingTasks}
              noTasksMessage="Nothing upcoming in the next 30 days"
              selectedTaskId={taskSelection.selectedTaskId}
              onSelect={taskSelection.selectTask}
            />
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
    </TodayPageShell>
  )
}

type TodayTaskGroupProps = {
  tasks: TodayTaskPresentationModel[],
  noTasksMessage: string
  selectedTaskId: string | null;
  onSelect: (taskId: string) => void;
}

function TodayTaskGroup({
  tasks,
  noTasksMessage,
  selectedTaskId,
  onSelect
}: TodayTaskGroupProps) {
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
            <TodayTaskRow
              key={task.task.referenceTaskId}
              task={task}
              isSelected={selectedTaskId === task.task.referenceTaskId}
              onSelect={onSelect}
            />
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

type TodayTaskRowProps = {
  task: TodayTaskPresentationModel,
  isSelected: boolean,
  onSelect: (taskId: string) => void;
};

function TodayTaskRow({
  task,
  isSelected,
  onSelect
}: TodayTaskRowProps) {
  const blocking = task.task.taskCompletionState.blocking;
  const isBlocked = blocking.kind === 'blocked';
  const blockedDescription = isBlocked ? blocking.description?.trim() : null;
  const canComplete = task.task.taskCompletionState.canComplete;
  const completion = useCompleteTask();
  const isCompleting = useIsCompletingTask(task.task.referenceTaskId);

  async function handleCompleteTask(task: TodayTaskPresentationModel) {
    if (isCompleting || !canComplete || isBlocked) {
      return;
    }

    completion.mutate({
      taskId: task.task.referenceTaskId,
      taskTitle: task.task.title
    });
  }

  return (
    <li
      className={`
        relative isolate
        p-2 py-4 md:p-4
        grid grid-cols-[2rem_minmax(0,1fr)_2rem]
        items-start gap-x-2 gap-y-1
        md:items-center md:gap-x-4 md:gap-y-0
        ${
          isSelected
            ? 'bg-(color:--color-selected) hover:bg-(color:--color-selected-hover)'
            : 'bg-(color:--color-background-panel) hover:bg-(color:--color-surface-hover)'
        }
      `}
    >
      {
        isCompleting
          ? <div className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-xs">
              <Loader
                aria-hidden="true"
                color="var(--color-status-warning)"
                type="dots"
                size={24}
                h={12}
              />
              <span role="status">Saving...</span>
            </div>
          : null
      }
      <div
        className={`
          flex justify-center items-center
          ${canComplete ? 'relative z-[2]' : ''}
        `}
          role={isBlocked ? 'img' : undefined}
          aria-label={
            isBlocked
              ? 'Paused task; completion unavailable'
              : undefined
          }
      >
        {
          !canComplete
            ? <Lock role="img" aria-hidden="true" />
            : <Checkbox
                color="var(--color-action-primary)"
                iconColor="var(--color-text-inverse)"
                disabled={isCompleting}
                aria-label={`Complete ${task.task.title}`}
                checked={false}
                onChange={() => handleCompleteTask(task)}
              />
        }
      </div>
      <button
          type="button"
          disabled={isCompleting}
          onClick={() => onSelect(task.task.referenceTaskId)}
          aria-label={`View details for ${task.task.title}`}
          className="
            text-left flex flex-col gap-1 md:gap-0 min-w-0
            cursor-pointer
            after:content-['']
            after:absolute after:inset-0 after:z-[1]
            after:cursor-pointer
            focus-visible:outline-none
            focus-visible:after:outline-2
            focus-visible:after:outline-offset-[-2px]
            focus-visible:after:outline-(color:--color-focus-ring)
          "
        >
        <div className="font-semibold text-(--color-text-primary) wrap-anywhere">{task.task.title}</div>
        {
          task.task.projectProjection ? (
            <div className="text-(color:--color-text-muted) text-sm wrap-anywhere">
              {task.task.projectProjection!.title}
            </div>
          ) : null
        }
      </button>
      <div className="flex min-w-0 justify-center pr-2 md:p-0">
        <div
          role="img"
          aria-label={`Assigned to ${task.task.assigneeProjection.name}`}
          title={`Assigned to ${task.task.assigneeProjection.name}`}
          className="
            grid size-7 md:size-9 shrink-0 self-center place-items-center
            rounded-full
            bg-[#7A4526] text-[#F1F5F2]
            border border-white/15
            ring-1 ring-[#C98A63]/70
            ring-offset-2 ring-offset-[var(--color-background-panel)]
            text-sm font-semibold tracking-tight
          "
        >
          {task.task.assigneeProjection.name.charAt(0).toUpperCase()}
        </div>
      </div>
      {
        (task.timing.due?.label || task.timing.scheduled?.label) ? (
          <div className="col-start-2 col-end-[-1] min-w-0 flex flex-col gap-y-1 text-left text-sm md:flex-row md:flex-wrap md:gap-x-3">
            {task.timing.due?.label && (
              <span className="max-w-full">
                {task.timing.due.label}
              </span>
            )}

            {task.timing.scheduled?.label && (
              <span className="inline-flex max-w-full items-baseline gap-x-3">
                {task.timing.due?.label && (
                  <span
                    className="hidden shrink-0 md:inline"
                    aria-hidden="true"
                  >
                    •
                  </span>
                )}
                <span className="min-w-0">
                  {task.timing.scheduled.label}
                </span>
              </span>
            )}
          </div>
        ) : null
      }
      {
        completion.isError || !canComplete  ? (
          <div
            className="
              md:col-start-2 col-start-1 col-end-[-1]
              px-2 md:px-0 md:pr-[2.5rem] text-left
            "
          >
            <div
              className="
                border-t border-(color:--color-border-default)
                pt-3 pr-4 mt-3 text-sm
              "
            >
              <span
                role={completion.isError ? 'alert' : undefined}
                className={`
                  font-semibold
                  ${completion.isError ? 'text-(color:--color-status-danger)' : 'text-(color:--color-text-primary)' }
                `}
              >
                {completion.isError
                  ? 'Couldn\'t complete this task. Try again.'
                  : isBlocked
                    ? 'Paused'
                    : 'Completion unavailable'}
              </span>
              <span className="wrap-anywhere">
                {
                  !completion.isError && isBlocked && blockedDescription ? (
                    <> - {blockedDescription}</>
                  ) : null
                }
              </span>
            </div>
          </div>
        ) : null
      }
    </li>
  );
}

function TodayPendingComponent() {
  const routeContext = Route.useRouteContext();

  return (
    <TodayPageShell referenceDate={routeContext.referenceDate}>
      <div aria-busy="true">
        <span className="sr-only" role="status">
          Loading today&apos;s tasks
        </span>

        <TodayTaskSkeletonGroup
          title="For Today"
          icon={<Sun className="text-(--color-status-warning)" />}
          rowCount={3}
        />

        <TodayTaskSkeletonGroup
          title="Upcoming"
          icon={<CalendarClock className="text-(--color-status-warning)" />}
          rowCount={2}
        />
      </div>
    </TodayPageShell>
  )
}

function TodayTaskSkeletonGroup({title, icon, rowCount}: {title: string, icon: React.ReactNode, rowCount: number}) {
  return (
    <section className="mt-8">
      <div className="flex items-center gap-3">
        {icon}
        <h2 className="mb-0! text-left text-2xl">
          {title}
        </h2>
      </div>

      <ul
        aria-hidden="true"
        className="
          mt-3 overflow-hidden rounded-2xl shadow
          border border-(color:--color-border-default)
          divide-y divide-(color:--color-border-default)
        "
      >
        {Array.from({ length: rowCount }, (_, index) => (
          <TodayTaskSkeletonRow key={index} />
        ))}
      </ul>
    </section>
  );
}

function TodayTaskSkeletonRow() {
  return (
    <li
      className="
        grid grid-cols-[2rem_minmax(0,1fr)_2rem]
        min-h-[4.875rem] items-start gap-x-2 gap-y-1
        bg-(color:--color-background-panel) py-4 p-2 md:p-4
        md:gap-x-4 md:gap-y-0
      "
    >
      <div className="flex items-center justify-center">
        <TodayTaskSkeletonBone className="size-5 rounded" />
      </div>
      <div className="flex flex-col items-start gap-2">
        <TodayTaskSkeletonBone
          className="h-3 w-[min(78%,14rem)] rounded-full"
        />
        <TodayTaskSkeletonBone
          className="h-2.5 w-[min(48%,9rem)] rounded-full"
        />
      </div>
      <div className="flex min-w-0 justify-center pr-2">
        <TodayTaskSkeletonBone className="size-7 shrink-0 md:size-9 rounded-full" />
      </div>
      <div className="col-start-2 col-end-[-1] text-left text-sm w-full md:h-full">
        <TodayTaskSkeletonBone
          className="h-2.5 w-16 rounded-full"
        />
      </div>
    </li>
  );
}

function TodayTaskSkeletonBone({ className }: { className: string }) {
  return (
    <div
      className={`
        bg-(color:--color-surface-hover)
        animate-pulse motion-reduce:animate-none
        ${className}
      `}
    />
  )
}

function TodayErrorComponent({ onRetry }: { onRetry: () => void }) {
  const routeContext = Route.useRouteContext();

  return (
    <TodayPageShell referenceDate={routeContext.referenceDate}>
      <div className="p-10 flex flex-col justify-center items-center bg-(color:--color-background-panel) border border-(color:--color-border-default) rounded-2xl shadow mt-8">
        <div className="flex flex-col items-center" role="alert">
          <CircleAlert size={36} className="text-(--color-status-warning)" aria-hidden="true" />
          <h2 className="text-(color:--color-text-muted)">We couldn't load today's tasks</h2>
          <span className="text-(color:--color-text-subtle)">Try again to refresh the list.</span>
        </div>
        <Button
          color=""
          className="mt-5"
          type="button"
          onClick={onRetry}
          variant="primary"
        >Try again</Button>
      </div>
    </TodayPageShell>
  );
}

function TodayRouteErrorComponent() {
  const router = useRouter();

  return (
    <TodayErrorComponent
      onRetry={() => {
        void router.invalidate();
      }}
    />
  );
}