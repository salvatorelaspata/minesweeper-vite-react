type Difficulty = 'easy' | 'medium' | 'hard'

type StandardConfig = {
  [key in Difficulty]: {
    boardCol: number,
    boardRow: number,
    numMines: number
  }
}

export const STANDARD_CONFIG: StandardConfig = {
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

export const DEFAULT_DIFFICULTY: string = 'medium'
export const DEFAULT_COLUMN: number = STANDARD_CONFIG[DEFAULT_DIFFICULTY].boardCol
export const DEFAULT_ROW: number = STANDARD_CONFIG[DEFAULT_DIFFICULTY].boardRow
export const DEFAULT_MINES: number = STANDARD_CONFIG[DEFAULT_DIFFICULTY].numMines

type StatusKey = 'NOT_STARTED' | 'STARTED' | 'LOST' | 'WON'
type Status = 'not started' | 'started' | 'lost' | 'won'
type StatusConfig = { [key in StatusKey]: Status }

export const GAME_STATUS: StatusConfig = {
  NOT_STARTED: 'not started',
  STARTED: 'started',
  LOST: 'lost',
  WON: 'won'
}