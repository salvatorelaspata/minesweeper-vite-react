import React from 'react';
import { Board } from '../components/game/Board';
import { GameHeader } from '../components/game/GemeHeader';
import { useGame } from '../hooks/useGame';

import './Game.css'

const Game: React.FC = () => {
  const { config, game, reset, renderBoard } = useGame();

  return (
    <>
      <GameHeader config={config} game={game} reset={reset} />
      <Board renderBoard={renderBoard} />
    </>
  );
};

export default Game;
