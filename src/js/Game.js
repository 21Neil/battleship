import Player from './Player';
import {
  renderPlayerBoard,
  renderEnemyBoard,
  enemyBoardEventListenerController,
  showWinner,
  addEventListenerToStartBtn,
} from './DOM';
import Computer from './Computer';

const Game = () => {
  const player1 = Player('real');
  const player2 = Player('computer');
  const player1Board = player1.getBoard();
  const player2Board = player2.getBoard();
  const computer = Computer();
  let turn = 'player1';

  const attack = (x, y) => {
    if (turn === 'player1') {
      player2Board.receiveAttack(x, y);
      if (player2Board.checkAllShipSunk()) {
        showWinner(turn);
        return;
      }
      turn = 'player2';
      turnInit();
      return;
    }
    if (turn === 'player2') {
      player1Board.receiveAttack(x, y);
      if (player1Board.checkAllShipSunk()) {
        console.log(turn);
        showWinner(turn);
        return;
      }
      turn = 'player1';
      turnInit();
      return;
    }
  };

  const hasShip = (x, y) => {
    return (
      (turn === 'player1' && player2Board.hasShip(x, y)) ||
      (turn === 'player2' && player1Board.hasShip(x, y))
    );
  };

  const isReceivedAtk = (x, y) => {
    return (
      (turn === 'player1' && player2Board.isReceivedAtk(x, y)) ||
      (turn === 'player2' && player1Board.isReceivedAtk(x, y))
    );
  };

  const eventListenerController = enemyBoardEventListenerController(
    attack,
    hasShip
  );

  const turnInit = () => {
    if (turn === 'player1' && player2.getType() === 'computer') {
      eventListenerController.add();
      return;
    }
    if (turn === 'player2' && player2.getType() === 'computer') {
      eventListenerController.remove();
      computer.attack(attack, isReceivedAtk);
      return;
    }
  };

  renderPlayerBoard(player1Board.getBoard());
  renderEnemyBoard(player2Board.getBoard(), attack, hasShip);

  computer.randomPlaceAllShip(player2Board)

  addEventListenerToStartBtn(eventListenerController, player1Board)
};

export default Game;
