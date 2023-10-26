import React, { useState } from 'react';
import './Settings.css'
import { action, useStore } from '../store';
import { STANDARD_CONFIG } from '../utils/constants';
function Settings () {
  const { config } = useStore();
  const [formValues, setFormValues] = useState({
    difficulty: config.difficulty,
    boardCol: STANDARD_CONFIG['easy'].boardCol,
    boardRow: STANDARD_CONFIG['easy'].boardRow,
    numMines: STANDARD_CONFIG['easy'].numMines,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, difficulty: 'custom', [name]: value });
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
          <label className='settings-label'>Board size:</label>
          <input className="settings-input" type="text" name="boardCol" value={formValues.boardCol} onChange={handleInputChange} />
          <input className="settings-input" type="text" name="boardRow" value={formValues.boardRow} onChange={handleInputChange} />
        </div>
        <div className='settings-input-container'>
          <label className='settings-label'>Number of mines:</label>
          <input className="settings-input" type="text" name="numMines" value={formValues.numMines} onChange={handleInputChange} />
        </div>
        <button className="settings-submit" type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Settings;
