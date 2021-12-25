export const dateStr = (date: Date) => {
  return (
    date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  );
};

export const dateToTime = (date: Date) => {
  const dateOnly = dateStr(date);
  const time = date.toTimeString().split(' ')[0];
  return dateOnly + ' ' + time;
};
