const timeFormatter = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

const dayMonthFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: 'numeric',
  month: 'long',
});

const weekdayFormatter = new Intl.DateTimeFormat('ru-RU', {
  weekday: 'long',
});

const dayKeyFormatter = new Intl.DateTimeFormat('ru-RU', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
});

const isSameDay = (a: Date, b: Date): boolean =>
  dayKeyFormatter.format(a) === dayKeyFormatter.format(b);

export const formatOrderDate = (iso: string): string => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  const time = timeFormatter.format(date);

  if (isSameDay(date, now)) {
    return `Сегодня, ${time}`;
  }

  if (isSameDay(date, yesterday)) {
    return `Вчера, ${time}`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    return `${dayMonthFormatter.format(date)}, ${time}`;
  }

  return `${dayMonthFormatter.format(date)} ${String(date.getFullYear())}, ${time}`;
};

export const formatFullOrderDate = (iso: string): string => {
  const date = new Date(iso);

  if (Number.isNaN(date.getTime())) {
    return iso;
  }

  const weekday = weekdayFormatter.format(date);
  const datePart = `${dayMonthFormatter.format(date)} ${String(date.getFullYear())}`;

  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${datePart}, ${timeFormatter.format(date)}`;
};
