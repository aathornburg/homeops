import { parseCalendarDate } from "../../../shared/calendar-date";
import type { CalendarDate } from "../../../shared/types";
import type { TaskModel } from "../types";
import type { TaskApiDto } from "./types";

function parseApiDtoDate(apiDtoDate: string | null): CalendarDate | null {
  return apiDtoDate !== null ? parseCalendarDate(apiDtoDate) : null;
}

export function mapTaskApiDtoToTaskModel(dto: TaskApiDto): TaskModel {
  if (dto.isBlocked && dto.capabilities.canComplete) {
    throw new Error( `Task ${dto.taskId} cannot be both blocked and completable`);
  }

  return {
    taskId: dto.taskId,
    title: dto.title,

    status: dto.status,
    completedAt: parseApiDtoDate(dto.completedAt),
    cancelledAt: parseApiDtoDate(dto.cancelledAt),
    archivedAt: parseApiDtoDate(dto.archivedAt),

    dueDate: parseApiDtoDate(dto.dueDate),
    scheduledDate: parseApiDtoDate(dto.scheduledDate),

    assignee: dto.assignee,

    isBlocked: dto.isBlocked,
    blockedDescription: dto.blockedDescription,

    capabilities: dto.capabilities,

    project: dto.project,
  };
}