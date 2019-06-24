import { Board } from './index.js'

class GameUI {
  constructor(n, domId) {
    this.size = n
    this.board = new Board(this.size, () => {
      alert('--game over--')
    })
    this.boardElement = document.getElementById(domId)
    this.render()
    this.handleKeypress = evt => {
      switch (evt.keyCode) {
        case 37:
          this.move('left')
          break
        case 38:
          this.move('up')
          break
        case 39:
          this.move('right')
          break
        case 40:
          this.move('down')
          break
        default:
          console.log('You can move in only 4 directions')
      }
    }
    this.attachEventHandler()
  }

  attachEventHandler() {
    document.addEventListener('keydown', this.handleKeypress)
  }

  render(direction = '') {
    const tableChild = (tag, i = 0) => {
      let html = ''
      for (let j = 0; j < this.size; j++) {
        html = `${html}<${tag}>${
          tag === 'tr' ? tableChild('td', j) : this.board.getValue(i, j)
        }</${tag}>`
      }
      return html
    }

    const rows = tableChild('tr')
    const table = `<table>${rows}</table>`
    this.boardElement.innerHTML = `<br><br><div>${direction}<br>score: ${
      this.board.score
    }</div>${table}`
    window.scrollTo(0, document.body.scrollHeight)
  }

  move(direction) {
    this.board.move(direction)

    this.render(direction)
  }
}

new GameUI(4, 'game')
