import Game from './Game';

const showPlaceableShip = () => {
  const shipContainer = document.querySelector('.ship-container');
  const playerBoard = document.querySelector('.player-board');
  const playerBoardSquare = document.querySelectorAll(
    '.player-board > .square'
  );
  const carrierElement = document.createElement('div');
  const battleshipElement = document.createElement('div');
  const destroyerElement = document.createElement('div');
  const submarineElement = document.createElement('div');
  const patrolShipElement = document.createElement('div');
  const invisibleBoard = document.createElement('div');

  carrierElement.classList.add('carrier', 'ship', 'drag');
  battleshipElement.classList.add('battleship', 'ship', 'drag');
  destroyerElement.classList.add('destroyer', 'ship', 'drag');
  submarineElement.classList.add('submarine', 'ship', 'drag');
  patrolShipElement.classList.add('patrol-ship', 'ship', 'drag');
  invisibleBoard.classList.add('invisible-board');

  carrierElement.dataset.length = 5;
  carrierElement.dataset.direction = 'v';
  carrierElement.dataset.length = 4;
  carrierElement.dataset.direction = 'v';
  carrierElement.dataset.length = 3;
  carrierElement.dataset.direction = 'v';
  carrierElement.dataset.length = 3;
  carrierElement.dataset.direction = 'v';
  carrierElement.dataset.length = 2;
  carrierElement.dataset.direction = 'v';

  shipContainer.append(
    carrierElement,
    battleshipElement,
    destroyerElement,
    submarineElement,
    patrolShipElement
  );
  playerBoard.appendChild(invisibleBoard);

  for (let i = 0; i < playerBoardSquare.length; i++) {
    const squareElement = document.createElement('div');
    squareElement.classList.add('invisible-square');
    squareElement.dataset.x = i % 10;
    squareElement.dataset.y = Math.floor(i / 10);
    invisibleBoard.appendChild(squareElement);
  }

  const addDragToShip = shipElement => {
    const allInvisibleSquare = document.querySelectorAll(
      '.invisible-board > .invisible-square'
    );
    
    const placeOnBoard = e => {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      const direction = shipElement.dataset.direction;
      const xEnd = direction === 'v' ? +x + +shipElement.dataset.length - 1 : x;
      const yEnd = direction === 'h' ? +y + +shipElement.dataset.length - 1 : y;
      const valid = xEnd < 10 && yEnd < 10;

      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onLetGo);

      if (!valid) {
        shipElement.style.position = '';
        shipElement.style.top = '';
        shipElement.style.left = '';
        return;
      }

      shipElement.style.zIndex = 100;
      shipElement.style.top = `${e.clientY - e.offsetY}px`;
      shipElement.style.left = `${e.clientX - e.offsetX}px`;
      allInvisibleSquare.forEach(square => {
        square.removeEventListener('mouseup', placeOnBoard);
      });
    };

    function onDrag(e) {
      shipElement.style.position = 'fixed';
      shipElement.style.top = `${e.clientY - 17.5}px`;
      shipElement.style.left = `${e.clientX - 17.5}px`;
    }

    function onLetGo() {
      console.log(shipElement);
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onLetGo);
      shipElement.style.position = '';
      shipElement.style.top = '';
      shipElement.style.left = '';
    }

    function onGrab() {
      document.addEventListener('mousemove', onDrag);
      document.addEventListener('mouseup', onLetGo);

      allInvisibleSquare.forEach(square => {
        square.addEventListener('mouseup', placeOnBoard);
      });

      shipElement.style.zIndex = 1;
    }

    shipElement.addEventListener('mousedown', onGrab);
  };

  addDragToShip(carrierElement);
  addDragToShip(battleshipElement);
  addDragToShip(destroyerElement);
  addDragToShip(submarineElement);
  addDragToShip(patrolShipElement);
};

const renderPlayerBoard = board => {
  const playerBoardContainer = document.querySelector(
    '.player-board-container'
  );
  const playerBoard = document.createElement('div');

  playerBoard.classList.add('player-board', 'board');
  playerBoardContainer.prepend(playerBoard);
  renderBoard(board, playerBoard);
  showPlaceableShip();
};

const renderEnemyBoard = (board, attack, hasShip) => {
  const enemyBoardContainer = document.querySelector('.enemy-board-container');
  const enemyBoard = document.createElement('div');

  enemyBoard.classList.add('enemy-board', 'board');
  enemyBoardContainer.appendChild(enemyBoard);
  renderBoard(board, enemyBoard, true, attack, hasShip);
};

const renderBoard = (board, container) => {
  for (let i = 0; i < board.length; i++) {
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
          .classList.add('ship-square');
      }
    }
  }
};

const enemyBoardEventListenerController = (attack, hasShip) => {
  const squareOnClick = e => {
    e.target.classList.add('received-atk');
    attack(e.target.dataset.x, e.target.dataset.y);
    if (hasShip(e.target.dataset.x, e.target.dataset.y))
      e.target.classList.add('ship-square');
  };

  const add = () => {
    const enemyBoard = document.querySelectorAll(
      '.enemy-board > div:not(.received-atk)'
    );

    enemyBoard.forEach(squareElement => {
      squareElement.addEventListener('click', squareOnClick);
    });
  };

  const remove = () => {
    const enemyBoard = document.querySelectorAll('.enemy-board > div');
    enemyBoard.forEach(squareElement => {
      squareElement.removeEventListener('click', squareOnClick);
    });
  };

  return {
    add,
    remove,
  };
};

const renderComputerAttack = (x, y) => {
  const squareElement = document.querySelector(
    `.player-board > [data-x='${x}'][data-y='${y}']`
  );
  squareElement.classList.add('received-atk');
};

const showWinner = player => {
  const winScreen = document.querySelector('.win-screen');
  const winnerElement = document.querySelector('.winner');
  const restartBtn = document.querySelector('.win-screen button');

  const restartBtnOnClick = () => {
    const boardContainer = document.querySelector('.board-container');

    winScreen.classList.add('hide');
    restartBtn.removeEventListener('click', restartBtnOnClick);
    boardContainer.replaceChildren();
    Game();
  };

  winnerElement.textContent = player + ' Win';
  winScreen.classList.remove('hide');
  restartBtn.addEventListener('click', restartBtnOnClick, { once: true });
};

const addEventListenerToStartBtn = () => {
  const startBtn = document.querySelector('.start-btn');

  const startBtnOnClick = () => {
    Game();
  };
  startBtn.addEventListener('click', startBtnOnClick, { once: true });
};

export {
  renderPlayerBoard,
  renderEnemyBoard,
  showShip,
  enemyBoardEventListenerController,
  renderComputerAttack,
  showWinner,
  addEventListenerToStartBtn,
};
