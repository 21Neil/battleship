import Ship from '../js/Ship'

test('create length 3 ship, and hit it 3 time', () => {
  const testShip = Ship(3)
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.isSunk()).toBeTruthy()
})
