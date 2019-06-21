
class Board {
    constructor(n, colorMap) {
        this.coordinates = {}
        this.emptyCoordinates = {}
        this.validMoves = ['up', 'right', 'down', 'left']
        this.size = n
        this.score = 0
        this.colorMap = colorMap
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                this.emptyCoordinates[`${i},${j}`] = { key: `${i},${j}`, value: undefined }
            }
        }
        addNewTile(2)
    }

    addNewTile(n = 1) {
        while (n) {
            let keys = Object.keys(this.emptyCoordinates);
            let randomKey = keys[Math.floor(Math.random() * keys.length)]
            this.coordinates[randomKey] = { key: randomKey, value: 2 }
            delete this.emptyCoordinates[randomKey]
            n--
        }
    }

    move(direction) {
        if (!this.validMoves.includes(direction)) {
            return
        }

        switch (direction) {
            case 'up':
                let ceiling = { index: '0,0', value: null, isDerived: false }
                const isCeiling = (coord) => { return ceiling.index === coord }
                const moveTileToTop = (coord) => {
                    if (!ceiling.includes(',0')) {
                        if (ceiling.value === this.coordinates[coord].value && !ceiling.isDerived) {
                            this.coordinates[ceiling.index] = { key: ceiling.index, value: (ceiling.value * 2) }
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
                        if (this.emptyCoordinates[currentCoord] || isCeiling(currentCoord){

                        } else if (this.coordinates[currentCoord]) {
                            moveTileToTop(currentCoord)

                        }
                    }
                }
        }
    }


    removeTile(coord) {
        delete this.coordinates[coord]
        this.emptyCoordinates[coord] = { key: coord, value: undefined }
    }

    tallyscore() {
        let keys = Object.keys(this.coordinates);
        this.score = 0
        for (let i = 0; i < keys.length; i++) {
            let tileKey = keys[i]
            let tileValue = this.coordinates[tileKey].value
            this.score = this.score + tileValue
        }
    }
}


class GameUI {
    constructor(n, domId) {
        this.size = n
        this.colorMap = [{ color: 'black', bgColor: 'white' }, { color: 'blue', bgColor: 'yellow' }]
        this.board = new Board(this.size, this.colorMap)
        this.boardElement = document.getElementById(domId)
        this.initEmptyBoardTiles()
        this.attachEventHandler()
    }

    initEmptyBoardTiles() {
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                const coordinatKey = `${i},${j}`
                let tileElement = document.createElement('div')
                tileElement.classList.add('tile')
                tileElement.setAttribute('id', coordinate)
                this.boardElement.appendChild(tileElement)
            }
        }
    }


    attachEventHandler() {
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
            case 40:
                this.move('down')
        }
    }

    move(direction) {
        this.board.move(direction)
        this.render()
    }

    render() {

    }

    renderTile(tile) {
        tileElement = document.getElementById(tile.key)
        tileElement.innerHTML = tile.value
    }
}


const gameUI = new GameUI(4, 'game')    
