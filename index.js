export class Board {
  constructor(n, callback) {
    this.coordinates = {}
    this.emptyCoordinates = {}
    this.validMoves = ['up', 'right', 'down', 'left']
    this.gameOverCallback = callback
    this.size = n
    this.score = 0
    this.gameIsOver = false
    this.maxPulseChecks = 2
    this.pulseChecks = 0
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const rc = { row: i, column: j }
        const coord = this.getCoord(rc)
        this.emptyCoordinates[coord] = {
          key: coord,
          value: 0
        }
      }
    }
    this.addNewTile(2)
  }

  getCoord(rowColumn) {
    const { row, column } = rowColumn
    return JSON.stringify({ row, column })
  }

  getCurrentCoord(i, j, direction) {
    if (this.isVertical(direction)) {
      return this.getCoord({ row: j, column: i })
    }
    return this.getCoord({ row: i, column: j })
  }

  addNewTile(n = 1) {
    while (n) {
      const keys = Object.keys(this.emptyCoordinates)
      const randomKey = keys[Math.floor(Math.random() * keys.length)]
      this.coordinates[randomKey] = {
        key: randomKey,
        value: 2,
        isDerived: false
      }
      delete this.emptyCoordinates[randomKey]
      console.log(Object.keys(this.emptyCoordinates))
      n--
    }
    if (!Object.keys(this.emptyCoordinates).length) {
      this.checkPulse()
    }
  }

  gameOver() {
    this.gameIsOver = true
    this.gameOverCallback(this)
  }

  initializeWall(direction) {
    this.lastWall = -1
    if (direction === 'up' || direction === 'left') {
      this.wall = 0
    } else {
      this.wall = this.size - 1
    }
  }

  adjustIndexForDirection(y, x, direction) {
    if (direction === 'down' || direction === 'right') {
      return { i: this.size - 1 - y, j: this.size - 1 - x }
    } else {
      return { i: y, j: x }
    }
  }

  move(direction) {
    if (this.gameIsOver) {
      return
    }
    if (!this.validMoves.includes(direction)) {
      throw new Error('Invalid move')
    }
    this.direction = direction
    this.touched = false
    for (let y = 0; y < this.size; y++) {
      this.initializeWall(direction)
      for (let x = 0; x < this.size; x++) {
        const { i, j } = this.adjustIndexForDirection(y, x, direction)
        const currentCoord = this.getCurrentCoord(i, j, direction)
        const tile = this.coordinates[currentCoord]
        if (tile) {
          tile.isDerived = false
          const lastTile = this.getLastTile(i, direction)
          if (this.shouldNotMove(tile, lastTile, direction)) {
            this.moveWall(direction)
          } else {
            if (this.isInCheckMode) {
              this.isInCheckMode = false
              this.pulseChecks = 0
              return
            }
            if (this.shouldCollapse(tile, lastTile)) {
              this.collapse(tile, lastTile)
            } else {
              this.pushToWall(tile, direction)
            }
            this.touched = true
          }
        }
      }
    }
    if (
      !this.touched &&
      this.isInCheckMode &&
      this.pulseChecks === this.maxPulseChecks
    ) {
      this.gameOver()
    } else if (this.touched && !this.isInCheckMode) {
      this.addNewTile()
    }

    return { occupied: this.coordinates, empty: this.emptyCoordinates }
  }

  checkPulse() {
    this.coordBackup = Object.assign({}, this.coordinates)
    if (!Object.keys(this.emptyCoordinates).length) {
      this.isInCheckMode = true
      this.pulseChecks++
      this.move('left')
      if (this.isInCheckMode) {
        this.move('up')
      }
    }
    return
  }

  shouldNotMove(tile, lastTile, direction) {
    if (
      (!lastTile && this.isAtWall(tile, direction)) ||
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
      (column1 === column2 && Math.abs(row1 - row2) === 1)
    )
  }

  moveWall(direction) {
    this.lastWall = this.wall
    if (direction === 'up' || direction === 'left') {
      this.wall++
    } else {
      this.wall--
    }
  }

  isVertical(direction) {
    return direction === 'up' || direction === 'down'
  }

  getLastTile(currentLine, direction) {
    if (this.lastWall < 0) {
      return null
    }
    let coord
    if (this.isVertical(direction)) {
      coord = this.getCoord({ row: this.lastWall, column: currentLine })
    } else {
      coord = this.getCoord({ row: currentLine, column: this.lastWall })
    }
    return {
      key: coord,
      value: this.coordinates[coord].value,
      isDerived: this.coordinates[coord].isDerived
    }
  }

  collapse(sourceTile, destTile) {
    this.removeTile(sourceTile)
    this.coordinates[destTile.key].value *= 2
    this.coordinates[destTile.key].isDerived = true
    this.score += this.coordinates[destTile.key].value
  }

  shouldCollapse(tile, lastTile) {
    return lastTile && lastTile.value === tile.value && !lastTile.isDerived
  }

  removeTile(tile) {
    delete this.coordinates[tile.key]
    this.emptyCoordinates[tile.key] = { key: tile.key, value: undefined }
  }

  isAtWall(tile, direction) {
    if (this.isVertical(direction)) {
      return this.getRow(tile) === this.wall
    } else {
      return this.getColumn(tile) === this.wall
    }
  }

  getRow(tile) {
    return JSON.parse(tile.key).row
  }

  getColumn(tile) {
    return JSON.parse(tile.key).column
  }

  pushToWall(tile, direction) {
    if (this.isAtWall(tile, direction)) {
      throw new Error('Tile is already at wall')
    } else {
      let coord
      if (this.isVertical(direction)) {
        coord = this.getCoord({ row: this.wall, column: this.getColumn(tile) })
      } else {
        coord = this.getCoord({ row: this.getRow(tile), column: this.wall })
      }
      this.coordinates[coord] = { key: coord, value: tile.value }
      delete this.emptyCoordinates[coord]
      this.removeTile(tile)
      this.moveWall(direction)
    }
  }

  getValue(i, j) {
    const tile = this.coordinates[this.getCoord({ row: i, column: j })]
    if (!tile) {
      return 0
    }
    return tile.value
  }
}
