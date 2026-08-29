import type { TaskApiDto } from "./types";

const mockTasks = [
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

    dueDate: '2026-08-29',
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
] satisfies TaskApiDto[];

export function fetchIncompleteTasks(): Promise<TaskApiDto[]> {
  return Promise.resolve(mockTasks);
}