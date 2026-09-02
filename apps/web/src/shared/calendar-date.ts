import dayjs from 'dayjs';
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { CalendarDate } from './types';

dayjs.extend(customParseFormat);

const CALENDAR_DATE_FORMAT = "YYYY-MM-DD";

export function parseCalendarDate(stringDate: string): CalendarDate {
  const parsedDate = dayjs(stringDate, CALENDAR_DATE_FORMAT, true);

  if (!parsedDate.isValid()) {
    throw new Error(`Invalid calendar date: ${stringDate}`);
  }

  return stringDate as CalendarDate;
}

/* Returns true if date1 is before date2 */
export function isBefore(date1: CalendarDate, date2: CalendarDate, inclusive: boolean): boolean {
  const date1dayjs = dayjs(date1);
  const date2dayjs = dayjs(date2);

  return date1dayjs.isBefore(date2) || (inclusive && date1dayjs.isSame(date2dayjs));
}

export function isEqual(date1: CalendarDate, date2: CalendarDate): boolean {
  const date1dayjs = dayjs(date1);
  const date2dayjs = dayjs(date2);

  return date1dayjs.isSame(date2dayjs);
}

/* Returns true if date1 is after date2 */
export function isAfter(date1: CalendarDate, date2: CalendarDate, inclusive: boolean): boolean {
  const date1dayjs = dayjs(date1);
  const date2dayjs = dayjs(date2);

  return date1dayjs.isAfter(date2) || (inclusive && date1dayjs.isSame(date2dayjs));
}

export function add(date: CalendarDate, amount: number, unit: 'day' | 'month' | 'year'): CalendarDate {
  const dayjsDate = dayjs(date);

  return parseCalendarDate(dayjsDate.add(amount, unit).format(CALENDAR_DATE_FORMAT));
}

export function compareCalendarDates(a: CalendarDate, b: CalendarDate): number {
  if (isBefore(a, b, false)) {
    return -1;
  }

  if (isAfter(a, b, false)) {
    return 1;
  }

  return 0;
}