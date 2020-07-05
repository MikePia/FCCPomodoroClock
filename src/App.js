import React from 'react';
import './App.css';

const sessionName = 'Practicing'
const breakName = 'Take 5'

class App extends React.Component {
    constructor() {
        super()

        // activeState is ['running' | 'idle'] Indicates the session is ticking or not
        // workingState is [sessionName | breakName ] Indicates whether the session or the break timer is active.
        this.state = {
            breakLength: 5,
            sessionLength: 25,
            timeLeft: 1500,
            timerId: null,
            activeState: "idle",
            workingState: sessionName

        }
        this.handleClickBreakDown = this.handleClickBreakDown.bind(this);
        this.handleClickBreakUp = this.handleClickBreakUp.bind(this);
        this.handleClickSessionDown = this.handleClickSessionDown.bind(this);
        this.handleClickSessionUp = this.handleClickSessionUp.bind(this);
        this.handleStartStop = this.handleStartStop.bind(this);
        this.tick = this.tick.bind(this);
        this.handleReset = this.handleReset.bind(this);
    }

    handleClickBreakDown(e) {
        if (this.state.timerId === null) {
            if (this.state.breakLength >= 2) {
                this.setState({ breakLength: (this.state.breakLength - 1) })
                if (this.state.workingState === breakName) {
                    this.setState({ timeLeft: (this.state.breakLength - 1) * 60 })
                }
            }
        }
    }
    handleClickBreakUp(e) {
        if (this.state.timerId === null) {
            if (this.state.breakLength <= 59) {
                this.setState({ breakLength: (this.state.breakLength + 1) })
                if (this.state.workingState === breakName) {
                    this.setState({ timeLeft: (this.state.breakLength + 1) * 60 })
                }
            }
        }
    }
    handleClickSessionDown(e) {
        if (this.state.timerId === null) {
            if (this.state.sessionLength >= 2) {
                this.setState({ sessionLength: this.state.sessionLength - 1 })
                if (this.state.workingState === sessionName) {
                    this.setState({ timeLeft: (this.state.sessionLength - 1) * 60 })
                }
            }
        }
    }
    handleClickSessionUp(e) {
        if (this.state.timerId === null) {
            if (this.state.sessionLength <= 59) {
                this.setState({ sessionLength: this.state.sessionLength + 1 })
                if (this.state.workingState === sessionName) {
                    this.setState({ timeLeft: (this.state.sessionLength + 1) * 60 })
                }
            }
        }
    }

    handleStartStop(e) {
        let btext = e.target.innerText;
        if (btext === "Start") {
            if (this.state.timerId === null) {
                let tid = setInterval(this.tick, 250);
                this.setState({ timerId: tid })
            }
            e.target.innerText = "Stop";
        }
        else if (btext === "Stop") {
            if (this.state.timerId != null) {
                clearInterval(this.state.timerId)
                this.setState({ timerId: null })
            }
            e.target.innerText = "Start";
        }
    }

    tick() {
        // console.log(this.state.timeLeft, this.state.timeLeft === 0, this.state.timeLeft == 0)
        if (this.state.timeLeft === 0) {
            console.log("got 0 and " + this.state.workingState, sessionName)
            if (this.state.workingState === sessionName) {
                this.setState({ workingState: breakName })
                this.setState({ timeLeft: this.state.breakLength * 60 })
            } else if (this.state.workingState === breakName) {
                this.setState({ workingState: sessionName })
                this.setState({ timeLeft: this.state.sessionLength * 60 })
            }
        } else {
            this.setState({ timeLeft: this.state.timeLeft - 1 })
        }
    }

    handleReset() {
        if (this.state.timerId != null) {
            clearInterval(this.state.timerId)
            this.setState({ timerId: null })


            let stopOrStart = document.getElementById("start_stop")
            stopOrStart.innerText = "Start"
        }
        this.setState({ breakLength: 5 })
        this.setState({ sessionLength: 25 })
        this.setState({ timeLeft: 1500 })
        this.setState({ activeState: 'idle' })
        this.setState({ workingState: sessionName })
    }

    render() {
        let minLeft = Math.floor(this.state.timeLeft / 60) > 9 ? Math.floor(this.state.timeLeft / 60) : "0" + Math.floor(this.state.timeLeft / 60)
        let secLeft = (this.state.timeLeft % 60) > 9 ? this.state.timeLeft % 60 : "0" + this.state.timeLeft % 60
        let displayTime = minLeft + ":" + secLeft
        return (
            < div className="App" >
                <header className="App-header">
                    <div>
                        <div id="timer-label">{this.state.workingState}</div>

                        <span className="breakers" id="break-label">
                            <i className="fa fa-long-arrow-down fa-2x" onClick={this.handleClickBreakDown} id="break-decrement"></i>
                        Break Length  <span id="break-length">{this.state.breakLength}</span>
                            <i className="fa fa-long-arrow-up fa-2x" onClick={this.handleClickBreakUp} id="break-increment"></i> </span>
                        <span className="breakers" id="session-label">
                            <i className="fa fa-long-arrow-down fa-2x" onClick={this.handleClickSessionDown} id="session-decrement"></i>
                        Session Length  <span id="session-length">{this.state.sessionLength}</span>
                            <i className="fa fa-long-arrow-up fa-2x" onClick={this.handleClickSessionUp} id="session-increment"></i> </span>

                    </div>
                    <div className="Clock">

                        <div id="time-left">{displayTime}</div>

                    </div>
                    <div>
                        <span><button id="start_stop" onClick={this.handleStartStop}>Start</button></span>
                        <span><button id="reset" onClick={this.handleReset}>Reset</button></span>
                    </div>
                </header>
            </div >
        )
    }
}

export default App;
