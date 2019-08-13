import React, { Component } from "react"
import ReactDOM from "react-dom"
import Monitor from "components/Monitor"
import Modal from "components/Modal"
import { GoPlus } from "react-icons/go"
import Constants from "style/Constants"
import HoverButton from "components/Buttons/HoverButton"
import "style/grid.css"
class App extends Component {
  constructor(props) {
    super(props)

    this.createMonitor = this.createMonitor.bind(this)
    this.removeMonitor = this.removeMonitor.bind(this)
    this.toggleModalHandler = this.toggleModalHandler.bind(this)

    this.state = {
      monitors: [],
      suggestions: [],
      modalShowing: true,
    }

    this.loadSuggestions()
  }

  async loadSuggestions() {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_API}/`)
    const json = await data.json()

    this.setState({
      suggestions: json,
    })
  }

  createMonitor(location, liveUpdate) {
    const newMonitors = this.state.monitors.concat({
      location,
      liveUpdate,
    })

    this.setState({
      monitors: newMonitors,
    })
  }

  removeMonitor(location) {
    console.log("REMOVE ", location)
    const newMonitors = this.state.monitors.filter(monitor => {
      console.log(monitor.location === location)
      return location !== monitor.location
    })

    console.log(newMonitors)

    this.setState({
      monitors: newMonitors,
    })
  }

  toggleModalHandler() {
    this.setState({
      modalShowing: !this.state.modalShowing,
    })
  }

  render() {
    const { monitors, suggestions } = this.state

    return (
      <div>
        <ul className="monitors">
          {monitors.map(({ location, liveUpdate }, index) => (
            <li key={location + index}>
              <Monitor
                location={location}
                liveUpdate={liveUpdate}
                removeMonitor={this.removeMonitor}
              />
            </li>
          ))}
        </ul>
        <Modal
          className="modal"
          show={this.state.modalShowing}
          close={this.toggleModalHandler}
          onSubmit={this.createMonitor}
          suggestions={suggestions}
        />
        <HoverButton
          outerStyle={{ ...style.position, ...style.modalButton }}
          hoverStyle={style.buttonHover}
          onClick={this.toggleModalHandler}
        >
          <GoPlus style={{ ...style.position, ...style.modalButtonSVG }} />
        </HoverButton>
      </div>
    )
  }
}

const style = {
  position: {
    right: 20,
    bottom: 20,
    position: "absolute",
  },
  modalButton: {
    background: Constants.lightBackground,
    border: 0,
    borderRadius: 50,
    color: "white",
    padding: 20,
    textAlign: "center",
    cursor: "pointer",
    width: 50,
    height: 50,
  },
  modalButtonSVG: {
    width: 35,
    height: 35,
    right: 7,
    bottom: 7,
  },
  buttonHover: {
    background: Constants.hoverBackground,
  },
}

ReactDOM.render(<App />, document.getElementById("root"))
