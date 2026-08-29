export type TaskApiDto = {
  taskId: string
  title: string

  status: 'open' | 'completed' | 'cancelled'
  completedAt: string | null
  cancelledAt: string | null
  archivedAt: string | null

  dueDate: string | null
  scheduledDate: string | null

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