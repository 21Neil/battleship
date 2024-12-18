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
  const rotateBtn = document.createElement('button');

  rotateBtn.textContent = '⟳';

  carrierElement.classList.add('carrier', 'ship', 'drag', 'ship-v');
  battleshipElement.classList.add('battleship', 'ship', 'drag', 'ship-v');
  destroyerElement.classList.add('destroyer', 'ship', 'drag', 'ship-v');
  submarineElement.classList.add('submarine', 'ship', 'drag', 'ship-v');
  patrolShipElement.classList.add('patrol-ship', 'ship', 'drag', 'ship-v');
  invisibleBoard.classList.add('invisible-board');
  rotateBtn.classList.add('rotate-btn');

  carrierElement.dataset.length = 5;
  carrierElement.dataset.direction = 'v';
  carrierElement.dataset.onBoard = false;
  carrierElement.dataset.type = 'carrier';
  battleshipElement.dataset.length = 4;
  battleshipElement.dataset.direction = 'v';
  battleshipElement.dataset.onBoard = false;
  battleshipElement.dataset.type = 'battleship';
  destroyerElement.dataset.length = 3;
  destroyerElement.dataset.direction = 'v';
  destroyerElement.dataset.onBoard = false;
  destroyerElement.dataset.type = 'destroyer';
  submarineElement.dataset.length = 3;
  submarineElement.dataset.direction = 'v';
  submarineElement.dataset.onBoard = false;
  submarineElement.dataset.type = 'submarine';
  patrolShipElement.dataset.length = 2;
  patrolShipElement.dataset.direction = 'v';
  patrolShipElement.dataset.type = 'patrol-ship';

  shipContainer.append(
    carrierElement,
    battleshipElement,
    destroyerElement,
    submarineElement,
    patrolShipElement,
    rotateBtn
  );
  playerBoard.appendChild(invisibleBoard);

  for (let i = 0; i < playerBoardSquare.length; i++) {
    const squareElement = document.createElement('div');
    squareElement.classList.add('invisible-square');
    squareElement.dataset.x = i % 10;
    squareElement.dataset.y = Math.floor(i / 10);
    invisibleBoard.appendChild(squareElement);
  }

  const dragShipEvent = shipElement => {
    const allInvisibleSquare = document.querySelectorAll(
      '.invisible-board > .invisible-square'
    );

    const removeInvisibleSquareEventListener = () => {
      allInvisibleSquare.forEach(square => {
        square.removeEventListener('mouseup', placeOnBoard);
      });
    };

    const initShipElement = () => {
      shipElement.style.position = '';
      shipElement.style.top = '';
      shipElement.style.left = '';
      shipElement.dataset.onBoard = false;
      shipElement.dataset.x = '';
      shipElement.dataset.y = '';
    };

    const placeOnBoard = e => {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;
      const direction = shipElement.dataset.direction;
      const xEnd = direction === 'v' ? +x + +shipElement.dataset.length - 1 : x;
      const yEnd = direction === 'h' ? +y + +shipElement.dataset.length - 1 : y;
      const valid = xEnd < 10 && yEnd < 10;

      const checkHadShip = () => {
        const allShip = document.querySelectorAll('.ship.drag');
        const right = element => element.getBoundingClientRect().right;
        const left = element => element.getBoundingClientRect().left;
        const top = element => element.getBoundingClientRect().top;
        const bottom = element => element.getBoundingClientRect().bottom;

        for (let i = 0; i < allShip.length; i++) {
          for (let j = 0; j < allShip.length; j++) {
            const isOverLapping =
              left(allShip[i]) < right(allShip[j]) &&
              right(allShip[i]) > left(allShip[j]) &&
              top(allShip[i]) < bottom(allShip[j]) &&
              bottom(allShip[i]) > top(allShip[j]);
            if (isOverLapping && i !== j) return true;
          }
        }
      };
      
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onLetGo);
      
      shipElement.style.zIndex = 100;
      shipElement.style.top = `${e.clientY - e.offsetY}px`;
      shipElement.style.left = `${e.clientX - e.offsetX}px`;

      if (!valid || checkHadShip()) {
        initShipElement();
        removeInvisibleSquareEventListener();
        addEventListenerToAllShip();
        return;
      }
      
      shipElement.dataset.onBoard = true;
      shipElement.dataset.x = e.target.dataset.x;
      shipElement.dataset.y = e.target.dataset.y;
      removeInvisibleSquareEventListener();
      addEventListenerToAllShip();
    };

    const onDrag = e => {
      shipElement.style.position = 'absolute';
      shipElement.style.top = `${e.clientY - 17.5}px`;
      shipElement.style.left = `${e.clientX - 17.5}px`;
    };

    const onLetGo = () => {
      document.removeEventListener('mousemove', onDrag);
      document.removeEventListener('mouseup', onLetGo);
      initShipElement();
      removeInvisibleSquareEventListener();
      addEventListenerToAllShip();
    };

    const onGrab = () => {
      document.addEventListener('mouseup', onLetGo);
      document.addEventListener('mousemove', onDrag);
      removeEventListenerFromAllShip();

      allInvisibleSquare.forEach(square => {
        square.addEventListener('mouseup', placeOnBoard);
      });

      shipElement.style.zIndex = 1;
    };

    const add = () => shipElement.addEventListener('mousedown', onGrab);
    const remove = () => shipElement.removeEventListener('mousedown', onGrab);

    return {
      add,
      remove,
    };
  };

  const rotateShip = shipElement => {
    if (shipElement.dataset.onBoard === 'true') return;
    const direction = shipElement.dataset.direction;
    const type = shipElement.dataset.type;
    if (direction === 'v') {
      shipElement.dataset.direction = 'h';
      shipElement.classList.remove(type, 'ship-v');
      shipElement.classList.add(`${type}-h`, 'ship-h');
    }
    if (direction === 'h') {
      shipElement.dataset.direction = 'v';
      shipElement.classList.remove(`${type}-h`, 'ship-h');
      shipElement.classList.add(type, 'ship-v');
    }
  };

  const rotateBtnOnClick = () => {
    rotateShip(carrierElement);
    rotateShip(battleshipElement);
    rotateShip(destroyerElement);
    rotateShip(submarineElement);
    rotateShip(patrolShipElement);
  };

  const carrierEvent = dragShipEvent(carrierElement);
  const battleshipEvent = dragShipEvent(battleshipElement);
  const destroyerEvent = dragShipEvent(destroyerElement);
  const submarineEvent = dragShipEvent(submarineElement);
  const patrolShipEvent = dragShipEvent(patrolShipElement);

  const addEventListenerToAllShip = () => {
    carrierEvent.add();
    battleshipEvent.add();
    destroyerEvent.add();
    submarineEvent.add();
    patrolShipEvent.add();
  };

  const removeEventListenerFromAllShip = () => {
    carrierEvent.remove();
    battleshipEvent.remove();
    destroyerEvent.remove();
    submarineEvent.remove();
    patrolShipEvent.remove();
  };

  addEventListenerToAllShip();
  rotateBtn.addEventListener('click', rotateBtnOnClick);
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
    e.target.classList.remove('square-hover');
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
    const playerBoardContainer = document.querySelector('.player-board-container');
    const enemyBoardContainer = document.querySelector('.enemy-board-container');
    const shipContainer = document.querySelector('.ship-container');

    winScreen.classList.add('hide');
    restartBtn.removeEventListener('click', restartBtnOnClick);
    playerBoardContainer.replaceChildren();
    enemyBoardContainer.replaceChildren();
    playerBoardContainer.appendChild(shipContainer)
    Game();
  };

  winnerElement.textContent = player + ' Win';
  winScreen.classList.remove('hide');
  restartBtn.addEventListener('click', restartBtnOnClick, { once: true });
};

const addEventListenerToStartBtn = (eventListenerController, board) => {
  const startBtn = document.querySelector('.start-btn');
  const enemyBoardSquare = document.querySelectorAll('.enemy-board > .square');
  const invisibleBoard = document.querySelector('.invisible-board');
  const carrierElement = document.querySelector('.carrier');
  const battleshipElement = document.querySelector('.battleship');
  const destroyerElement = document.querySelector('.destroyer');
  const submarineElement = document.querySelector('.submarine');
  const patrolShipElement = document.querySelector('.patrol-ship');
  const shipContainer = document.querySelector('.ship-container');

  const startBtnOnClick = () => {
    if (
      carrierElement.dataset.onBoard === 'false' ||
      battleshipElement.dataset.onBoard === 'false' ||
      destroyerElement.dataset.onBoard === 'false' ||
      submarineElement.dataset.onBoard === 'false' ||
      patrolShipElement.dataset.onBoard === 'false'
    )
      return;
    eventListenerController.add();
    enemyBoardSquare.forEach(square => square.classList.add('square-hover'));
    board.placeCarrier(
      +carrierElement.dataset.x,
      +carrierElement.dataset.y,
      carrierElement.dataset.direction
    );
    board.placeBattleship(
      +battleshipElement.dataset.x,
      +battleshipElement.dataset.y,
      battleshipElement.dataset.direction
    );
    board.placeDestroyer(
      +destroyerElement.dataset.x,
      +destroyerElement.dataset.y,
      destroyerElement.dataset.direction
    );
    board.placeSubmarine(
      +submarineElement.dataset.x,
      +submarineElement.dataset.y,
      submarineElement.dataset.direction
    );
    board.placePatrolShip(
      +patrolShipElement.dataset.x,
      +patrolShipElement.dataset.y,
      patrolShipElement.dataset.direction
    );
    showShip(board.hasShip);
    shipContainer.replaceChildren();
    invisibleBoard.remove();
    startBtn.removeEventListener('click', startBtnOnClick);
  };
  startBtn.addEventListener('click', startBtnOnClick);
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
