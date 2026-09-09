import type { CalendarDate } from "../../shared/types";
import type { TodayPresentationModel, TodayTasksModel } from "./types";
import { calculateDaysBetween, formatShortReadableDate, isBefore, isEqual } from "../../shared/calendar-date";

export function prepareTodayPresentation(groupedTasks: TodayTasksModel, referenceDate: CalendarDate): TodayPresentationModel {
  return {
    date: referenceDate,
    todayTasks: groupedTasks.todayTasks.map(task => ({
      task,
      timing: {
        due: task.dueDate ? {
          formattedDate: formatShortReadableDate(task.dueDate),
          label: determineLabel(task.dueDate, referenceDate, true)
        } : null,
        scheduled: task.scheduledDate ? {
          formattedDate: formatShortReadableDate(task.scheduledDate),
          label: determineLabel(task.scheduledDate, referenceDate, false)
        } : null,
        primary: determinePrimaryTiming(task.dueDate, task.scheduledDate, referenceDate)
      }
    })),
    upcomingTasks: groupedTasks.upcomingTasks.map(task => ({
      task,
      timing: {
        due: task.dueDate ? {
          formattedDate: formatShortReadableDate(task.dueDate),
          label: determineLabel(task.dueDate, referenceDate, true)
        } : null,
        scheduled: task.scheduledDate ? {
          formattedDate: formatShortReadableDate(task.scheduledDate),
          label: determineLabel(task.scheduledDate, referenceDate, false)
        } : null,
        primary: determinePrimaryTiming(task.dueDate, task.scheduledDate, referenceDate)
      }
    }))
  };
}

function determineLabel(date: CalendarDate | null, referenceDate: CalendarDate, isDue: boolean): string | null {
  if (!date) {
    return null;
  }

  const daysBetween = calculateDaysBetween(referenceDate, date);

  if (isBefore(date, referenceDate, false)) {
    if (!isDue) {
      return daysBetween === -1 ? 'Yesterday' : `Late`;
    }
    return 'Overdue';
  }

  if (isEqual(date, referenceDate)) {
    return 'Today';
  }

  if (daysBetween === 1) {
    return 'Tomorrow';
  }

  return `In ${daysBetween} days`;
}

function determinePrimaryTiming(dueDate: CalendarDate | null, scheduledDate: CalendarDate | null, referenceDate: CalendarDate): 'due' | 'scheduled' {
  if (!dueDate && !scheduledDate) {
    throw new Error('Both dueDate and scheduledDate cannot be null');
  }

  if (dueDate && isBefore(dueDate, referenceDate, true)) {
    return 'due';
  } else if (scheduledDate && isBefore(scheduledDate, referenceDate, true)) {
    return 'scheduled';
  } else if (dueDate && scheduledDate) {
    return isBefore(dueDate, scheduledDate, true) ? 'due' : 'scheduled';
  } else if (dueDate) {
    return 'due';
  } else {
    return 'scheduled';
  }
}