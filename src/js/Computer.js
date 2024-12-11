import { renderComputerAttack } from "./DOM"

const Computer = () => {
  const attack = (attack, isReceivedAtk) => {

    const makeValidMove = () => {
      const makeRandomNumber = () => {
        return Math.floor(Math.random() * 10)
      }

      const makeCoordinate = () => {
        const x = makeRandomNumber();
        const y = makeRandomNumber();
        if (isReceivedAtk(x, y)) return makeCoordinate()
        if (!isReceivedAtk(x, y)) return {x, y}
      }

      return makeCoordinate()
    }

    const coordinate = (makeValidMove())
    attack(coordinate.x, coordinate.y)
    renderComputerAttack(coordinate.x, coordinate.y)
  }

  return {
    attack
  }
}

export default Computer
