import React, { useEffect } from 'react';
import Cell from '../components/Cell';
import { useStore, action } from '../store';

import './Game.css'
import { GAME_STATUS } from '../utils/constants';


const Game = () => {
  const { config, game } = useStore();

  const _generate = () => {
    action.generatePlane()
    action.populatePlane()
  }

  useEffect(() => {
    game.status === GAME_STATUS.NOT_STARTED && _generate()
  }, [])

  action.checkWin()

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
              onSelectedChecked={() => {
                console.log('cell is already checked')
                action.revealChecked(rowIndex, colIndex)
              }}
              onSelected={() => {
                const isNOTLost = game.status !== 'lost'
                if (cell.isMine) action.setGameStatus('lost')
                else if (!cell.isChecked && isNOTLost) action.revealCell(rowIndex, colIndex)
                else console.log('cell is already checked')
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
        <button onClick={() => { action.setGameStatus('started'); _generate() }}>New Game</button>
      </div>
      <div className="minesweeper">
        <div className="board">{renderBoard()}</div>
      </div>
    </>
  );
};

export default Game;
