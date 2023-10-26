import { proxy, useSnapshot } from 'valtio'
import { generatePlane, populatePlane } from './hooks/main'
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
  setGameStatus (status) {
    store.game.status = status
  },
  setConfig (config) {
    store.config = config
  }
}

export function useStore () {
  const snap = useSnapshot(store)
  return {
    config: snap.config,
    game: snap.game
  }
}