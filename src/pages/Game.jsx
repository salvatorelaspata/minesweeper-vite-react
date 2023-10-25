import React, { useState, useEffect } from 'react';
import { generatePlane, populatePlane, revealCell } from '../hooks/main'

import './Game.css'
import Cell from '../components/Cell';


const Game = ({ rows, cols, bombs }) => {
  const [plane, setPlane] = useState([])
  const [{ column, row }, setPlaneSize] = useState({ column: cols, row: rows })
  const [minesCount, setMinesCount] = useState(bombs)
  const [gameStatus, setGameStatus] = useState('playing');

  const _generate = () => {
    const _plane = generatePlane(column, row)
    populatePlane(_plane, minesCount)
    setPlane(_plane)
  }

  useEffect(() => {
    _generate()
  }, [])

  const renderBoard = () => {
    if (!plane.length) return null
    return plane.map((row, rowIndex) => {
      return <div className="row" key={rowIndex}>
        {row.map((cell, colIndex) => {
          return (
            <Cell key={`${rowIndex}-${colIndex}`} cell={cell} onSelected={() => {
              if (cell.isMine) return setGameStatus('lost')
              if (!cell.isChecked) revealCell(plane, rowIndex, colIndex)
              cell.isChecked = true
            }} />
          )
        })}
      </div>
    });
  }

  return (
    <>
      <h1>Minesweeper</h1>
      <div className="minesweeper">
        <div className="header">
          <div className="bombs">{minesCount}</div>
          <div className={`status ${gameStatus}`}>{gameStatus}</div>
          <button onClick={() => _generate()}>New Game</button>
        </div>
        <div className="board">{renderBoard()}</div>
      </div>
    </>
  );
};

export default Game;
