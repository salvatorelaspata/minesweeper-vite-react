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
                action.revealChecked(rowIndex, colIndex)
              }}
              onSelected={() => {
                const isNOTLost = game.status !== GAME_STATUS.LOST
                if (cell.isMine) return action.setGameStatus(GAME_STATUS.LOST)
                else if (!cell.isChecked && isNOTLost) action.revealCell(rowIndex, colIndex)
                else console.log('cell is already checked')
                if (isNOTLost) {
                  action.setGameStatus(GAME_STATUS.STARTED)
                  action.setChecked(rowIndex, colIndex)
                }
              }} />
          )
        })}
      </div>
    });
  }

  const _statusIcon =
    game.status === GAME_STATUS.WON ? '😎'
      : game.status === GAME_STATUS.LOST ? '😒'
        : game.status === GAME_STATUS.NOT_STARTED ? '🥱'
          : '🙂'
  return (
    <>
      <div className="minesweeper-header">
        <div className="config numMines">{config.numMines}</div>
        <div className={`status ${game.status}`}>{_statusIcon}</div>
        <div className="new" onClick={() => { action.setGameStatus('started'); _generate() }}>New Game</div>
      </div>
      <div className="minesweeper">
        <div className="board">{renderBoard()}</div>
      </div>
    </>
  );
};

export default Game;
