import React, { useCallback, useEffect } from 'react';
import { GAME_STATUS } from '../utils/constants';
import { subscribe } from 'valtio';
import { useStore, action } from '../store';
import Cell from '../components/Cell';

export const useGame = () => {
  const { config, game, store } = useStore();

  const generate = useCallback(() => {
    action.generatePlane()
    action.populatePlane()
  }, [])

  useEffect(() => {
    console.log('useEffect')
    game.config.status === GAME_STATUS.NOT_STARTED && generate()

    const unsubscribePlane = subscribe(store.game.plane, () => {
      console.log('plane changed')
      action.checkWin()
    })

    return () => {
      console.log('unsubscribe')
      unsubscribePlane();
    }
  }, [store.game.plane])

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

  const reset = () => {
    action.setGameStatus(GAME_STATUS.NOT_STARTED)
    generate()
  }

  return {
    config,
    game,
    renderBoard,
    reset
  }
}