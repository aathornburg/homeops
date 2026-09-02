import type { CalendarDate } from "../../shared/types";
import { type TodayTaskProjection, type TodayTasksModel, type TodayCategory, TODAY_CATEGORY_ORDER } from "./types";
import { add, compareCalendarDates, isAfter, isBefore, isEqual } from "../../shared/calendar-date";

export function groupTasks(tasks: TodayTaskProjection[], referenceDate: CalendarDate): TodayTasksModel {
  const upcomingHorizon = add(referenceDate, 30, 'day');
  const deduplicatedTasks = deduplicate(tasks);

  const todayTasks = deduplicatedTasks.filter(task =>
    showOnTodayPanel(task.dueDate, referenceDate)
    || showOnTodayPanel(task.scheduledDate, referenceDate));
  const upcomingTasks = deduplicatedTasks.filter(task =>
    !todayTasks.includes(task)
    && (showOnUpcomingPanel(task.dueDate, referenceDate, upcomingHorizon) || showOnUpcomingPanel(task.scheduledDate, referenceDate, upcomingHorizon)));

  return {
    todayTasks: sortTodayTasks(todayTasks, referenceDate),
    upcomingTasks: sortUpcomingTasks(upcomingTasks)
  };
}

function deduplicate(tasks: TodayTaskProjection[]): TodayTaskProjection[] {
  const seen = new Set();
  return tasks.filter(task => !seen.has(task.referenceTaskId) && seen.add(task.referenceTaskId));
}

function showOnTodayPanel(taskDate: CalendarDate | null, referenceDate: CalendarDate): boolean {
  return !!taskDate && isBefore(taskDate, referenceDate, true);
}


function showOnUpcomingPanel(taskDate: CalendarDate | null, referenceDate: CalendarDate, upcomingHorizon: CalendarDate): boolean {
  return !!taskDate && isAfter(taskDate, referenceDate, false) && isBefore(taskDate, upcomingHorizon, true);
}

function sortTodayTasks(todayTasks: TodayTaskProjection[], referenceDate: CalendarDate): TodayTaskProjection[] {
  return todayTasks.sort((a, b) =>
    compareTodayCategory(a, b, referenceDate) ||
    compareTitles(a, b) ||
    compareIds(a, b));
}

function sortUpcomingTasks(upcomingTasks: TodayTaskProjection[]): TodayTaskProjection[] {
  return upcomingTasks.sort((a, b) =>
    compareCalendarDates(getUpcomingSortDate(a), getUpcomingSortDate(b)) ||
    compareTitles(a, b) ||
    compareIds(a, b)
  );
}

function getUpcomingSortDate(task: TodayTaskProjection): CalendarDate {
  // Return earliest date
  if (task.dueDate && task.scheduledDate) {
    return isBefore(
      task.dueDate,
      task.scheduledDate,
      false
    )
      ? task.dueDate
      : task.scheduledDate;
  }

  // Otherwise use due date
  if (task.dueDate) {
    return task.dueDate;
  }

  // Otherwise use scheduled date
  if (task.scheduledDate) {
    return task.scheduledDate;
  }

  throw new Error(
    `Upcoming task ${task.referenceTaskId} has no date`
  );
}

function compareTodayCategory(a: TodayTaskProjection, b: TodayTaskProjection, referenceDate: CalendarDate): number {
  const aCategory = determineCategorySortRank(a, referenceDate);
  const bCategory = determineCategorySortRank(b, referenceDate);

  return TODAY_CATEGORY_ORDER.indexOf(aCategory) - TODAY_CATEGORY_ORDER.indexOf(bCategory);
}

function determineCategorySortRank(task: TodayTaskProjection, referenceDate: CalendarDate): TodayCategory {
  if (task.dueDate && isBefore(task.dueDate, referenceDate, false)) {
    return 'overdue';
  } else if (task.dueDate && isEqual(task.dueDate, referenceDate)) {
    return 'due-today';
  }

  return 'planned';
}

function compareTitles(a: TodayTaskProjection, b: TodayTaskProjection): number {
  return a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' });
}

function compareIds(a: TodayTaskProjection, b: TodayTaskProjection): number {
  return Number(a.referenceTaskId > b.referenceTaskId) - Number(a.referenceTaskId < b.referenceTaskId);
}