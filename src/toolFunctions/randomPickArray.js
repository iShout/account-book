const randomPickArray = array => {
  const random = Math.floor(Math.random() * array.length);
  return array[random];
};

export default randomPickArray