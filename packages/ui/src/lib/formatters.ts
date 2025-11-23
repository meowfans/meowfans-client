import dayjs from 'dayjs';

export const handleFormatNumberToKAndM = (digit: number) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'long',
    currency: 'USD',
    style: 'currency',
    currencyDisplay: 'symbol',
    currencySign: 'standard'
  }).format(digit);
};

export function formatDate(date: Date) {
  const now = dayjs();
  const targetDate = dayjs(date);

  if (targetDate.isSame(now, 'day')) {
    return targetDate.format('HH:MM');
  } else if (targetDate.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  } else if (targetDate.isSame(now, 'week')) {
    return targetDate.format('ddd, D MMM YYYY');
  } else {
    return targetDate.format('D MMM YYYY');
  }
}
