import Gameboard from "../js/Gameboard";

describe('test gameboard', () => {
  const gameboard = Gameboard();
  gameboard.placeCarrier(0, 0, 'h');
  gameboard.placeBattleship(2, 3, 'v');
  gameboard.placeDestroyer(8, 5, 'h');
  gameboard.placeSubmarine(6, 0, 'v')
  gameboard.placePatrolShip(2, 4, 'v');
  gameboard.receiveAttack(0, 0)
  gameboard.receiveAttack(0, 1)
  gameboard.receiveAttack(0, 2)
  gameboard.receiveAttack(0, 3)
  gameboard.receiveAttack(0, 4)
  gameboard.receiveAttack(2, 3)
  gameboard.receiveAttack(3, 3)
  gameboard.receiveAttack(4, 3)
  gameboard.receiveAttack(5, 3)
  gameboard.receiveAttack(8, 5)
  gameboard.receiveAttack(8, 6)
  gameboard.receiveAttack(8, 7)
  gameboard.receiveAttack(6, 0)
  gameboard.receiveAttack(7, 0)
  gameboard.receiveAttack(8, 0)
  gameboard.receiveAttack(2, 4)
  test('all ship sank', () => {
    expect(gameboard.receiveAttack(3, 4)).toBe('All ship sank!')
  })

})
