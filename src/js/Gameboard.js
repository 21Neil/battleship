import Ship from './Ship';
import Square from './Square';

const Gameboard = () => {
  const board = new Array(100).fill(Square());
  const carrier = Ship(5);
  const battleship = Ship(4);
  const destroyer = Ship(3);
  const submarine = Ship(3);
  const patrolBoat = Ship(2);

  const xyToNum = (x, y) => {
    return x + y * 10;
  };

  const isValidPlace = (x, y, direction, length) => {
    if (!checkValid(x) || !checkValid(y)) return false;
    let shipEnd = 0;
    if (direction === 'v') shipEnd = x + length;
    if (direction === 'h') shipEnd = y + length;

    const checkValid = num => {
      return num > -1 && num < 10;
    };

    return checkValid(shipEnd);
  };

  const placeShip = (ship, x, y, direction) => {
    if (!isValidPlace(x, y, direction, ship.length)) return;
    const start = xyToNum(x, y);
    const end = start + ship.length;
    for (let i = start; i < end; direction === 'v' ? i++ : (i += 10)) {
      board[i].placeShip(ship);
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

  const receiveAttack = (x, y) => {
    const index = xyToNum(x, y);
    if (board[index].isReceivedAtk()) return;
    board[index].receiveAttack();
    if(checkAllShipSunk()) return 'all ship sank!'
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

  return {
    placeCarrier,
    placeBattleship,
    placeDestroyer,
    placeSubmarine,
    placePatrolShip,
    receiveAttack,
  };
};

export default Gameboard;
