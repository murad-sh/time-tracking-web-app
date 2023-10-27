export const calculateDifference = (start: Date, end: Date) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffInMilliseconds = endDate.getTime() - startDate.getTime();
  const hours = Math.floor(diffInMilliseconds / (1000 * 60 * 60));
  const minutes = Math.floor(
    (diffInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor((diffInMilliseconds % (1000 * 60)) / 1000);

  return `${hours} hours ${minutes} minutes ${seconds} seconds`;
};
