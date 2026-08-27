import type { CalendarDate, RouteDestination } from "../../shared/types";

export type TodayTaskProjection = {
  referenceTaskId: string,
  title: string,
  destination: RouteDestination,
  taskCompletionState: TaskCompletionState,
  dueDate: CalendarDate | null,
  scheduledDate: CalendarDate | null,
  projectProjection: ProjectProjection | null,
}


type TaskCompletionState =
  | {
      kind: 'completable'
      canComplete: true
    }
  | {
      kind: 'blocked'
      canComplete: false
      blockedDescription: string | null
    }

export type ProjectProjection = {
  id: string,
  title: string
}