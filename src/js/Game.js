import Player from './Player';
import {
  renderPlayerBoard,
  renderEnemyBoard,
  enemyBoardEventListenerController,
  showWinner,
  addEventListenerToStartBtn,
  addEventListenerToEnemyTypeSelect,
  addEventListenerToTurnScreenBtn,
  removeAllBoard,
  showPlaceableShip,
  showShip,
  showEnemyBoardAttacked,
  showPlayerBoardAttacked,
  addEventListenerToTurnEndBtn,
} from './DOM';
import Computer from './Computer';

const Game = () => {
  const player1 = Player('real');
  const player2 = Player('computer');
  const player1Board = player1.getBoard();
  const player2Board = player2.getBoard();
  const computer = Computer();
  let turn = 'player1';

  const changeTurn = player => {
    turn = player;
  };

  const player1Attack = (x, y) => {
    player2Board.receiveAttack(x, y);
    if (player2.getType() === 'player') player1EventListenerController.remove();
    if (player2Board.checkAllShipSunk()) {
      showWinner(turn);
      return;
    }
    if (player2.getType() === 'player') addEventListenerToTurnEndBtn(turnInit, () => changeTurn('player2'), turn);
    if (player2.getType() === 'computer') changeTurn('player2');
    if (player2.getType() === 'computer') turnInit()
    return;
  };

  const player2Attack = (x, y) => {
    player1Board.receiveAttack(x, y);
    if (player2.getType() === 'player') player2EventListenerController.remove();
    if (player1Board.checkAllShipSunk()) {
      showWinner(turn);
      return;
    }
    if (player2.getType() === 'player') addEventListenerToTurnEndBtn(turnInit, () => changeTurn('player1'), turn);
    if (player2.getType() === 'computer') changeTurn('player1');
    if (player2.getType() === 'computer') turnInit();
    return;
  };

  const player1EventListenerController = enemyBoardEventListenerController(
    player1Attack,
    (x, y) => player2Board.hasShip(x, y)
  );

  const player2EventListenerController = enemyBoardEventListenerController(
    player2Attack,
    (x, y) => player1Board.hasShip(x, y)
  );

  const isReceivedAtk = (x, y) => {
    return (
      (turn === 'player1' && player2Board.isReceivedAtk(x, y)) ||
      (turn === 'player2' && player1Board.isReceivedAtk(x, y))
    );
  };

  const turnInit = () => {
    if (turn === 'player1' && player2.getType() === 'computer') {
      player1EventListenerController.add();
      return;
    }
    if (turn === 'player2' && player2.getType() === 'computer') {
      player1EventListenerController.remove();
      computer.attack(player2Attack, isReceivedAtk, player1Board.hasShip);
      return;
    }
    if (turn === 'player1' && player2.getType() === 'player') {
      removeAllBoard();
      renderPlayerBoard(player1Board.getBoard());
      renderEnemyBoard(player2Board.getBoard());
      showShip(player1Board.hasShip);
      player1EventListenerController.add();
      showEnemyBoardAttacked(player2Board);
      showPlayerBoardAttacked(player1Board);
      return;
    }
    if (turn === 'player2' && player2.getType() === 'player') {
      removeAllBoard();
      renderPlayerBoard(player2Board.getBoard());
      renderEnemyBoard(player1Board.getBoard());
      showShip(player2Board.hasShip);
      player2EventListenerController.add();
      showEnemyBoardAttacked(player1Board);
      showPlayerBoardAttacked(player2Board);
      return;
    }
  };

  renderPlayerBoard(player1Board.getBoard());
  renderEnemyBoard(player2Board.getBoard());
  showPlaceableShip();

  addEventListenerToStartBtn(
    player1EventListenerController,
    player1Board,
    player1,
    player2,
    false,
    computer.randomPlaceAllShip
  );
  addEventListenerToEnemyTypeSelect(player2.changeType);
  addEventListenerToTurnScreenBtn();
};

export default Game;
