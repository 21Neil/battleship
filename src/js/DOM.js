const renderPlayerBoard = board => {
  const playerBoard = document.querySelector('.player-board');
  renderBoard(board, playerBoard);
};

const renderEnemyBoard = (board, attack, hasShip) => {
  const enemyBoard = document.querySelector('.enemy-board');
  renderBoard(board, enemyBoard, true, attack, hasShip);
};

const renderBoard = (board, container, isEnemy, attack, hasShip) => {
  const squareOnClick = (e, squareElement) => {
    console.log('first');
    attack(e.target.dataset.x, e.target.dataset.y);
    squareElement.classList.add('received-atk');
    if (hasShip(e.target.dataset.x, e.target.dataset.y))
      squareElement.classList.add('ship');
  };
  board.forEach((square, i) => {
    const squareElement = document.createElement('div');
    squareElement.classList.add('square');
    squareElement.dataset.x = i % 10;
    squareElement.dataset.y = Math.floor(i / 10);
    if (isEnemy)
      squareElement.addEventListener(
        'click',
        e => squareOnClick(e, squareElement),
        { once: true }
      );
    container.appendChild(squareElement);
  });
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

export { renderPlayerBoard, renderEnemyBoard, showShip };
