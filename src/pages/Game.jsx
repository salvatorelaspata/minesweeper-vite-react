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
            <Cell key={`${rowIndex}-${colIndex}`}
              y={rowIndex}
              x={colIndex}
              cell={cell}
              onSelected={() => {
                const isNOTLost = game.status !== 'lost'
                if (cell.isMine) action.setGameStatus('lost')
                else if (!cell.isChecked && isNOTLost) action.revealCell(rowIndex, colIndex)
                isNOTLost && action.setChecked(rowIndex, colIndex)
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
