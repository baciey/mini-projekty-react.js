import React from 'react';
import Board from './Board'


class Game extends React.Component {

  state = {
    firstCardClicked: '',
    secondCardClicked: '',
    cards: [],
  }
  firstOrSecond = false;
  firstCard = '';
  secondCard = '';
  suspendAllOnClicks = this.props.suspendAllOnClicks;



  handleClick = (card, i) => {
    this.firstOrSecond = !this.firstOrSecond;
    const cards = [...this.state.cards]
    //first click
    if (this.firstOrSecond === true) {
      cards[i].clicked = true;
      this.firstCard = card
      this.setState({ firstCardClicked: i, cards })
    }
    else {
      //second click
      cards[i].clicked = true;
      this.secondCard = card
      this.suspendAllOnClicks = true;
      this.setState({ secondCardClicked: i, cards })
      this.checkWinner();
    }
  }

  checkWinner = () => {
    if (this.firstCard === this.secondCard) {
      this.props.addPoints();//2players
      //good answer
      setTimeout(() => {
        this.suspendAllOnClicks = false;
        let cards = [...this.state.cards];
        cards[this.state.firstCardClicked].checked = 'checked';
        cards[this.state.secondCardClicked].checked = 'checked';
        this.setState({
          firstCardClicked: '',
          secondCardClicked: '',
          cards,
        })
      }, 2000)
      this.props.decreaseRoundCounter();//1player
    } //bad answer
    else {
      setTimeout(() => {
        this.props.increaseRoundCounter();//2players
        this.suspendAllOnClicks = false;
        this.setState({
          firstCardClicked: '',
          secondCardClicked: '',
        })
      }, 2000)
    }
  }
  createCards = () => {
    const cards = [];
    for (let i = 0; i < 20; i++) {
      const obj = { clicked: null, checked: null };
      cards.push(obj);
    }
    this.setState({ cards })
  }
  checkSuspend = () => {
    if (this.props.suspendAllOnClicks === false) {
      this.suspendAllOnClicks = false;
      this.props.blockPermission();
    }
  }
  componentDidUpdate() {
    this.checkSuspend();
  }
  componentDidMount() {
    this.createCards();
  }

  render() {
    return (
      <div className="game">
        {!this.props.RankingON ? 
        <div className="game-board">
          <Board
            firstCard={this.state.firstCardClicked}
            secondCard={this.state.secondCardClicked}
            onClick={(card, i) => this.handleClick(card, i)}
            suspend={this.suspendAllOnClicks}
            cards={this.state.cards}
          />
        </div> : null}
        <div className="game-info">
          {this.props.gameInfo}
        </div>
      </div>
    );
  }
}
export default Game;