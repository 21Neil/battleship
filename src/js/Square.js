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
  return {
    receiveAtk,
    placeShip,
    isReceivedAtk
  }
};

export default Square;
