import type { TodayTaskProjection } from "./types";
import type { TaskModel } from "../tasks/types";

export function mapTaskToTodayTaskProjection(task: TaskModel): TodayTaskProjection {
  return {
    referenceTaskId: task.taskId,
    title: task.title,
    destination: '/tasks',
    taskCompletionState: {
      blocking: task.isBlocked ? {
        kind: 'blocked',
        description: task.blockedDescription
      } : { kind: 'unblocked' },
      canComplete: task.capabilities.canComplete
    },
    dueDate: task.dueDate,
    scheduledDate: task.scheduledDate,
    projectProjection: task.project ? {
      id: task.project.projectId,
      title: task.project.title
    } : null,
    assigneeProjection: {
      memberId: task.assignee.householdMemberId,
      name: task.assignee.displayName
    }
  };
}