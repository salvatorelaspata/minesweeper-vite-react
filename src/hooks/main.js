// function to generate a plane of minesweeper and return it as a 2D array
export const generatePlane = (row, column) => {
  const plane = []
  for (let i = 0; i < column; i++) {
    const _row = []
    for (let j = 0; j < row; j++) {
      _row.push({
        x: i,
        y: j,
        isChecked: false,
        isMine: false,
        isFlagged: false, // unused
        isRevealed: false, // unused
        neighborCount: null,
      })
    }
    plane.push(_row)
  }
  return plane
}

// function to popolate the plane with mines
// Implement perlin noise to generate a more natural distribution of mines
export const populatePlane = (plane, minesCount) => {
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
const _getNeighborCount = (plane, x, y) => {
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

const _getAdiacentCells = (plane, x, y) => {
  const _y = plane[0].length
  const _x = plane.length

  const adiacentCells = []
  for (let i = x - 1; i <= x + 1; i++) {
    if (i < 0 || i >= _x) continue // skip if out of bound
    for (let j = y - 1; j <= y + 1; j++) {
      if (j < 0 || j >= _y) continue // skip if out of bound
      if (plane[i][j].isMine) continue // skip if is mine or is already
      if (x === plane[i][j].x && y === plane[i][j].y) continue // skip if is mine or is already checked (to avoid infinite loop)
      adiacentCells.push(plane[i][j])
    }
  }
  return adiacentCells
}

// function to reveal the cell and all the adiacent cells
export const revealCell = (plane, x, y, i = 0) => {
  if (plane[x][y].neighborCount) return
  const adiacentCells = _getAdiacentCells(plane, x, y)
  if (adiacentCells.every((c) => !c.isMine))
    adiacentCells.forEach((_cell) => {
      if (!_cell.neighborCount && !_cell.isChecked) {
        plane[_cell.x][_cell.y].isChecked = true
        revealCell(plane, _cell.x, _cell.y, i++)
      }
      else if (_cell.neighborCount && i > 0) {
        plane[_cell.x][_cell.y].isChecked = true
      }
    })
}
