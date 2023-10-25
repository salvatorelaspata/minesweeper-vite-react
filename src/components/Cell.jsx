import { useState } from 'react';
import './Cell.css'

/**
 * The size of each cell in pixels.
 */
const CELL_SIZE = 30;

/**
 * The props for the Cell component.
 * @typedef {Object} CellProps
 * @property {number} x - The x coordinate of the cell.
 * @property {number} y - The y coordinate of the cell.
 * @property {number} neighborCount - The number of neighboring cells that contain mines.
 * @property {boolean} isMine - Whether the cell contains a mine.
 * @property {boolean} isFlagged - Whether the cell is flagged.
 * @property {boolean} isRevealed - Whether the cell is revealed.
 * @property {boolean} isChecked - Whether the cell is checked.
 */

/**
 * The props for the Cell component.
 * @typedef {Object} CellComponentProps
 * @property {CellProps} cell - The cell to render.
 * @property {Function} onSelected - The function to call when the cell is selected.
 */

/**
 * Renders a single cell in the Minesweeper game.
 * @param {CellComponentProps} props - The component props.
 * @returns {JSX.Element} - The rendered cell.
 */
const Cell = ({
  cell: {
    isMine,
    neighborCount
  },
  onSelected }) => {
  const [checked, setChecked] = useState(false)
  const [flagged, setFlagged] = useState(false)
  const className = `cell${isMine ? ' mine' : ''}${flagged ? ' flagged' : ''}${!checked ? ' revealed' : ''}`;
  return (
    <div className={className}
      onClick={() => {
        if (!flagged) {
          setChecked(true);
          onSelected()
        }
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!checked) setFlagged(!flagged);
      }}
    >
      {checked && <span>{`${neighborCount ?? ''}`}</span>}
      <span>{flagged && '🚩'}</span>
    </div >
  );
};

export default Cell;
