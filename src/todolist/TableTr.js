import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const TableTr = (props) => {

  const { important, name, date, id, onClickRemove,
    onClickFn2, icon1, icon2, icon2Color } = props;
  let styles;
  if (important) styles = 'important';
  return (
    <tr>
      <td className={"left " + styles}>{name}</td>
      <td className="left">{date}</td>
      <td>
        <FontAwesomeIcon
          icon={icon1}
          size="lg"
          color="silver"
        />
        <div id={id}
          className="btn"
          onClick={onClickRemove}>
        </div>
      </td>
      <td>
        <FontAwesomeIcon
          icon={icon2}
          size="lg"
          color={icon2Color}
        />
        <div id={id}
          className="btn"
          onClick={onClickFn2}>
        </div>
      </td>
    </tr>
  );
}

export default TableTr;