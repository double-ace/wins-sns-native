import { format, getYear } from 'date-fns';

export const formatDate = (date: string) => {
  const now = new Date();
  const target = new Date(date);
  if (format(target, 'yyyy/MM/dd') === format(now, 'yyyy/MM/dd')) {
    return format(target, 'HH:mm');
  }
  if (getYear(target) === getYear(now)) {
    return format(target, 'MM/dd HH:mm');
  }
};
