import Ship from './Ship';
import Square from './Square';

const Gameboard = () => {
  const board = [];
  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);

  for (let i = 0; i < 100; i++) {
    board.push(Square());
  }

  const xyToNum = (x, y) => {
    return +x + +y * 10;
  };

  const isValidPlace = (x, y, direction, length) => {
    let shipEnd = 0;
    if (direction === 'v') shipEnd = x + length - 1;
    if (direction === 'h') shipEnd = y + length - 1;
    const checkValid = num => {
      return num > -1 && num < 10;
    };

    if (!checkValid(x) || !checkValid(y)) return false;

    if (!checkValid(shipEnd)) return false;

    const checkHadShip = () => {
      const start = xyToNum(x, y);
      if (direction === 'v') {
        const end = start + length - 1;
        for (let i = start; i <= end; i++) {
          if (board[i].getShip() !== null) return true;
        }
      }
      if (direction === 'h') {
        const end = start + (length - 1) * 10;
        for (let i = start; i <= end; i += 10) {
          if (board[i].getShip() !== null) return true;
        }
      }
    };

    if (checkHadShip()) return false;

    return true;
  };

  const placeShip = (ship, x, y, direction) => {
    if (!isValidPlace(x, y, direction, ship.getLength())) return;
    const start = xyToNum(x, y);
    if (direction === 'v') {
      const end = start + ship.getLength() - 1;
      for (let i = start; i <= end; i++) {
        board[i].placeShip(ship);
      }
    }
    if (direction === 'h') {
      const end = start + (ship.getLength() - 1) * 10;
      for (let i = start; i <= end; i += 10) {
        board[i].placeShip(ship);
      }
    }
  };

  const placeCarrier = (x, y, direction) => {
    placeShip(carrier, x, y, direction);
  };

  const placeBattleship = (x, y, direction) => {
    placeShip(battleship, x, y, direction);
  };

  const placeDestroyer = (x, y, direction) => {
    placeShip(destroyer, x, y, direction);
  };

  const placeSubmarine = (x, y, direction) => {
    placeShip(submarine, x, y, direction);
  };

  const placePatrolShip = (x, y, direction) => {
    placeShip(patrolBoat, x, y, direction);
  };

  const isReceivedAtk = (x, y) => {
    const index = xyToNum(x, y);
    return board[index].isReceivedAtk();
  };

  const receiveAttack = (x, y) => {
    const index = xyToNum(x, y);
    if (isReceivedAtk(x, y)) return;
    board[index].receiveAtk();
  };

  const hasShip = (x, y) => {
    const index = xyToNum(x, y);
    if (board[index].getShip()) return true;
    return false;
  };

  const checkAllShipSunk = () => {
    return (
      carrier.isSunk() &&
      battleship.isSunk() &&
      destroyer.isSunk() &&
      submarine.isSunk() &&
      patrolBoat.isSunk()
    );
  };

  const getBoard = () => board;

  return {
    placeCarrier,
    placeBattleship,
    placeDestroyer,
    placeSubmarine,
    placePatrolShip,
    receiveAttack,
    getBoard,
    checkAllShipSunk,
    hasShip,
    isReceivedAtk,
    isValidPlace,
  };
};

export default Gameboard;
