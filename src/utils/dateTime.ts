import { StaffAttendanceResultPropsWithClassStatusForTodayClasses } from '@types';

const MILLISECONDS_IN_A_DAY = 86400000;

export const daysFromToday = (days: number): Date => {
  const today = new Date();

  return new Date(today.getTime() + days * MILLISECONDS_IN_A_DAY);
};

export const daysFromDate = (date: Date, days: number): Date => {
  return new Date(date.getTime() + days * MILLISECONDS_IN_A_DAY);
};

export const formatDateToMobileAppFormatString = (date: Date): string => {
  const [year, month, _date] = date.toISOString().slice(0, 10).split('-');

  return `${_date}/${month}/${year}`;
};

export const formatDateToApiFormatString = (date: Date): string => {
  const [year, month, _date] = date.toISOString().slice(0, 10).split('-');

  return `${year}-${month}-${_date}`;
};

export const convertToDateFromTime = (time: string): Date => {
  const _ = new Date();

  const hours = parseInt(time.slice(0, 2));
  const minutes = parseInt(time.slice(3, 5));
  const seconds = parseInt(time.slice(6, 8));

  // NOTE:
  // This does not return local time

  // As the time is already in UTC, we need to offset it with local time when creating a new Date object
  // Other wise the already UTC time is again converted to UTC, that means the offset it applied twice

  // new Date(year, monthIndex, day, hours, minutes, seconds)
  return new Date(
    _.getUTCFullYear(),
    _.getUTCMonth(),
    _.getUTCDate(),
    hours - _.getTimezoneOffset() / 60,
    minutes,
    seconds
  );
};

export const returnClassStatus = (
  start: Date,
  end: Date
): StaffAttendanceResultPropsWithClassStatusForTodayClasses['class_status'] => {
  const _ = new Date();

  // If now is greater than or equal to start time, and now is less than end time - Class status CURRENT
  if (_ >= start && _ < end) {
    return 'current';
  }

  // If start time in future - Class status NEXT
  if (_ < start) {
    return 'next';
  }

  return 'past';
};
