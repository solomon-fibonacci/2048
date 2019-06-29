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
  it('creates unique coordinates for newly added tiles', () => {
    const board = new Board(4)
    let keys=Object.keys(board.coordinates)
    expect(board.coordinates[keys[0]].index===board.coordinates[keys[1]].index).toBeFalsy()
  })
  it('removes corresponding empty coorinates for newly created tiles', () => {
    const board = new Board(4)
    let keys=Object.keys(board.coordinates)
    expect(board.emptyCoordinates[keys[0]].toBeUndefined())
    expect(board.emptyCoordinates[keys[1]].toBeUndefined())
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

describe('Tiles collapse as expected', () => {
  it('increases score by combined value of tiles collapsed in upwards or downwards direction', () => {
    const board = new Board(3)
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    const topCoord = '{"row":0,"column":0}'
    board.coordinates[topCoord]={key:topCoord,value:2}
    delete board.emptyCoordinates[topCoord]
    const midCoord = '{"row":1,"column":0}'
    board.coordinates[midCoord]={key:midCoord,value:2}
    delete board.emptyCoordinates[midCoord]
    const downCoord = '{"row":2,"column":0}'
    board.coordinates[downCoord]={key:downCoord,value:4}
    delete board.emptyCoordinates[downCoord]
    board.move('down')
    expect(board.score).toBe(4)
    board.move('down')
    expect(board.score).toBe(12)
  })
  it('increases score by combined value of tiles collapsed in leftwards or rightwards direction', () => {
    const board = new Board(3)
    board.removeTile(Object.keys(board.coordinates)[0])
    board.removeTile(Object.keys(board.coordinates)[0])
    const leftCoord = '{"row":0,"column":0}'
    board.coordinates[leftCoord]={key:leftCoord,value:2}
    delete board.emptyCoordinates[leftCoord]
    const midCoord = '{"row":0,"column":1}'
    board.coordinates[midCoord]={key:midCoord,value:2}
    delete board.emptyCoordinates[midCoord]
    const downCoord = '{"row":0,"column":2}'
    board.coordinates[rightCoord]={key:rightCoord,value:4}
    delete board.emptyCoordinates[downCoord]
    board.move('left')
    expect(board.score).toBe(4)
    board.move('right')
    expect(board.score).toBe(12)
  })

})
