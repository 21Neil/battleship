import Gameboard from "./Gameboard";

const Player = (type) => {
  const board = Gameboard();
  const getBoard = () => board
  const getType = () => type
  
  return {
    getBoard,
    getType
  }
}

export default Player
