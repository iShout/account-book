const analyseTimeString = timeString => {
  const year = timeString.slice(0, 4);
  const month = timeString.slice(4, 6);
  const days = timeString.slice(6);
  return {year, month, days};
};
export default analyseTimeString;
