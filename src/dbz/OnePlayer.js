import React, { Component } from 'react';
import Game from './Game'
import Ranking from './Ranking'



class OnePlayer extends Component {
  state = {
    x: 4,
    disactivateStartButton: true,
    fadeOut: false,
    name: '',
    ms: 0,
    sek: 0,
    min: 0,
    suspendAllOnClicks: true,
    permission: true,
    ranking: [],
    RankingON: false,
    errorMsg: '',
  }

  rounds = 10;

  componentDidMount() {
    fetch('/data/ranking.json')
      .then(response => response.json())
      .then(data => {
        this.setState({
          ranking: data.rank,
        })
      });
  }
  countDown321 = () => {
    const y = setTimeout(this.countDown321, 1000);
    this.setState({ x: this.state.x - 1 })
    if (this.state.x === 0) {
      clearTimeout(y);
      this.setState({ x: 'Start !' })
      this.start();
      return true;
    }
  }
  start = () => {
    if (this.state.disactivateStartButton) {
      this.setState({
        disactivateStartButton: false,
        fadeOut: true,
        suspendAllOnClicks: false,
      })
      const msTimer = () => {
        this.setState({ ms: this.state.ms + 1 })
        if (this.state.ms === 100) this.setState({ ms: 0 })
      }
      const sekTimer = () => {
        this.setState({ sek: this.state.sek + 1 })
        if (this.state.sek === 60) {
          this.setState({
            sek: 0,
            min: this.state.min + 1,
          })
        }
      }
      this.msIntervalIndex = setInterval(msTimer, 10);
      this.sekIntervalIndex = setInterval(sekTimer, 1000);
    }
  }

  blockPermission = () => {
    this.setState({ permission: false })
  }
  addToRank = (e) => {
    e.preventDefault();
    const { min, sek, ms, name, ranking } = this.state
    const nameTrim = name.trim().length

    if (nameTrim <= 1 || nameTrim > 10) {
      this.setState({ errorMsg: "2-10 znaków" })
      return;
    } else { this.setState({ errorMsg: "" }) }
    const item = {
      id: ranking.length,
      name: name,
      time: {
        min: min,
        sek: sek,
        ms: ms,
      }
    }
    const rankUpdated = [...ranking]
    rankUpdated.push(item)

    this.setState({
      ranking: rankUpdated,
      RankingON: true,
    })
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({
      name: value
    })
  }

  decreaseRoundCounter = () => {
    this.rounds = this.rounds - 1;
    if (this.rounds === 0) {
      clearInterval(this.msIntervalIndex);
      clearInterval(this.sekIntervalIndex);
      this.setState({})

    }
  }
  render() {
    const { min, sek, ms, x, RankingON, ranking, errorMsg } = this.state
    let classes = "";
    if (this.state.fadeOut) {
      classes = 'fadeOut';
    }

    const gameInfo =
      <div className="game-info-1player">
        <div className="timer">
          {`${min < 10 ? '0' + min : min}:${sek < 10 ? '0' + sek : sek}:${ms < 10 ? '0' + ms : ms}`}
        </div>
        <div className={"countdown " + classes}>
          {x === 4 ? null : x}
        </div>
        {x === 4 ? <button onClick={this.countDown321}>START</button> : null}
        {this.rounds === 0 && !RankingON ?
          <Form fn={this.addToRank}
            onchange={this.handleChange}
            name={this.state.name}
            errorMsg={errorMsg}
          /> : null}
        {RankingON ? <Ranking data={ranking} /> : null}
      </div>
    return (
      <div>
        <Game
          gameInfo={gameInfo}
          suspendAllOnClicks={this.state.permission ?
            this.state.suspendAllOnClicks : null}
          blockPermission={this.blockPermission}//1player
          decreaseRoundCounter={this.decreaseRoundCounter}//1player
          increaseRoundCounter={() => null}//2players
          addPoints={() => null}//2players
          RankingON={this.state.RankingON}
        />
      </div>);
  }
}

export default OnePlayer;

const Form = (props) => {
  return (
    <div>
      <form id="myForm">
        <input type="text" onChange={props.onchange}
          value={props.name} placeholder="Imię" name="name" id="name" />
        <button
          onClick={props.fn}
          id="saveButton"
          name="saveButton">
          Zapisz wynik
        </button>
        <span className="error">{props.errorMsg}</span>
      </form>
    </div>
  )
}
