export const STANDARD_CONFIG = {
  easy: {
    boardCol: 10,
    boardRow: 10,
    numMines: 20
  },
  medium: {
    boardCol: 20,
    boardRow: 20,
    numMines: 80
  },
  hard: {
    boardCol: 30,
    boardRow: 30,
    numMines: 99
  }
}
export const DEFAULT_DIFFICULTY = 'medium'
export const DEFAULT_COLUMN = STANDARD_CONFIG[DEFAULT_DIFFICULTY].boardCol
export const DEFAULT_ROW = STANDARD_CONFIG[DEFAULT_DIFFICULTY].boardRow
export const DEFAULT_MINES = STANDARD_CONFIG[DEFAULT_DIFFICULTY].numMines

export const GAME_STATUS = {
  NOT_STARTED: 'not started',
  STARTED: 'started',
  LOST: 'lost',
  WON: 'won'
}