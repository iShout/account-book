const getNowString = (level = 'day') => {
  const date = new Date();
  const month =
    date.getMonth() + 1 > 9
      ? (date.getMonth() + 1).toString()
      : '0' + (date.getMonth() + 1).toString();
  const days =
    date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate();
  const time = date.getFullYear().toString() + month + days;
  switch (level) {
    case 'year':
      return date.getFullYear().toString();
    case 'month':
      return date.getFullYear().toString() + month;
    case 'day':
      return time;
    default:
      break;
  }
};
export default getNowString;
