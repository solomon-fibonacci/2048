import {Board} from './index'

describe('Tests for the Board class', () => {
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
