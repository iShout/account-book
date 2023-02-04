const dashToNumber = dashString => {
  if (!Number(dashString)) {
    throw '当前日期格式不是xxxx-xx-xx类型';
  }
  return dashString.split('-').join('');
};
export default dashToNumber;
