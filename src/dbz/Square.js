import React from 'react';

const Square = (props) => {
  const { checked, firstCard, secondCard, suspend, onClick,
    imgSrc, clicked } = props
  let classes = '';

  if (checked === 'checked') classes = 'checked';
  else {
    if (firstCard === 'clicked') classes = 'clicked'
    if (secondCard === 'clicked') classes = 'clicked'
  }

  return (


    <div className="flip-card"
      onClick={firstCard || secondCard ||
        suspend || checked ?
        null : () => onClick(imgSrc)}>
      <div className={"flip-card-inner " + classes}>
        <div className="flip-card-front">
        </div>
        <div className="flip-card-back"
          style={clicked === true ?
            { backgroundImage: `url(${imgSrc})` } : null}
        >
        </div>
      </div>
    </div>


  );
}

export default Square;
