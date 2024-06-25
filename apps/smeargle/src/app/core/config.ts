import { Day, FirstWeekContainsDate } from 'date-fns';

/* TODO: dependency injection */
export const appConfig = {
  date: {
    weekStartsOn: 1 satisfies Day,
    firstWeekContainsDate: 4 satisfies FirstWeekContainsDate,
  },
} as const;
