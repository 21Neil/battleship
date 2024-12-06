import Player from './Player';
import {
  renderPlayerBoard,
  renderEnemyBoard,
  showShip,
  stopEventListener,
} from './DOM';

const Game = () => {
  const player1 = Player('real');
  const player2 = Player('computer');
  const player1Board = player1.getBoard();
  const player2Board = player2.getBoard();
  let turn = 'player1';

  const attack = (x, y) => {
    if (turn === 'player1') {
      player2Board.receiveAttack(x, y);
      turn = 'player2';
    }
    if (turn === 'player2') {
      player1Board.receiveAttack(x, y);
      turn = 'player1';
    }
  };

  const hasShip = (x, y) => {
    return (
      (turn === 'player1' && player2Board.hasShip(x, y)) ||
      (turn === 'player2' && player1Board.hasShip(x, y))
    );
  };

  renderPlayerBoard(player1Board.getBoard());
  renderEnemyBoard(player2Board.getBoard(), attack, hasShip);

  player1Board.placeCarrier(0, 0, 'h');
  player1Board.placeBattleship(2, 3, 'v');
  player1Board.placeDestroyer(8, 5, 'h');
  player1Board.placeSubmarine(6, 0, 'v');
  player1Board.placePatrolShip(2, 4, 'v');

  player2Board.placeCarrier(0, 0, 'h');
  player2Board.placeBattleship(2, 3, 'v');
  player2Board.placeDestroyer(8, 5, 'h');
  player2Board.placeSubmarine(6, 0, 'v');
  player2Board.placePatrolShip(2, 4, 'v');

  showShip(player1Board.hasShip);

  stopEventListener();
};

export default Game;
