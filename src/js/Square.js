const Square = () => {
  let receivedAtk = false;
  let ship = null;
  const receiveAtk = () => {
    if (receivedAtk) return;
    receivedAtk = true;
    ship?.hit();
  };
  const placeShip = (enterShip) => ship = enterShip;
  const isReceivedAtk = () => receivedAtk
  const getShip = () => ship
  return {
    receiveAtk,
    placeShip,
    isReceivedAtk,
    getShip
  }
};

export default Square;
