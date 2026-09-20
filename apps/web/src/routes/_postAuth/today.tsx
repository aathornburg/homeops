import { createFileRoute, useRouter } from '@tanstack/react-router'
import { loadTodayTasks } from '../../features/today/load-today-tasks'
import type { TimingFact, TodayPresentationModel, TodayTaskPresentationModel, TodayTaskProjection, TodayTasksModel } from '../../features/today/types';
import { groupTasks } from '../../features/today/task-grouper';
import { formatFullReadableDate, parseCalendarDate } from '../../shared/calendar-date';
import dayjs from 'dayjs';
import { prepareTodayPresentation } from '../../features/today/task-presenter';
import { LinkButton } from '../../shared/ui/linkButton';
import { CalendarClock, Check, CircleAlert, Lock, Plus, Sparkle, Sun } from 'lucide-react';
import { Checkbox, Loader } from '@mantine/core';
import type { CalendarDate } from '../../shared/types';
import { Button } from '../../shared/ui/button';
import { completeTask, undoCompleteTask } from '../../features/tasks/api/mock-task-api';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';

export const Route = createFileRoute('/_postAuth/today')({
  beforeLoad: () => ({
    referenceDate: getReferenceDate(),
  }),
  loader: ({context}) => getTasksModel(context.referenceDate),
  pendingComponent: TodayPendingComponent,
  component: TodayComponent,
  errorComponent: TodayErrorComponent
})

function getReferenceDate(): CalendarDate {
  return parseCalendarDate(dayjs().format('YYYY-MM-DD'));
}

function getTasksModel(referenceDate: CalendarDate ): Promise<TodayPresentationModel> {
  return loadTodayTasks()
    .then((tasks: TodayTaskProjection[]) => groupTasks(tasks, referenceDate))
    .then((tasksModel: TodayTasksModel) => prepareTodayPresentation(tasksModel, referenceDate));
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
  const tasksModel: TodayPresentationModel = Route.useLoaderData();

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
              {
                tasksModel.todayTasks.length ? (<>
                  <div className="hidden md:block text-sm font-semibold text-left">Due</div>
                  <div className="hidden md:block text-sm font-semibold text-left">Planned</div>
                </>) : null
              }
            </div>
            <TodayTaskGroup tasks={tasksModel.todayTasks} noTasksMessage="Nothing for today" />
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
              {
              tasksModel.upcomingTasks.length ? (<>
                  <div className="hidden md:block text-sm font-semibold text-left">Due</div>
                  <div className="hidden md:block text-sm font-semibold text-left">Planned</div>
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
    </TodayPageShell>
  )
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
  const blocking = task.task.taskCompletionState.blocking;
  const isBlocked = blocking.kind === 'blocked';
  const blockedDescription = isBlocked ? blocking.description?.trim() : null;
  const canComplete = task.task.taskCompletionState.canComplete;

  const [isSaving, setIsSaving] = useState(false);
  const [completionError, setCompletionError] = useState<string | null>(null);
  const router = useRouter();

  function handleUndo(task: TodayTaskPresentationModel, notificationId: string) {
    return undoCompleteTask(task.task.referenceTaskId)
      .then(() => {
        notifications.hide(notificationId);
        return router.invalidate({ sync: true });
      });
  }

  async function handleCompleteTask(task: TodayTaskPresentationModel) {
    if (isSaving || !canComplete || isBlocked) {
      return;
    }

    setCompletionError(null);
    setIsSaving(true);
    await completeTask(task.task.referenceTaskId)
      .then(() => {
        const notificationId = crypto.randomUUID();

        notifications.show({
          id: notificationId,
          message: (
            <TodayCompletedNoticeComponent
              taskTitle={ task.task.title }
              onUndo={ () => handleUndo(task, notificationId) }
            />
          ),
          autoClose: false,
          color: 'var(--color-status-success)',
          icon: (
            <Check
              size={18}
              color="var(--color-action-on-primary)"
              aria-hidden="true"
            />
          ),
          radius: 'md',
        });
        return router.invalidate({ sync: true })
      })
      .catch(() => {
        setCompletionError('Couldn\'t complete this task. Try again.');
      })
      .finally(() => { setIsSaving(false) });
  }

  return (
    <li
      className="
        relative
        p-2 md:p-4
        grid grid-cols-[2rem_minmax(0,1fr)_2rem] md:grid-cols-[2rem_minmax(0,1fr)_3rem_7rem_7rem]
        items-start gap-x-2 gap-y-1 md:items-center md:gap-x-4 md:gap-y-0
        bg-(color:--color-background-panel) py-4
      "
    >
      {
        isSaving
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
        className="flex justify-center items-center"
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
                disabled={isSaving}
                aria-label={`Complete ${task.task.title}`}
                checked={false}
                onChange={() => handleCompleteTask(task)}
              />
        }
      </div>
      <div className="text-left flex flex-col gap-1 md:gap-0 min-w-0">
        <div className="font-semibold text-(--color-text-primary) wrap-anywhere">{task.task.title}</div>
        {
          task.task.projectProjection ? (
            <div className="text-(color:--color-text-muted) text-sm wrap-anywhere">
              {task.task.projectProjection!.title}
            </div>
          ) : null
        }
      </div>
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
      <div className={`${task.timing.due ? 'block' : 'hidden'} col-start-2 col-end-[-1] md:flex flex-col items-start justify-center text-left text-sm md:border-l border-(color:--color-border-default) md:pl-4 w-full md:h-full md:col-start-4 md:col-end-5 md:row-start-1`}>
        <TodayTaskTimingFact fact={task.timing.due} isPrimary={task.timing.primary === 'due'} />
      </div>
      <div className={`${task.timing.scheduled ? 'block' : 'hidden'} col-start-2 col-end-[-1] md:flex flex-col text-left text-sm md:pr-4 md:col-start-5 md:col-end-6 md:row-start-1`}>
        <TodayTaskTimingFact fact={task.timing.scheduled} isPrimary={task.timing.primary === 'scheduled'} />
      </div>
      {
        completionError || !canComplete  ? (
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
                role={completionError ? 'alert' : undefined}
                className={`
                  font-semibold
                  ${completionError ? 'text-(color:--color-status-danger)' : 'text-(color:--color-text-primary)' }
                `}
              >
                {completionError
                  ? completionError
                  : isBlocked
                    ? 'Paused'
                    : 'Completion unavailable'}
              </span>
              <span className="wrap-anywhere">
                {
                  !completionError && isBlocked && blockedDescription ? (
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

function TodayTaskTimingFact({fact, isPrimary}: {fact: TimingFact | null, isPrimary: boolean}) {
  if (!fact) {
    return null
  }

  return (
    <>
      {fact.label ? (
        <span
          className={
            isPrimary
              ? 'font-medium text-(--color-text-primary)'
              : 'font-medium text-(--color-text-secondary)'
          }
        >
          {fact.label}
        </span>
      ) : null}
      {fact.label && fact.formattedDate ? (
        <span className="md:hidden"> • </span>
      ) : null}
      <span className="text-sm text-(--color-text-muted)">
        {fact.formattedDate}
      </span>
    </>
  );
}

type TodayCompletedNoticeProps = {
  taskTitle: string;
  onUndo: () => Promise<void>;
}

function TodayCompletedNoticeComponent(todayCompletedNoticeProps: TodayCompletedNoticeProps) {
  const [isUndoing, setIsUndoing] = useState(false);
  const [undoError, setUndoError] = useState<string | null>(null);

  async function undoTask() {
    if (isUndoing) {
      return;
    }

    setUndoError(null);
    setIsUndoing(true);

    await todayCompletedNoticeProps.onUndo()
      .catch(() => {
        setUndoError('We\'re having trouble with this right now');
      })
      .finally(() => {
        setIsUndoing(false);
      });
  }

  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <span>Task completed</span>
        <span>{ todayCompletedNoticeProps.taskTitle }</span>
        {
          undoError ? <span role="alert" className="text-(color:--color-status-danger)">{ undoError }</span> : null
        }
      </div>
      <Button
        disabled={ isUndoing ? true : undefined }
        onClick={ undoTask }
      >
        { isUndoing ? 'Undoing...' : 'Undo' }
      </Button>
    </div>
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
        grid grid-cols-[2rem_minmax(0,1fr)_2rem] md:grid-cols-[2rem_minmax(0,1fr)_3rem_7rem_7rem]
        min-h-[4.875rem] items-start gap-x-2 gap-y-1 md:items-center md:gap-x-4 md:gap-y-0
        bg-(color:--color-background-panel) py-4 p-2 md:p-4
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
      <div className="flex min-w-0 justify-center pr-2 md:p-0">
        <TodayTaskSkeletonBone className="size-7 shrink-0 md:size-9 rounded-full" />
      </div>
      <div
        className="
          flex md:h-full w-full items-start justify-center
          md:border-l md:border-(color:--color-border-default)
          col-start-2 col-end-[-1] md:flex flex-col text-left text-sm md:pl-4 md:row-start-1 md:col-start-4 md:col-end-5
        "
      >
        <TodayTaskSkeletonBone
          className="h-2.5 w-16 rounded-full"
        />
      </div>

      <div className="flex items-start col-start-2 col-end-[-1] md:flex flex-col text-left text-sm md:pr-4 md:col-start-5 md:col-end-6 md:row-start-1">
        <TodayTaskSkeletonBone
          className="h-2.5 w-20 rounded-full"
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

function TodayErrorComponent() {
  const router = useRouter();
  const routeContext = Route.useRouteContext();

  function retry() {
    router.invalidate();
  }

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
          onClick={retry}
          variant="primary"
        >Try again</Button>
      </div>
    </TodayPageShell>
  );
}