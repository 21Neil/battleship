import Square from "./Square";

describe('test square', () => {
  const testSquare = Square()
  const testSquareWithShip1 = Square();
  const testSquareWithShip2 = Square();
  test('test received attack', () => {
    testSquare.receiveAtk();
    expect(testSquare.isReceivedAtk()).toBeTruthy();
  })
})