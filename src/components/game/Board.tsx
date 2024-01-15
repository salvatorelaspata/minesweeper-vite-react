import React from 'react';

interface BoardProps {
  renderBoard: () => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

export const Board: React.FC<BoardProps> = ({ renderBoard }) => {
  return (
    <div className="minesweeper">
      <div className="board">{renderBoard()}</div>
    </div>
  )
}