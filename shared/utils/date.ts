export function formatDateString(date: Date): string {
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}${month}${day}`;
}

export function convertStringToDate(date: string): Date {
  const year = +date.substring(0, 4);
  const month = +date.substring(4, 6);
  const day = +date.substring(6, 8);

  return new Date(year, month - 1, day);
}
