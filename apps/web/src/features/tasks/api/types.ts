import type { JSONContent } from '@tiptap/core';

export type TaskApiDto = {
  taskId: string
  title: string
  instructions: JSONContent | null

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


export type UpdateTaskInput = {
  taskId: string;
  title: string;
  assigneeId: string;
  projectId: string | null;
  scheduledDate: string | null;
  dueDate: string | null;
  instructions: JSONContent | null;
};