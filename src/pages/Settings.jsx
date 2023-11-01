import React, { useState } from 'react';
import './Settings.css'
import { action, useStore } from '../store';
import { STANDARD_CONFIG } from '../utils/constants';
function Settings () {
  const { config } = useStore();
  const [formValues, setFormValues] = useState({
    difficulty: config.difficulty,
    boardCol: config.boardCol,
    boardRow: config.boardRow,
    numMines: config.numMines,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, difficulty: 'custom', [name]: parseInt(value || 0) });
  };

  const handleInputChangeSelect = (event) => {
    const { name, value } = event.target;
    if (value === 'custom') return setFormValues({ ...formValues, difficulty: value });
    setFormValues({
      ...formValues,
      [name]: value,
      boardCol: STANDARD_CONFIG[value].boardCol,
      boardRow: STANDARD_CONFIG[value].boardRow,
      numMines: STANDARD_CONFIG[value].numMines
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    action.setConfig(formValues)
  };

  return (
    <div className='settings-container'>
      <form className="settings-form" onSubmit={handleSubmit}>
        <div className='settings-input-container'>
          <label className='settings-label'>Difficulty level:</label>
          <select className="settings-input" name="difficulty" value={formValues.difficulty} onChange={handleInputChangeSelect}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
            <option value="custom">Custom</option>
          </select>
        </div>
        <div className='settings-input-container'>
          <label><span className='settings-label'>Board size </span>(Columns):</label>
          <input className="settings-input" type="text" name="boardCol" value={formValues.boardCol} onChange={handleInputChange} />
          <label><span className='settings-label'>Board size </span>(Rows):</label>
          <input className="settings-input" type="text" name="boardRow" value={formValues.boardRow} onChange={handleInputChange} />
        </div>
        <div className='settings-input-container'>
          <label className='settings-label'>Number of mines:</label>
          <input className="settings-input" type="text" name="numMines" value={formValues.numMines} onChange={handleInputChange} />
        </div>
        <button className="settings-submit" type="submit">Submit</button>
      </form>
      {/* Legend */}
      <div className='legend'>
        <h1>Legend</h1>
        <table>
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Board Size (Columns)</th>
              <th>Board Size (Rows)</th>
              <th>Mines</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries({
              ...STANDARD_CONFIG,
              ...{
                custom: {
                  boardCol: 'custom',
                  boardRow: 'custom',
                  numMines: 'custom'
                }
              }
            }).map(([key, value]) => {
              return (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{value.boardCol}</td>
                  <td>{value.boardRow}</td>
                  <td>{value.numMines}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Settings;
