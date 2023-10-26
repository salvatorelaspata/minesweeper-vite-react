import React, { useState, useEffect, useMemo } from 'react';
import { revealCell } from '../hooks/main'

import './Game.css'
import Cell from '../components/Cell';
import { useStore, action } from '../store';


const Game = () => {
  const { config, game } = useStore();

  const _generate = () => {
    action.generatePlane()
    action.populatePlane()
  }

  useEffect(() => {
    game.status === 'not started' && _generate()
  }, [])

  const renderBoard = () => {
    if (!game.plane.length) return null
    return game.plane.map((row, rowIndex) => {
      return <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => {
          return (
            <Cell key={`${rowIndex}-${colIndex}`} cell={cell} onSelected={() => {
              if (cell.isMine) return action.setGameStatus('lost')
              if (!cell.isChecked) revealCell(game.plane, rowIndex, colIndex)
              cell.isChecked = true
            }} />
          )
        })}
      </div>
    });
  }

  return (
    <>
      <div className="minesweeper-header">
        <div className="config.numMines">{config.numMines}</div>
        <div className={`status ${game.status}`}>{game.status}</div>
        <button onClick={() => _generate()}>New Game</button>
      </div>
      <div className="minesweeper">
        <div className="board">{renderBoard()}</div>
      </div>
    </>
  );
};

export default Game;
