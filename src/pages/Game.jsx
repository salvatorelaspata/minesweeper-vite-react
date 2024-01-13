import { Board } from '../components/game/Board';
import { GameHeader } from '../components/game/GemeHeader';
import { useGame } from '../hooks/useGame';

import './Game.css'

const Game = () => {
  const { config, game, reset, renderBoard } = useGame();
  console.log('[Game.jsx]', game)

  return (
    <>
      <GameHeader config={config} game={game} reset={reset} />
      <Board renderBoard={renderBoard} />
    </>
  );
};

export default Game;
