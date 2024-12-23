import { renderComputerAttack } from './DOM';

const Computer = () => {
  const memory = {
    hitShip: false,
    x: 0,
    y: 0,
  };

  const makeRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const attack = (attack, isReceivedAtk, hasShip) => {
    let coordinate = {
      x: 0,
      y: 0,
    };

    const makeCoordinate = (minX, maxX, minY, maxY) => {
      const x = makeRandomNumber(minX, maxX);
      const y = makeRandomNumber(minY, maxY);
      console.log(minX, maxX, minY, maxY, x, y);
      if (isReceivedAtk(x, y)) return makeCoordinate(minX, maxX, minY, maxY);
      if (!isReceivedAtk(x, y)) return { x, y };
    };

    const makeBetterMove = (minX, maxX, minY, maxY) => {
      if (
        isReceivedAtk(minX, memory.y) &&
        isReceivedAtk(maxX, memory.y) &&
        isReceivedAtk(memory.x, minY) &&
        isReceivedAtk(memory.x, maxY)
      )
        return makeCoordinate(0, 9, 0, 9);
      const betterCoordinate = makeCoordinate(minX, maxX, minY, maxY);
      if (betterCoordinate.x !== memory.x && betterCoordinate.y !== memory.y)
        return makeBetterMove(minX, maxX, minY, maxY);
      return betterCoordinate;
    };

    if (!memory.hitShip) {
      console.log('after not hit');
      coordinate = makeCoordinate(0, 9, 0, 9);
    }

    if (memory.hitShip) {
      console.log('after hit');
      const minX = memory.x - 1 < 0 ? 0 : memory.x - 1;
      const maxX = memory.x + 1 > 9 ? 9 : memory.x + 1;
      const minY = memory.y - 1 < 0 ? 0 : memory.y - 1;
      const maxY = memory.y + 1 > 9 ? 9 : memory.y + 1;
      coordinate = makeBetterMove(minX, maxX, minY, maxY);
      coordinate.x !== memory.x && coordinate.y !== memory.y;
    }

    console.log(coordinate.x, coordinate.y);

    attack(coordinate.x, coordinate.y);
    renderComputerAttack(coordinate.x, coordinate.y);

    console.log(memory);

    if (hasShip(coordinate.x, coordinate.y)) {
      memory.hitShip = true;
      memory.x = coordinate.x;
      memory.y = coordinate.y;
      return;
    }

    if (memory.hitShip) {
      memory.hitShip = false;
    }
  };

  const randomPlaceShip = (board, place, shipLength) => {
    const x = makeRandomNumber(0, 9);
    const y = makeRandomNumber(0, 9);
    const direction = makeRandomNumber(0, 1) === 0 ? 'v' : 'h';

    if (board.isValidPlace(x, y, direction, shipLength)) {
      place(x, y, direction);
      return;
    }

    randomPlaceShip(board, place, shipLength);
  };

  const randomPlaceAllShip = board => {
    randomPlaceShip(board, board.placeCarrier, 5);
    randomPlaceShip(board, board.placeBattleship, 4);
    randomPlaceShip(board, board.placeDestroyer, 3);
    randomPlaceShip(board, board.placeSubmarine, 3);
    randomPlaceShip(board, board.placePatrolShip, 2);
  };

  return {
    attack,
    randomPlaceAllShip,
  };
};

export default Computer;
