import { proxy, useSnapshot } from 'valtio'
import { generatePlane, populatePlane, revealCell } from './hooks/main'
import { DEFAULT_COLUMN, DEFAULT_MINES, DEFAULT_ROW } from './utils/constants'

export const store = proxy({
  config: {
    difficulty: 'easy',
    boardCol: DEFAULT_COLUMN,
    boardRow: DEFAULT_ROW,
    numMines: DEFAULT_MINES
  },
  game: {
    plane: [],
    status: 'not started'
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
    store.config = config
  },
  setChecked (row, col) {
    store.game.plane[row][col].isChecked = true
  },
  setFlagged (row, col) {
    store.game.plane[row][col].isFlagged = !store.game.plane[row][col].isFlagged
  },
}

export function useStore () {
  const snap = useSnapshot(store)
  return {
    config: snap.config,
    game: snap.game,
    cell: (row, col) => snap.game.plane[row][col],
  }
}