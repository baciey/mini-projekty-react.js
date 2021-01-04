import React, { Component } from 'react';
import Game from './Game'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'


class TwoPlayers extends Component {
  state = {
    showCards: false,
    firstName: '',
    secondName: '',
    errorMsg: '',
    roundCounter: 1,
    punkty1: 0,
    punkty2: 0,
  }

  handleChange = (e) => {
    const value = e.target.value
    this.setState({
      firstName: value,
    })
  }
  handleChange2 = (e) => {
    const value = e.target.value
    this.setState({
      secondName: value,
    })
  }
  handleClick = () => {
    const { firstName, secondName } = this.state
    const fn = firstName.trim().length
    const sn = secondName.trim().length

    if (fn <= 1 || fn > 10) {
      this.setState({
        errorMsg: "Niepoprawne imię 1 gracza"
      })
    } else {
      this.setState({
        errorMsg: "",
      })
      if (sn <= 1 || sn > 10) {
        this.setState({
          errorMsg: "Niepoprawne imię 2 gracza"
        })
      } else {
        this.setState({
          errorMsg: "",
          showCards: true,
        })
      }
    }


  }
  addPoints = () => {
    if (this.state.roundCounter % 2) {
      this.setState({ punkty1: this.state.punkty1 + 1 })
    } else {
      this.setState({ punkty2: this.state.punkty2 + 1 })
    }
  }
  increaseRoundCounter = () => {
    this.setState({
      roundCounter: this.state.roundCounter + 1,
    })
  }

  render() {

    const { showCards, firstName, secondName,
      errorMsg, roundCounter, punkty1, punkty2 } = this.state

    let classes1 = "";
    let classes2 = "";
    roundCounter % 2 ? classes1 = 'active' : classes2 = 'active'
    let winLose = "";
    let winLose2 = "";
    if (punkty1 || punkty2) {
      if (punkty1 > punkty2) {
        winLose = 'winner'
        winLose2 = 'loser'
      }
      else if (punkty1 < punkty2) {
        winLose2 = 'winner'
        winLose = 'loser'
      }
      else {
        winLose = 'deuce'
        winLose2 = 'deuce'
      }
    }
    const gameInfo = (
      <div className="infoBoard">
        <table>
          <tbody>
            <tr className={winLose}>
              <td className={'arrow ' + classes1}>
                <FontAwesomeIcon icon={faArrowCircleRight} /></td>
              <td>{firstName}</td>
              <td>{punkty1}</td>
            </tr>
            <tr className={winLose2}>
              <td className={'arrow ' + classes2}>
                <FontAwesomeIcon icon={faArrowCircleRight} /></td>
              <td>{secondName}</td>
              <td>{punkty2}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
    return (
      <>
        {showCards ? null :
          <div className="game-board-2players">
            <div className="formContainer">
              <Form
                onChange={this.handleChange}
                onChange2={this.handleChange2}
                value1={firstName}
                value2={secondName}
                errorMsg={errorMsg}
                click={this.handleClick}
              />
            </div>
          </div>}
        {showCards ?
          <div>
            <Game
              gameInfo={gameInfo}
              suspendAllOnClicks={false}
              blockPermission={() => null}//1player
              decreaseRoundCounter={() => null}//1player
              increaseRoundCounter={this.increaseRoundCounter}//2players
              addPoints={this.addPoints}//2players
            />
          </div> : null}
      </>
    );
  }
}

export default TwoPlayers;

class Form extends Component {
  state = {

  }
  render() {
    //const {firstName, secondName} = this.props
    return (
      <div className="form">
        <span >2-10 znaków</span>
        <input value={this.props.value1}
          onChange={this.props.onChange}
          placeholder="Imię 1 gracza" type="text" />
        <input value={this.props.value2}
          onChange={this.props.onChange2}
          placeholder="Imię 2 gracza" type="text" />
        <button onClick={this.props.click}>START</button>
        <span className="error">{this.props.errorMsg}</span>
      </div>
    )
  }
}