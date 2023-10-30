import './Cell.css'
import { action, useStore } from '../store';

const Cell = ({ cell: { x, y }, onSelected, onSelectedChecked }) => {
  const { cell } = useStore();
  const _cell = cell(x, y);
  const className =
    `cell${_cell.isMine ? ' mine' : ''}${_cell.isFlagged ? ' flagged' : ''}${!_cell.isChecked ? ' revealed' : ''}`;
  return (
    <div className={className}
      onClick={(e) => {
        e.preventDefault();
        if (!_cell.isFlagged && !_cell.isChecked) onSelected()
        else if (_cell.neighborCount) onSelectedChecked()
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        if (!_cell.isChecked) action.setFlagged(x, y);
      }}>
      {_cell.isChecked && <span>{`${_cell.neighborCount ?? ''}`}</span>}
      <span>{_cell.isFlagged && '🚩'}</span>
    </div >
  );
};

export default Cell;
