const Ship = length => {
  let hits = 0;
  const hit = () => hits++;
  const isSunk = () => hits === length;
  const getLength = () => length
  return {
    hit,
    isSunk,
    getLength
  };
};

export default Ship;
