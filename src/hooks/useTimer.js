// create react js timer hook

import { useState, useEffect } from 'react';

export const useTimer = (initialState = 0) => {
  const [timer, setTimer] = useState(initialState);
  const [intervalId, setIntervalId] = useState(null);

  // implement start, stop, pause, reset
  const start = () => {
    setIntervalId(setInterval(() => {
      setTimer(timer => timer + 1);
    }, 1000))
  };

  const stop = () => {
    clearInterval(intervalId);
  };

  const reset = () => {
    setTimer(0);
  };

  return { timer, start, stop, reset };
}
