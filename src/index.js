import React, { Component } from "react"
import ReactDOM from "react-dom"
import Monitor from "components/Monitor"
import "style/grid.css"
import Autocomplete from "components/Autocomplete"

class App extends Component {
  constructor(props) {
    super(props)

    this.createMonitor = this.createMonitor.bind(this)
    this.removeMonitor = this.removeMonitor.bind(this)

    this.state = {
      monitors: [],
      suggestions: [],
      modalShowing: false,
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

  openModalHandler = () => {
    this.setState({
      modalShowing: true,
    })
  }

  closeModalHandler = () => {
    this.setState({
      modalShowing: false,
    })
  }

  render() {
    const { monitors, suggestions } = this.state

    return (
      <>
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
        <button className="open-modal-btn" onClick={this.openModalHandler} style={{position: "absolute", right: 20, bottom: 20}}>
          Open Modal
        </button>
        <Autocomplete
          className="modal"
          show={this.state.modalShowing}
          close={this.closeModalHandler}
          onSubmit={this.createMonitor}
          suggestions={suggestions}
        />
      </>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
