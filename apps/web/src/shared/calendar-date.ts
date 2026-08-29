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