import Gameboard from "./Gameboard";

const Player = () => {
  const board = Gameboard();
  const getBoard = () => board
  return {
    getBoard
  }
}

export default Player
