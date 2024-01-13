import { proxy, useSnapshot } from 'valtio'
import { generatePlane as _generatePlane, popolatePlane as _popolatePlane, revealCell as _revealCell, revealChecked as _revealChecked } from './hooks/main'
import { DEFAULT_COLUMN, DEFAULT_DIFFICULTY, DEFAULT_MINES, DEFAULT_ROW, GAME_STATUS } from './utils/constants'

import { devtools } from 'valtio/utils'

export const store = proxy({
  config: {
    difficulty: DEFAULT_DIFFICULTY,
    boardCol: DEFAULT_COLUMN,
    boardRow: DEFAULT_ROW,
    numMines: DEFAULT_MINES
  },
  game: {
    plane: [],
    config: { status: GAME_STATUS.NOT_STARTED }
  }
})

devtools(store, { name: 'minesweeper', enabled: true })

export const action = {
  popolatePlane () {
    const _plane = [].concat(store.game.plane);
    store.game.plane = _popolatePlane(_plane, store.config.numMines)
  },
  generatePlane () {
    const { boardCol, boardRow } = Object.assign({}, store.config)
    store.game.plane = _generatePlane(boardCol, boardRow)
  },
  revealCell (row, col) {
    _revealCell(store.game.plane, row, col)
  },
  revealChecked (row, col) {
    _revealChecked(store.game.plane, row, col)
  },
  setGameStatus (status) {
    if (status === GAME_STATUS.LOST || status === GAME_STATUS.WON) {
      store.game.plane.forEach(row => {
        row.forEach(cell => {
          cell.isChecked = true
        })
      })
    }
    store.game.config.status = status
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
  checkWin () {
    let count = 0
    store.game.plane.forEach(row => {
      row.forEach(cell => {
        if (!cell.isChecked) count++
      })
    })

    if (count === store.config.numMines) {
      action.setGameStatus(GAME_STATUS.WON)
    }
  }
}

export function useStore () {
  const snap = useSnapshot(store)
  return {
    config: snap.config,
    game: snap.game,
    cell: (row, col) => snap.game.plane[row][col],
    store
  }
}