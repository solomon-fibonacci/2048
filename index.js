export class Board {
  constructor(n) {
    this.coordinates = {}
    this.emptyCoordinates = {}
    this.validMoves = ['up', 'right', 'down', 'left']
    this.size = n
    this.score = 0
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        this.emptyCoordinates[`${i},${j}`] = {
          key: `${i},${j}`,
          value: undefined,
        }
      }
    }
    this.addNewTile(2)
  }

  addNewTile(n = 1) {
    while (n) {
      let keys = Object.keys(this.emptyCoordinates)
      let randomKey = keys[Math.floor(Math.random() * keys.length)]
      this.coordinates[randomKey] = {
        key: randomKey,

        value: 2,
        isDerived: false,
      }
      delete this.emptyCoordinates[randomKey]
      n--
    }
  }

  move(direction) {
    if (!this.validMoves.includes(direction)) {
      return false
    }

    switch (direction) {
      case 'up':
        let ceiling = { index: '0,0', value: null, isDerived: false }
        const isCeiling = (coord) => {
          return ceiling.index === coord
        }
        const moveTileToTop = (coord) => {
          if (!ceiling.includes(',0')) {
            if (
              ceiling.value === this.coordinates[coord].value &&
              !ceiling.isDerived
            ) {
              this.coordinates[ceiling.index] = {
                key: ceiling.index,
                value: ceiling.value * 2,
              }
              ceiling.isDerived = true
              this.removeTile(coord)
            }
          }
          ceiling = { index: coord, value: this.coordinates[coord].value }
          this.removeTile(coord)
        }

        for (let i = 0; i < this.size; i++) {
          for (let j = 0; j < this.size; j++) {
            let currentCoord = `${i},${j}`
            if (
              this.emptyCoordinates[currentCoord] ||
              isCeiling(currentCoord)
            ) {
            } else if (this.coordinates[currentCoord]) {
              moveTileToTop(currentCoord)
            }
          }
        }
        break
      case 'left':
        const isAtWall = (tile, wall) => {
          return wall === tile.key
        }
        const pushToWall = (tile, wall) => {
          if (isAtWall(tile, wall)) {
            throw new Error("Cant push tile to wall since it's already at wall")
          } else {
            this.removeTile(tile.key)
            this.coordinates[
              tile.key.replace(/[0-9]*(?:.(?![0-9]))+$/gi, `${wall}`)
            ] = tile
          }
        }
        const collapse = (sourceTile, destTile) => {
          this.removeTile(sourceTile.key)
          this.coordinates[destTile.key] *= 2
          this.score += this.coordinates[destTile.key]
        }

        for (let i = 0; i < this.size; i++) {
          let wall = 0
          for (let j = 0; j < this.size; j++) {
            const currentCoord = `${i},${j}`
            const tile = this.coordinates[currentCoord]
            const lastTile = wall && {
              key: `${i},${wall}`,
              value: this.coordinates[`${i},${wall}`],
              isDerived: false,
            }

            if (tile) {
              if (isAtWall(tile, wall)) {
                if (
                  wall === 0 ||
                  lastTile.value !== tile.value ||
                  lastTile.isDerived
                )
                  wall++
                else if (lastTile.value === tile.value && !lastTile.isDerived) {
                  collapse(tile, lastTile)
                }
              } else {
                pushToWall(tile, wall)
              }
            }
          }
        }
        break
      default:
        console.log('Nothing to see here')
    }
    this.addNewTile()
    return { occupied: this.coordinates, empty: this.emptyCoordinates }
  }

  removeTile(coord) {
    delete this.coordinates[coord]
    this.emptyCoordinates[coord] = { key: coord, value: undefined }
  }
}

export class GameUI {
  constructor(n, domId) {
    this.size = n
    this.colorMap = [
      { color: 'black', bgColor: 'white' },
      { color: 'blue', bgColor: 'yellow' },
    ]
    this.board = new Board(this.size)
    this.boardElement = document.getElementById(domId)
    this.initEmptyBoardTiles()
    this.attachEventHandler()
  }

  initEmptyBoardTiles() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const coordinate = `${i},${j}`
        let tileElement = document.createElement('div')
        tileElement.classList.add('tile')
        tileElement.setAttribute('id', coordinate)
        this.boardElement && this.boardElement.appendChild(tileElement)
      }
    }
  }

  attachEventHandler() {
    this.boardElement &&
      this.boardElement.addEventListener('keypress', this.handleKeypress)
  }

  handleKeypress(evt) {
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

  move(direction) {
    this.board.move(direction)
    this.render()
  }

  render() {}

  renderTile(tile) {
    let tileElement = document.getElementById(tile.key)
    tileElement.innerHTML = tile.value
  }
}

// const gameUI = new GameUI(4, "game");

// const testBoard = new Board(4);
// console.log(testBoard.emptyCoordinates);
// console.log(testBoard.coordinates);
// console.log(testBoard.move("left"));
// console.log(testBoard.move("left"));
// console.log(testBoard.move("left"));
