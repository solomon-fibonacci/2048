import {Board} from './index'

describe('Boards initializes properly', () => {
  it('Adds exactly 2 new tiles on initialization', () => {
    const board = new Board(4)
    expect(Object.keys(board.coordinates)).toHaveLength(2)
  })
  it('Has total score of 0 on initialization', () => {
    const board = new Board(4)
    expect(board.score).toBe(0)
  })
  it('Has at least 2 tiles left after first left move', () => {
    const board = new Board(4)
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeGreaterThanOrEqual(2)
  })
})

describe('Impossible move does not create new tile', () => {
  it('Adds no new tile if tile is in bottom-left and move is left', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
  it('Adds no new tile if tile is in bottom-left and move is down', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })

  it('Adds no new tile if tile is in bottom-right and move is right', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
  it('Adds no new tile if tile is in bottom-right and move is down', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
  it('Adds no new tile if tile is in top-left and move is left', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
  it('Adds no new tile if tile is in top-left and move is up', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
  it('Adds no new tile if tile is in top-right and move is up', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
  it('Adds no new tile if tile is in top-right and move is right', () => {
    // 0 based counting, 3 for board size of 4, 1 for board size of 2
    const n = 3
    const bottomLeftCoord = `{"row":${n},"column":0}`
    const board = new Board()
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    board.coordinates[bottomLeftCoord] = 2
    delete board.emptyCoordinates[bottomLeftCoord]
    board.move('left')
    expect(Object.keys(board.coordinates).length).toBeEqualTo(1)
  })
})
