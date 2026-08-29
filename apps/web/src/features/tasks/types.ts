import type { CalendarDate } from "../../shared/types"

export type TaskModel = {
  taskId: string
  title: string

  status: 'open' | 'completed' | 'cancelled'
  completedAt: CalendarDate | null
  cancelledAt: CalendarDate | null
  archivedAt: CalendarDate | null

  dueDate: CalendarDate | null
  scheduledDate: CalendarDate | null

  assignee: {
    householdMemberId: string
    displayName: string
  }

  isBlocked: boolean
  blockedDescription: string | null

  capabilities: {
    canComplete: boolean
  }

  project: {
    projectId: string
    title: string
  } | null
}