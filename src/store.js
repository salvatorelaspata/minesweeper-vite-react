import { proxy, useSnapshot } from 'valtio'
import { generatePlane, populatePlane, revealCell } from './hooks/main'
import { DEFAULT_COLUMN, DEFAULT_DIFFICULTY, DEFAULT_MINES, DEFAULT_ROW, GAME_STATUS } from './utils/constants'

export const store = proxy({
  config: {
    difficulty: DEFAULT_DIFFICULTY,
    boardCol: DEFAULT_COLUMN,
    boardRow: DEFAULT_ROW,
    numMines: DEFAULT_MINES
  },
  game: {
    plane: [],
    status: GAME_STATUS.NOT_STARTED
  }
})

export const action = {
  populatePlane () {
    store.game.plane = populatePlane(store.game.plane, store.config.numMines)
  },
  generatePlane () {
    store.game.plane = generatePlane(store.config.boardCol, store.config.boardRow)
  },
  revealCell (row, col) {
    revealCell(store.game.plane, row, col)
  },
  setGameStatus (status) {
    if (status === 'lost' || status === 'won') {
      store.game.plane.forEach(row => {
        row.forEach(cell => {
          cell.isChecked = true
        })
      })
    }
    store.game.status = status
  },
  setConfig (config) {
    debugger;
    store.config = config
  },
  setChecked (row, col) {
    store.game.plane[row][col].isChecked = true
  },
  setFlagged (row, col) {
    store.game.plane[row][col].isFlagged = !store.game.plane[row][col].isFlagged
  },
  checkWin () {
    let count = 0
    store.game.plane.forEach(row => {
      row.forEach(cell => {
        if (!cell.isChecked) count++
      })
    })
    console.log(count, store.config.numMines)
    if (count === store.config.numMines) {
      action.setGameStatus('won')
    }
  }
}

export function useStore () {
  const snap = useSnapshot(store)
  return {
    config: snap.config,
    game: snap.game,
    cell: (row, col) => snap.game.plane[row][col],
  }
}