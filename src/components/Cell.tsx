import React from 'react';
import { Cells, action, useStore } from '../store';

import './Cell.css'
import { GAME_STATUS } from '../utils/constants';

type NeighborCountProps = {
  neighborCount: number;
}
const NeighborCount: React.FC<NeighborCountProps> = ({ neighborCount }) => (
  <span data-neighborcount={neighborCount}>
    {`${neighborCount ?? ''}`}
  </span>
)
const Flag: React.FC = () => <span>🚩</span>
const Mine: React.FC = () => <span className='mine'></span>

type CellProps = {
  x: number;
  y: number;
}

const Cell: React.FC<CellProps> = ({ x, y }) => {
  const { cell, game } = useStore();
  const _cell = cell(x, y);
  const className =
    `cell${_cell.isFlagged ? ' flagged' : ''}${!_cell.isChecked ? ' revealed' : ''}`;
  return (
    <div className={className}
      onClick={(e) => {
        e.preventDefault();
        console.log(`${!_cell.isFlagged && !_cell.isChecked} if true, then onSelected()`)
        console.log(`${_cell.neighborCount} if true, then action.revealChecked(${x}, ${y})`)
        if (!_cell.isFlagged && !_cell.isChecked) {
          // LOST
          if (_cell.isMine) return action.setGameStatus(GAME_STATUS.LOST)

          const isNOTLost = game.config.status !== GAME_STATUS.LOST

          if (!_cell.isChecked && isNOTLost) action.revealCell(x, y)
          else console.log('[useGame.tsx] cell is already checked')

          if (isNOTLost) {
            action.setGameStatus(GAME_STATUS.STARTED)
            action.setChecked(x, y)
          }
        }
        else if (_cell.neighborCount) { action.revealChecked(x, y) }
        return
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!_cell.isChecked) action.setFlagged(x, y);
        return
      }}>
      {_cell.isChecked && _cell.neighborCount && <NeighborCount neighborCount={_cell.neighborCount} />}
      {_cell.isFlagged && <Flag />}
      {_cell.isChecked && _cell.isMine && <Mine />}
    </div >
  );
};

export default Cell;
