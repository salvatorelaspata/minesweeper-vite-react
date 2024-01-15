import { proxy, useSnapshot } from 'valtio'
import { generatePlane as _generatePlane, popolatePlane as _popolatePlane, revealCell as _revealCell, revealChecked as _revealChecked } from './hooks/main'
import { DEFAULT_COLUMN, DEFAULT_DIFFICULTY, DEFAULT_MINES, DEFAULT_ROW, GAME_STATUS } from './utils/constants'

import { devtools } from 'valtio/utils'

export interface Cells {
  x: number,
  y: number,
  isChecked: boolean,
  isMine: boolean,
  isFlagged: boolean,
  isRevealed: boolean,
  neighborCount: null | number,
}

export type Plane = Cells[][]
export type Config = {
  difficulty: string
  boardCol: number
  boardRow: number
  numMines: number
}
export type Game = {
  plane: Plane
  config: {
    status: string
  }
}

interface Store {
  config: Config
  game: Game
}

export const store = proxy<Store>({
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
    store.game.plane = _popolatePlane(store.game.plane, store.config.numMines)
  },
  generatePlane () {
    const { boardCol, boardRow } = Object.assign({}, store.config)
    store.game.plane = _generatePlane(boardCol, boardRow)
  },
  revealCell (row: number, col: number) {
    _revealCell(store.game.plane, row, col)
  },
  revealChecked (row: number, col: number) {
    _revealChecked(store.game.plane, row, col)
  },
  setGameStatus (status: string) {
    if (status === GAME_STATUS.LOST || status === GAME_STATUS.WON) {
      store.game.plane.forEach(row => {
        row.forEach(cell => {
          cell.isChecked = true
        })
      })
    }
    store.game.config.status = status
  },
  setConfig (config: Store['config']) {
    store.config = config
  },
  setChecked (row: number, col: number) {
    store.game.plane[row][col].isChecked = true
  },
  setFlagged (row: number, col: number) {
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
    config: snap.config as Config,
    game: snap.game as Game,
    cell: (row: number, col: number) => snap.game.plane[row][col] as Cells,
    store
  }
}