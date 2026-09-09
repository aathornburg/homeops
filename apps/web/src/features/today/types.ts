import type { CalendarDate, RouteDestination } from "../../shared/types";

export type TodayTasksModel = {
  todayTasks: TodayTaskProjection[],
  upcomingTasks: TodayTaskProjection[],
}

export type TodayTaskProjection = {
  referenceTaskId: string,
  title: string,
  destination: RouteDestination,
  taskCompletionState: TaskCompletionState,
  dueDate: CalendarDate | null,
  scheduledDate: CalendarDate | null,
  projectProjection: ProjectProjection | null,
  assigneeProjection: AssigneeProjection
}

export type TaskCompletionState = {
  blocking:
  | { kind: 'unblocked' }
  | { kind: 'blocked'; description: string | null }

  canComplete: boolean
}

export type ProjectProjection = {
  id: string,
  title: string
}

export type AssigneeProjection = {
  memberId: string,
  name: string
}

export type TodayPresentationModel = {
  date: CalendarDate,
  todayTasks: TodayTaskPresentationModel[],
  upcomingTasks: TodayTaskPresentationModel[]
}

export type TodayTaskPresentationModel = {
  task: TodayTaskProjection,
  timing: TodayTaskTiming
}

export type TodayTaskTiming = {
  due: TimingFact | null,
  scheduled: TimingFact | null
  primary: 'due' | 'scheduled'
}

export type TimingFact = {
  formattedDate: string,
  label: string | null
}

export const TODAY_CATEGORY_ORDER = [
  'overdue',
  'due-today',
  'planned'
] as const;

export type TodayCategory =
  typeof TODAY_CATEGORY_ORDER[number];