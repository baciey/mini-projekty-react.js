import React from 'react';
import Square from './Square'

import goku from './img/goku.jpg'
import vegita from './img/vegita.jpg'
import bulma from './img/bulma.jpg'
import beerus from './img/beerus.jpg'
import buu from './img/buu.jpg'
import haiya from './img/haiya.jpg'
import picolo from './img/picolo.jpg'
import frieza from './img/frieza.jpg'
import mutenroshi from './img/mutenroshi.jpg'
import pilaf from './img/pilaf.jpg'




class Board extends React.Component {


  state = {
    nr: 0,
  }

  cardss = [goku, vegita, bulma, beerus, buu,
    haiya, picolo, frieza, mutenroshi, pilaf];
  cards = this.cardss.flatMap(card => [card, card])
    .sort(function (a, b) { return 0.5 - Math.random() });


  renderSquare(i) {
    let firstCard;
    let secondCard;
    let checked;
    let clicked;

    if (this.props.firstCard === i) {
      firstCard = 'clicked';
    }
    if (this.props.secondCard === i) {
      secondCard = 'clicked';
    }
    if (this.props.cards.length > 19) {
      if (this.props.cards[i].checked === 'checked') checked = 'checked'
      if (this.props.cards[i].clicked === true) clicked = true;

    }
    return (
      <Square
        imgSrc={this.cards[i]}
        key={i}
        firstCard={firstCard}
        secondCard={secondCard}
        onClick={(card) => this.props.onClick(card, i)}
        suspend={this.props.suspend}
        checked={checked}
        clicked={clicked}
      />
    );
  }
  imgLoad = () => {
    // console.log(this.state.nr);
    if (this.state.nr >= 10) return
    this.setState(() => ({ nr: this.state.nr + 1 }))
  }

  render() {

    const squares = [];
    for (let i = 0; i < 20; i++) {
      const square = this.renderSquare(i)
      squares.push(square)
    }
    return (
      <>
        <img style={{ display: 'none' }}
          onLoad={this.imgLoad}
          src={this.cardss[this.state.nr]} alt=""
        />
        {squares}
      </>
    );
  }
}

export default Board;

