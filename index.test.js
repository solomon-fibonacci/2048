import { Board } from './index'

describe('Tests for the Board class', () => {
    it('Adds exactly 2 new tiles on initialization', () => {
        let board = new Board(4);
        expect(Object.keys(board.coordinates)).toHaveLength(2)
    })
    it('Has total score of 0 on initialization', () => {
        let board = new Board(4);
        expect(board.score).toBe(chsh -s /bin/zsh0)
    })
})