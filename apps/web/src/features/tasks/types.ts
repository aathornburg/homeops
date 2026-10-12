import type { JSONContent } from "@tiptap/core"
import type { CalendarDate } from "../../shared/types"

export type TaskModel = {
  taskId: string
  title: string
  instructions: JSONContent | null

  status: 'open' | 'completed' | 'cancelled'
  completedAt: string | null
  cancelledAt: string | null
  archivedAt: string | null

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