import { action, useStore } from '../store';

import './Cell.css'

const NeighborCount = ({ neighborCount }) => (
  <span data-neighborcount={neighborCount}>
    {`${neighborCount ?? ''}`}
  </span>
)
const Flag = () => <span>🚩</span>
const Mine = () => <span className='mine'></span>

const Cell = ({ cell: { x, y }, onSelected }) => {
  const { cell } = useStore();
  const _cell = cell(x, y);
  const className =
    `cell${_cell.isFlagged ? ' flagged' : ''}${!_cell.isChecked ? ' revealed' : ''}`;
  return (
    <div className={className}
      onClick={(e) => {
        e.preventDefault();
        if (!_cell.isFlagged && !_cell.isChecked) onSelected()
        else if (_cell.neighborCount) action.revealChecked(x, y)()
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
