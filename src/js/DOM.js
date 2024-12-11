import Game from "./Game";

const renderPlayerBoard = board => {
  const boardContainer = document.querySelector('.board-container')
  const playerBoard = document.createElement('div')
  
  playerBoard.classList.add('player-board', 'board');
  boardContainer.appendChild(playerBoard)
  renderBoard(board, playerBoard);
};

const renderEnemyBoard = (board, attack, hasShip) => {
  const boardContainer = document.querySelector('.board-container')
  const enemyBoard = document.createElement('div')

  enemyBoard.classList.add('enemy-board', 'board');
  boardContainer.appendChild(enemyBoard)
  renderBoard(board, enemyBoard, true, attack, hasShip);
};

const renderBoard = (board, container) => {
  for(let i = 0; i < board.length; i++) {
    const squareElement = document.createElement('div');
    squareElement.classList.add('square');
    squareElement.dataset.x = i % 10;
    squareElement.dataset.y = Math.floor(i / 10);
    container.appendChild(squareElement);
  }
};

const showShip = hasShip => {
  for (let x = 0; x < 10; x++) {
    for (let y = 0; y < 10; y++) {
      if (hasShip(x, y)) {
        document
          .querySelector(`.player-board [data-x='${x}'][data-y='${y}']`)
          .classList.add('ship');
      }
    }
  }
};

const enemyBoardEventListenerController = (attack, hasShip) => {
  const squareOnClick = (e) => {
    e.target.classList.add('received-atk');
    attack(e.target.dataset.x, e.target.dataset.y);
    if (hasShip(e.target.dataset.x, e.target.dataset.y))
      e.target.classList.add('ship');
  };

  const add = () => {
    const enemyBoard = document.querySelectorAll('.enemy-board > div:not(.received-atk)')

    enemyBoard.forEach( squareElement => {
      squareElement.addEventListener('click', squareOnClick)
    })
  }

  const remove = () => {
    const enemyBoard = document.querySelectorAll('.enemy-board > div')
    enemyBoard.forEach( squareElement => {
      squareElement.removeEventListener('click', squareOnClick)
    })
  }

  return {
    add,
    remove
  }
};

const renderComputerAttack = (x, y) => {
  const squareElement = document.querySelector(`.player-board > [data-x='${x}'][data-y='${y}']`)
  squareElement.classList.add('received-atk')
}

const showWinner = (player) => {
  const winScreen = document.querySelector('.win-screen')
  const winnerElement = document.querySelector('.winner')
  const restartBtn = document.querySelector('.win-screen button')

  const restartBtnOnClick = () => {
    const boardContainer = document.querySelector('.board-container');

    winScreen.classList.add('hide')
    restartBtn.removeEventListener('click', restartBtnOnClick)
    boardContainer.replaceChildren();
    Game()
  }

  winnerElement.textContent = player + ' Win';
  winScreen.classList.remove('hide')
  restartBtn.addEventListener('click', restartBtnOnClick, {once: true})
}

const addEventListenerToStartBtn = () => {
  const startBtn = document.querySelector('.start-btn')

  const startBtnOnClick = () => {
    Game()
  }
  startBtn.addEventListener('click', startBtnOnClick, {once: true})
}

export {
  renderPlayerBoard,
  renderEnemyBoard,
  showShip,
  enemyBoardEventListenerController,
  renderComputerAttack,
  showWinner,
  addEventListenerToStartBtn
};
