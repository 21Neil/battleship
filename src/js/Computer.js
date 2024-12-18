import { renderComputerAttack } from './DOM';

const Computer = () => {

  const makeRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const attack = (attack, isReceivedAtk) => {
    const makeValidMove = () => {

      const makeCoordinate = () => {
        const x = makeRandomNumber(0, 9);
        const y = makeRandomNumber(0, 9);
        if (isReceivedAtk(x, y)) return makeCoordinate();
        if (!isReceivedAtk(x, y)) return { x, y };
      };

      return makeCoordinate();
    };

    const coordinate = makeValidMove();
    attack(coordinate.x, coordinate.y);
    renderComputerAttack(coordinate.x, coordinate.y);
  };

  const randomPlaceShip = (board, place, shipLength) => {
    const x = makeRandomNumber(0, 9);
    const y = makeRandomNumber(0, 9);
    const direction = makeRandomNumber(0, 1) === 0 ? 'v' : 'h';

    if (board.isValidPlace(x, y, direction, shipLength)) {
      console.log(x, y, direction, shipLength)
      place(x, y, direction);
      return;
    };
    
    randomPlaceShip(board, place, shipLength);
  };

  const randomPlaceAllShip = board => {
    randomPlaceShip(board, board.placeCarrier, 5)
    randomPlaceShip(board, board.placeBattleship, 4)
    randomPlaceShip(board, board.placeDestroyer, 3)
    randomPlaceShip(board, board.placeSubmarine, 3)
    randomPlaceShip(board, board.placePatrolShip, 2)
  }

  return {
    attack,
    randomPlaceAllShip,
  };
};

export default Computer;
