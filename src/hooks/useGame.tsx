import { useCallback, useEffect } from 'react';
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
    console.log('[useGame.tsx] useEffect')
    game.config.status === GAME_STATUS.NOT_STARTED && generate()

    const unsubscribePlane = subscribe(store.game.plane, () => {
      console.log('[useGame.tsx] plane changed')
      action.checkWin()
    })

    return () => {
      console.log('[useGame.tsx] unsubscribe')
      unsubscribePlane();
    }
  }, [])

  const renderBoard = () => {
    if (!game.plane.length) return null
    return game.plane.map((row, rowIndex) => {
      return <div className="row" key={rowIndex}>
        {row.map(({ x, y }, colIndex) => {
          return (
            <Cell key={`${rowIndex}-${colIndex}`} x={x} y={y} />
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