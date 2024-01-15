import React, { useState, useEffect } from 'react';
import { subscribe } from 'valtio';
import { useStore } from '../store';
import { GAME_STATUS } from '../utils/constants';

import './Timer.css'

const Timer: React.FC = () => {
  const { store } = useStore();
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let intervalId;
    const unsubscribeStatus = subscribe(store.game.config, () => {
      // console.log('game status changed', store.game.config.status)
      if (store.game.config.status === GAME_STATUS.STARTED) {
        setSeconds(0);
        intervalId = setInterval(() => {
          setSeconds(seconds => seconds + 1);
        }, 1000);
      } else {
        clearInterval(intervalId);
      }
    })

    return () => {
      clearInterval(intervalId);
      unsubscribeStatus();
    }
  }, []);

  return (
    <div className='timer'>{seconds.toString().padStart(3, '0')}</div>
  );
}

export default Timer;
