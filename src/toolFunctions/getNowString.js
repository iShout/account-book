const getNowString = () => {
  const date = new Date();
  const month =
    date.getMonth() + 1 > 9
      ? (date.getMonth() + 1).toString()
      : '0' + (date.getMonth() + 1).toString();
  const days =
    date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate();
  const time = date.getFullYear().toString() + month + days;
  return time;
};
export default getNowString;
