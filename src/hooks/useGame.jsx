import React, { useCallback, useEffect } from 'react';
import { GAME_STATUS } from '../utils/constants';
import { subscribe } from 'valtio';
import { useStore, action } from '../store';
import Cell from '../components/Cell';

export const useGame = () => {
  const { config, game, store } = useStore();

  const generate = useCallback(() => {
    action.generatePlane()
    action.popolatePlane()
  }, [])

  // check win
  useEffect(() => {
    console.log('[useGame.jsx] useEffect')
    game.config.status === GAME_STATUS.NOT_STARTED && generate()

    const unsubscribePlane = subscribe(store.game.plane, () => {
      console.log('[useGame.jsx] plane changed')
      action.checkWin()
    })

    return () => {
      console.log('[useGame.jsx] unsubscribe')
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
              cell={cell}
              onSelected={useCallback(() => {
                // LOST
                if (cell.isMine) return action.setGameStatus(GAME_STATUS.LOST)

                const isNOTLost = game.config.status !== GAME_STATUS.LOST

                if (!cell.isChecked && isNOTLost) action.revealCell(rowIndex, colIndex)
                else console.log('[useGame.jsx] cell is already checked')

                if (isNOTLost) {
                  action.setGameStatus(GAME_STATUS.STARTED)
                  action.setChecked(rowIndex, colIndex)
                }
              })} />
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