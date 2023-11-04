import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';
import { useStore, action } from '../store';

import './Game.css'
import { GAME_STATUS } from '../utils/constants';
import { subscribe } from 'valtio';
import Timer from '../components/Timer';


const Game = () => {
  const [timer, setTimer] = useState(0)
  const { config, game, store } = useStore();

  const _generate = () => {
    action.generatePlane()
    action.populatePlane()
  }

  useEffect(() => {
    game.config.status === GAME_STATUS.NOT_STARTED && _generate()

    const unsubscribePlane = subscribe(store.game.plane, () => {
      action.checkWin()
    })

    return () => {
      unsubscribePlane();
    }
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
              onSelectedChecked={() => {
                action.revealChecked(rowIndex, colIndex)
              }}
              onSelected={() => {
                const isNOTLost = game.config.status !== GAME_STATUS.LOST
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
    game.config.status === GAME_STATUS.WON ? '😎'
      : game.config.status === GAME_STATUS.LOST ? '😒'
        : game.config.status === GAME_STATUS.NOT_STARTED ? '🥱'
          : '🙂'
  return (
    <>
      <div className="minesweeper-header">
        <div className="numMines">{config.numMines}</div>
        <button className="status" onClick={() => { action.setGameStatus(GAME_STATUS.NOT_STARTED); _generate() }}>
          {_statusIcon}
        </button>
        <Timer />

        {/* <div className="new" onClick={() => { action.setGameStatus('started'); _generate() }}>New Game</div> */}
      </div>
      <div className="minesweeper">
        <div className="board">{renderBoard()}</div>
      </div>
    </>
  );
};

export default Game;
