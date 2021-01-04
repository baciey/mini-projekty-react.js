import React from 'react';
// import './css/form.sass';


const Form = (props) => {
  const { inputText, inputDate, inputCheckbox,
    onChange, onClick, error } = props;
  return (
    <div className="formWrap">
      <div className="form">
        <div>
          <label htmlFor="task">Nazwa zadania:</label>
          <input
            value={inputText}
            type="text"
            onChange={onChange}
            id="task"
          />
        </div>
        <div>
          <label htmlFor="date">Wykonać do:</label>
          <input
            type="date"
            id="date"
            value={inputDate}
            onChange={onChange} />
        </div>
        <div className="switchWrap">
          <div className="isImportant">Ważne?</div>
          <label className="switch">
            <input
              type="checkbox"
              className="checkbox"
              onChange={onChange}
              checked={inputCheckbox}
            />
            <span className="slider"></span>
          </label>
        </div>
        <div style={{ clear: 'both' }}></div>
        <button className="btnAdd" onClick={onClick} >Dodaj</button>
        <div className="error">{error}</div>
      </div>
    </div>
  );
}

export default Form;