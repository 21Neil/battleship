import Square from "../js/Square";
import Ship from "../js/Ship";

describe('test square', () => {
  const testSquare = Square()
  const testSquareWithShip1 = Square();
  const testSquareWithShip2 = Square();
  test('test received attack', () => {
    testSquare.receiveAtk();
    expect(testSquare.isReceivedAtk()).toBeTruthy();
  })
  test('test received attack with ship', () => {
    const ship = Ship(2)
    testSquareWithShip1.placeShip(ship);
    testSquareWithShip2.placeShip(ship);
    testSquareWithShip1.receiveAtk();
    testSquareWithShip2.receiveAtk();
    expect(testSquareWithShip1.isReceivedAtk()).toBeTruthy();
    expect(testSquareWithShip2.isReceivedAtk()).toBeTruthy();
    expect(ship.isSunk()).toBeTruthy()
  })
})