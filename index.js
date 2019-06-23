export class Board {
  constructor(n, callback) {
    this.coordinates = {}
    this.emptyCoordinates = {}
    this.validMoves = ['up', 'right', 'down', 'left']
    this.gameOverCallback = callback
    this.size = n
    this.score = 0
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const coord = this.getCoord({row: i, column: j})
        this.emptyCoordinates[coord] = {
          key: coord,
          value: 0,
        }
      }
    }
    this.addNewTile(2)
  }

  getCoord(rowColumn) {
    const {row, column} = rowColumn
    return JSON.stringify({row, column})
  }

  getCurrentCoord(i, j, direction) {
    if (this.isVertical(direction)) {
      return this.getCoord({row: j, column: i})
    }
    return this.getCoord({row: i, column: j})
  }

  addNewTile(n = 1) {
    while (n) {
      const keys = Object.keys(this.emptyCoordinates)
      if (!keys.length) {
        this.gameOver()
      }
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      this.coordinates[randomKey] = {
        key: randomKey,

        value: 2,
        isDerived: false,
      }
      delete this.emptyCoordinates[randomKey]
      n--
    }

  gameOver() {
    this.gameOverCallback(this)
  }

  getInitialWall(direction) {
    if (direction === 'up' || direction === 'left') {
      return 0
    } else {
      return this.size - 1
    }
  }

  adjustIndexForDirection(y, x, direction) {
    if (direction === 'down' || direction === 'right') {
      return {i: this.size - 1 - y, j: this.size - 1 - x}
    } else {
      return {i: y, j: x}
    }
  }

  move(direction) {
    if (!this.validMoves.includes(direction)) {
      throw new Error('Invalid move')
    }

    for (let y = 0; y < this.size; y++) {
      let wall = this.getInitialWall(direction)
      for (let x = 0; x < this.size; x++) {
        const {i, j} = this.adjustIndexForDirection(y, x, direction)
        const currentCoord = this.getCurrentCoord(i, j, direction)
        const tile = this.coordinates[currentCoord]
        const lastTile = this.getLastTile(i, wall, direction)

        if (tile) {
          if (this.shouldNotMove(tile, lastTile, wall, direction)) {
            wall = this.moveWall(wall)
          } else {
            if (this.shouldCollapse(tile, lastTile)) {
              this.collapse(tile, lastTile)
            } else {
              this.pushToWall(tile, wall, direction)
            }
          }
        }
      }
    }

    this.addNewTile()
    return {occupied: this.coordinates, empty: this.emptyCoordinates}
  }

  shouldNotMove(tile, lastTile, wall, direction) {
    if (
      (!lastTile && this.isAtWall(tile, wall, direction)) ||
      (lastTile &&
        this.isAdj(tile, lastTile) &&
        !this.shouldCollapse(tile, lastTile))
    ) {
      return true
    }
    return false
  }

  isAdj(tile1, tile2) {
    const row1 = this.getRow(tile1)
    const row2 = this.getRow(tile2)
    const column1 = this.getColumn(tile1)
    const column2 = this.getColumn(tile2)
    return (
      (row1 === row2 && Math.abs(column1 - column2) === 1) ||
      (column1 === column2 && Math.abs(row1 - row2))
    )
  }

  moveWall(direction, wall) {
    if (direction === 'up' || direction === 'left') {
      return wall++
    }
    return wall--
  }

  isVertical(direction) {
    return direction === 'up' || direction === 'down'
  }

  wallIsStillInitial(wall, direction) {
    return wall === this.getInitialWall(direction)
  }

  getLastTile(currentLine, wall, direction) {
    if (this.wallIsStillInitial(wall, direction)) {
      return null
    }
    let coord
    if (this.isVertical(direction)) {
      coord = this.getCoord({row: wall, column: currentLine})
    } else {
      coord = this.getCoord({row: currentLine, column: wall})
    }
    return {
      key: coord,
      value: this.coordinates[coord],
      isDerived: false,
    }
  }

  collapse(sourceTile, destTile) {
    this.removeTile(sourceTile.key)
    this.coordinates[destTile.key] *= 2
    this.score += this.coordinates[destTile.key]
  }

  shouldCollapse(tile, lastTile) {
    return lastTile && lastTile.value === tile.value && !lastTile.isDerived
  }

  removeTile(coord) {
    delete this.coordinates[coord]
    this.emptyCoordinates[coord] = {key: coord, value: undefined}
  }

  isAtWall(tile, wall, direction) {
    if (this.isVertical(direction)) {
      return this.getRow(tile) === wall
    } else {
      return this.getColumn(tile) === wall
    }
  }

  getRow(tile) {
    return JSON.parse(tile.key).row
  }

  getColumn(tile) {
    return JSON.parse(tile.key).column
  }

  pushToWall(tile, wall, direction) {
    if (this.isAtWall(tile, wall, direction)) {
      throw new Error('Tile is already at wall')
    } else {
      let coord
      if (this.isVertical(direction)) {
        coord = this.getCoord({row: wall, column: this.getColumn(tile)})
      } else {
        coord = this.getCoord({row: this.getRow(tile), column: wall})
      }
      this.coordinates[coord] = {key: coord, value: tile.value}
      this.removeTile(tile)
    }
  }

  getValue(i, j) {
    const tile = this.coordinates[this.getCoord({row: i, column: j})]
    if (!tile) {
      return 0
    }
    return tile.value
  }
}
