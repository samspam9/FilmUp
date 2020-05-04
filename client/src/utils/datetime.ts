export function getTimeZone(): string {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}

export function randomDateInRange(
  start: Date | number,
  end: Date | number,
): Date {
  const startTimestamp = start instanceof Date ? start.getTime() : start;
  const endTimestamp = end instanceof Date ? end.getTime() : end;
  return new Date(
    startTimestamp + Math.random() * (endTimestamp - startTimestamp),
  );
}

export function useInternationalTime(): boolean {
  const date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0));
  const dateString = date.toLocaleTimeString();

  return !(dateString.match(/am|pm/i) || date.toString().match(/am|pm/i));
}
