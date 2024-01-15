import { Cell, Plane, action } from '../store'
import { GAME_STATUS } from '../utils/constants'

// function to generate a plane of minesweeper and return it as a 2D array
type GeneratePlane = (row: number, column: number) => Plane
export const generatePlane: GeneratePlane = (row, column) => {
  const plane: Plane = []
  for (let i = 0; i < column; i++) {
    const _row = []
    for (let j = 0; j < row; j++) {
      _row.push({
        x: i,
        y: j,
        isChecked: false,
        isMine: false,
        isFlagged: false,
        isRevealed: false,
        neighborCount: null,
      })
    }
    plane.push(_row)
  }
  return plane
}

// function to popolate the plane with mines
// Implement perlin noise to generate a more natural distribution of mines
type PopolatePlane = (plane: Plane, minesCount: number) => Plane
export const popolatePlane: PopolatePlane = (plane, minesCount) => {
  let count = 0
  const _y = plane[0].length
  const _x = plane.length

  while (count < minesCount) {
    const x = Math.floor(Math.random() * _x)
    const y = Math.floor(Math.random() * _y)

    if (!plane[x][y].isMine) {
      plane[x][y].isMine = true
      plane[x][y].neighborCount = null;
      _getNeighborCount(plane, x, y)
      count++
    }
  }

  return plane
}

// function to get neighbor count of the adiacent cells
type GetNeighborCount = (plane: Plane, x: number, y: number) => void
const _getNeighborCount: GetNeighborCount = (plane, x, y) => {
  const _y = plane[0].length
  const _x = plane.length
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i >= _x) continue
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j >= _y) continue
      if (plane[i][j].isMine) continue
      plane[i][j].neighborCount++
    }
  }
}

// function to reveal the cell and all the adiacent cells
interface IRevealCell {
  plane: Plane,
  x: number,
  y: number,
  includeMine?: boolean
}
type AdiacentCells = (IAdiacentCells) => Cell[]
const _getAdiacentCells: AdiacentCells = ({ plane, x, y, includeMine = false }) => {
  const _y = plane[0].length
  const _x = plane.length

  const adiacentCells: Cell[] = []
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i >= _x) continue // skip if out of bound
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j >= _y) continue // skip if out of bound
      if (plane[i][j].isMine && !includeMine) continue // skip if is mine or is already
      if (x === plane[i][j].x && y === plane[i][j].y) continue // skip if is mine or is already checked (to avoid infinite loop)
      adiacentCells.push(plane[i][j])
    }
  }
  return adiacentCells
}

// function to reveal the cell and all the adiacent cells
type RevealCell = (plane: Plane, x: number, y: number, i?: number) => void
export const revealCell: RevealCell = (plane, x, y, i = 0) => {
  // 1. se la cella che si sta analizzando contiene un numero non fare nulla
  if (plane[x][y].neighborCount) return
  if (plane[x][y].isMine) return
  // 2. se la cella non contiene un numero è papabile per la ricorsione quindi recupero le celle adiacenti
  const adiacentCells = _getAdiacentCells({ plane, x, y })
  // 3. se non ci sono mine tra le celle adiacenti (every --> se tutte non sono mine)
  if (adiacentCells.every((c) => !c.isMine))
    // 4. per ogni cella adiacente
    adiacentCells.forEach((_cell) => {
      // 5. se la cella in esame non contiene un numero (neighborCount) e non è stata già controllata (checked)
      if (!_cell.neighborCount && !_cell.isChecked) {
        // 6. setta la cella come checked
        plane[_cell.x][_cell.y].isChecked = true
        // 7. richiama la funzione ricorsivamente incrementano l'indice (i)
        revealCell(plane, _cell.x, _cell.y, i)
      }
      else if (_cell.neighborCount) {

        plane[_cell.x][_cell.y].isChecked = true
      }
    })
}

type RevealChecked = (plane: Plane, x: number, y: number) => void
export const revealChecked: RevealChecked = (plane, x, y) => {
  const adiacent = _getAdiacentCells({ plane, x, y, includeMine: true })

  // se tra gli adiacenti ci sono tante bandierine quante sono indicate nel neighborCount
  if (adiacent.filter(c => c.isFlagged).length === plane[x][y].neighborCount) {
    // verifico le celle adiacente
    adiacent.forEach(c => {
      // se la cella non è già stata cliccata o ha una bandiera
      if (!c.isChecked && !c.isFlagged) {
        // se è una mina imposto lo stato LOST
        if (c.isMine) return action.setGameStatus(GAME_STATUS.LOST)
        // se tra le celle è presente una cella bianca (senza numero) 
        // allora rivelo le celle
        if (!c.neighborCount) revealCell(plane, c.x, c.y)
        plane[c.x][c.y].isChecked = true

      }
    })
  }

}
