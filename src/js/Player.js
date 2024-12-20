import Gameboard from './Gameboard';

const Player = type => {
  let playerType = type
  const board = Gameboard();
  const getBoard = () => board;
  const getType = () => playerType;
  const changeType = (type) => playerType = type

  return {
    getBoard,
    getType,
    changeType
  };
};

export default Player;
