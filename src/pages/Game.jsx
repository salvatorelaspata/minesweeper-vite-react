import { GAME_STATUS } from '../utils/constants';
import Timer from '../components/Timer';
import { useGame } from '../hooks/useGame';

import './Game.css'

const Game = () => {
  const { config, game, renderBoard, reset } = useGame();

  const _statusIcon =
    game.config.status === GAME_STATUS.WON ? '😎'
      : game.config.status === GAME_STATUS.LOST ? '😒'
        : game.config.status === GAME_STATUS.NOT_STARTED ? '🥱'
          : '🙂'
  return (
    <>
      {/* HEADER */}
      <div className="minesweeper-header">
        <div className="numMines">
          {config.numMines}
        </div>

        <button className="status" onClick={reset}>
          {_statusIcon}
        </button>

        <Timer />
      </div>
      {/* BOARD */}
      <div className="minesweeper">
        <div className="board">{renderBoard()}</div>
      </div>
    </>
  );
};

export default Game;
