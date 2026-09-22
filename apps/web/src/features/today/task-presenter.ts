import type { CalendarDate } from "../../shared/types";
import type { TodayPresentationModel, TodayTasksModel } from "./types";
import { calculateDaysBetween, formatShortReadableDate } from "../../shared/calendar-date";

export function prepareTodayPresentation(groupedTasks: TodayTasksModel, referenceDate: CalendarDate): TodayPresentationModel {
  return {
    date: referenceDate,
    todayTasks: groupedTasks.todayTasks.map(task => ({
      task,
      timing: {
        due: task.dueDate ? {
          label: determineLabel(task.dueDate, referenceDate, true)
        } : null,
        scheduled: task.scheduledDate ? {
          label: determineLabel(task.scheduledDate, referenceDate, false)
        } : null,
      }
    })),
    upcomingTasks: groupedTasks.upcomingTasks.map(task => ({
      task,
      timing: {
        due: task.dueDate ? {
          label: determineLabel(task.dueDate, referenceDate, true)
        } : null,
        scheduled: task.scheduledDate ? {
          label: determineLabel(task.scheduledDate, referenceDate, false)
        } : null,
      }
    }))
  };
}

function determineLabel(date: CalendarDate | null, referenceDate: CalendarDate, isDue: boolean): string | null {
  if (!date) {
    return null;
  }

  const daysBetween = calculateDaysBetween(referenceDate, date);
  const isOverdue = isDue && daysBetween < 0;
  let dateText;

  if (daysBetween === -1) {
    dateText = 'Yesterday';
  } else if (daysBetween === 0) {
    dateText = 'Today';
  } else if (daysBetween === 1) {
    dateText = 'Tomorrow';
  } else {
    dateText = formatShortReadableDate(date);
  }

  return `${isDue ? 'Due' : 'Planned'} ${dateText} ${isOverdue ? '(Overdue)' : ''}`.trim();
}