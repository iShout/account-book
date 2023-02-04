const numberToDash = numberString => {
  if (!Number(numberString)) {
    throw '当前日期格式不是纯数字类型';
  }
  const year = numberString.slice(0, 4);
  const month = numberString.slice(4, 6);
  const day = numberString.slice(6);
  return `${year}-${month}-${day}`;
};
export default numberToDash;
