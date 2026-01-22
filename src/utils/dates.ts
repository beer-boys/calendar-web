export const timestampToIsoString = (timestamp: number) => {
  return new Date(timestamp).toISOString();
};

export const combineDateAndTime = (timestamp: number, start: string): string => {
  const date = new Date(timestamp);

  // Разбиваем строку времени на часы и минуты
  const [hours, minutes] = start.split(':').map(Number);

  const resultDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);

  return resultDate.toISOString();
};
