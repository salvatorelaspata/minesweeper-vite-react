export const Board = ({ renderBoard }) => {
  return (
    <div className="minesweeper">
      <div className="board">{renderBoard()}</div>
    </div>
  )
}