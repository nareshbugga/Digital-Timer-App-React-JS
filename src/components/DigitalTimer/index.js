// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {runningTime: false, time: 25, seconds: 0, newTime: 25}

  onPlay = () => {
    this.setState({runningTime: true})
    this.timerId = setInterval(this.playTime, 1000)
  }

  playTime = () => {
    const {newTime, seconds} = this.state
    if (newTime === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = newTime * 60 - 1 + seconds
      const inM = Math.floor(second / 60)
      const inS = second % 60
      this.setState({seconds: inS, newTime: inM})
    }
  }

  onPause = () => {
    this.setState({runningTime: false})
    clearInterval(this.timerId)
  }

  onReset = () => {
    clearInterval(this.timerId)
    this.setState({time: 25, newTime: 25, seconds: 0, runningTime: false})
  }

  onSubstr = () => {
    const {runningTime, time} = this.state
    if (!runningTime) {
      if (time > 1) {
        this.setState(prevState => ({
          time: prevState.time - 1,
          newTime:
            prevState.seconds === 0 ? prevState.newTime - 1 : prevState.newTime,
        }))
      }
    }
  }

  onAdd = () => {
    const {runningTime} = this.state
    if (!runningTime) {
      this.setState(prevState => ({
        time: prevState.time + 1,
        newTime:
          prevState.seconds === 0 ? prevState.newTime + 1 : prevState.newTime,
      }))
    }
  }

  render() {
    const {time, runningTime, seconds} = this.state
    let {newTime} = this.state
    if (!runningTime && seconds === 0) {
      newTime = time
    }
    const text =
      seconds > 9 ? `${newTime}:${seconds}` : `${newTime}:0${seconds}`
    return (
      <div className="bg">
        <h1>Digital Timer</h1>
        <div className="div-container">
          <div className="sub-container">
            <div className="display-time">
              <h1 className="time">{text}</h1>
              {runningTime ? (
                <p className="display-text">Running</p>
              ) : (
                <p className="display-text">Paused</p>
              )}
            </div>
          </div>
          <div className="function-event-container ">
            <div className="button">
              {runningTime ? (
                <div className="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                    alt="pause icon"
                    className="icon-image"
                  />
                  <button
                    type="button"
                    onClick={this.onPause}
                    className="display-text"
                  >
                    Pause
                  </button>
                </div>
              ) : (
                <div className="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                    alt="play icon"
                    className="icon-image"
                  />
                  <button
                    type="button"
                    onClick={this.onPlay}
                    className="display-text"
                  >
                    Start
                  </button>
                </div>
              )}
              <div className="button">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                  alt="reset icon"
                  className="icon-image"
                />
                <button
                  type="button"
                  onClick={this.onReset}
                  className="display-text"
                >
                  Reset
                </button>
              </div>
            </div>
            <p className="set-timer">Set Timer Limit</p>
            <div className="time-limit-container">
              <button
                type="button"
                className="plus-minus-icon"
                onClick={this.onSubstr}
              >
                -
              </button>
              <p className="set-time-box">{time}</p>
              <button
                type="button"
                className="plus-minus-icon"
                onClick={this.onAdd}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
