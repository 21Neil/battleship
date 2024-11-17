const Square = () => {
  let receivedAtk = false;
  let ship = null;
  const receiveAtk = () => {
    receivedAtk = true;
    ship?.hit();
  };
  const placeShip = (enterShip) => ship = enterShip;
  return {
    receivedAtk,
    receiveAtk,
    placeShip
  }
};

export default Square;
