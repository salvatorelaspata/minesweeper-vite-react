import { GAME_STATUS } from '../../utils/constants';
import Timer from '../Timer';



export const GameHeader = ({ config, game, reset }) => {
  const _statusIcon =
    game.config.status === GAME_STATUS.WON ? '😎'
      : game.config.status === GAME_STATUS.LOST ? '😒'
        : game.config.status === GAME_STATUS.NOT_STARTED ? '🥱'
          : '🙂'

  return (
    <div className="minesweeper-header">
      <div className="numMines">
        {config.numMines}
      </div>

      <button className="status" onClick={reset}>
        {_statusIcon}
      </button>

      <Timer />
    </div>
  )
};