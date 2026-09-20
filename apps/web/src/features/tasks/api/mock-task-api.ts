import dayjs from "dayjs";
import { parseCalendarDate } from "../../../shared/calendar-date";
import type { TaskApiDto } from "./types";

// let attemptCount = 0;

const mockTasks: TaskApiDto[] = [
  {
    taskId: 'task-replace-air-filter',
    title: 'Replace HVAC air filter',

    status: 'open',
    completedAt: null,
    cancelledAt: null,
    archivedAt: null,

    dueDate: '2026-08-29',
    scheduledDate: null,

    assignee: {
      householdMemberId: 'member-alex',
      displayName: 'Alex',
    },

    isBlocked: false,
    blockedDescription: null,

    capabilities: {
      canComplete: true,
    },

    project: null,
  },
  {
    taskId: 'task-pick-up-groceries',
    title: 'Pick up groceries',

    status: 'open',
    completedAt: null,
    cancelledAt: null,
    archivedAt: null,

    dueDate: null,
    scheduledDate: '2026-08-29',

    assignee: {
      householdMemberId: 'member-jordan',
      displayName: 'Jordan',
    },

    isBlocked: false,
    blockedDescription: null,

    capabilities: {
      canComplete: false,
    },

    project: null,
  },
  {
    taskId: 'task-schedule-electrician',
    title: 'Schedule electrician visit',

    status: 'open',
    completedAt: null,
    cancelledAt: null,
    archivedAt: null,

    dueDate: '2026-09-29',
    scheduledDate: null,

    assignee: {
      householdMemberId: 'member-alex',
      displayName: 'Alex',
    },

    isBlocked: true,
    blockedDescription: 'Waiting for the electrician to return our call',

    capabilities: {
      canComplete: false,
    },

    project: {
      projectId: 'project-update-kitchen-lighting',
      title: 'Update kitchen lighting',
    },
  },
  {
    taskId: 'task-measure-office-window',
    title: 'Measure office window for blinds',

    status: 'open',
    completedAt: null,
    cancelledAt: null,
    archivedAt: null,

    dueDate: '2026-09-04',
    scheduledDate: '2026-09-01',

    assignee: {
      householdMemberId: 'member-alex',
      displayName: 'Alex',
    },

    isBlocked: false,
    blockedDescription: null,

    capabilities: {
      canComplete: true,
    },

    project: {
      projectId: 'project-finish-home-office',
      title: 'Finish home office',
    },
  },
];

export function fetchIncompleteTasks(): Promise<TaskApiDto[]> {
  // attemptCount += 1;

  // return new Promise<TaskApiDto[]>((resolve, reject) => {
  //   setTimeout(() => {
  //     if (attemptCount === 1) {
  //       reject(new Error('Failed to fetch tasks'));
  //     } else {
  //       resolve(mockTasks);
  //     }
  //   }, 3500);
  // });

  /* Manual development responses — enable exactly one; restore Normal before committing. */

  // Regular Tasks
  return Promise.resolve(mockTasks.filter(task => task.status === 'open' && !task.archivedAt));

  // Empty tasks
  // return Promise.resolve([]);

  // Pending tasks
  // return new Promise<TaskApiDto[]>(() => {});

  // Errored tasks
  // return Promise.reject(new Error('Failed to fetch tasks'));
}

export async function completeTask(taskId: string): Promise<TaskApiDto> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1500);
  });

  // Mock API response
  const taskApiResponse = mockTasks.find(task => task.taskId === taskId);

  if (!taskApiResponse || !taskApiResponse.capabilities?.canComplete) {
    return Promise.reject(new Error('Failed to complete task'))
  }

  taskApiResponse.status = 'completed';
  taskApiResponse.capabilities.canComplete = false;
  taskApiResponse.completedAt = parseCalendarDate(dayjs().format('YYYY-MM-DD'));

  return Promise.resolve(taskApiResponse);
}

// This will need updated in the future. Undoing a completed task if different than just opening a task
// To undo, we will need to "recalculate" the old task's status
export async function undoCompleteTask(taskId: string): Promise<TaskApiDto> {
  await new Promise<void>((resolve) => {
    setTimeout(resolve, 1500);
  });

  // Mock API response
  const taskApiResponse = mockTasks.find(task => task.taskId === taskId);

  if (!taskApiResponse || taskApiResponse.status !== 'completed') {
    return Promise.reject(new Error('Failed to undo complete task'))
  }

  taskApiResponse.status = 'open';
  taskApiResponse.capabilities.canComplete = true;
  taskApiResponse.completedAt = null;

  return Promise.resolve(taskApiResponse);
}
