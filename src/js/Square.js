const Square = () => {
  let receivedAtk = false;
  let ship = null;
  const receiveAtk = () => {
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
