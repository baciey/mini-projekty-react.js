import React from 'react';
// import './css/tables.sass';


const Table = (props) => {
  return (
    <table>
      <thead>
        <tr>
          <th >{props.cols[0]}</th>
          <th >{props.cols[1]}</th>
          <th style={props.styles[0]}>{props.cols[2]}</th>
          <th style={props.styles[1]}>{props.cols[3]}</th>
        </tr>
      </thead>
      <tbody>
        {props.tasks}
      </tbody>
    </table>
  );
}

export default Table;