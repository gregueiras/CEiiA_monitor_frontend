import React, { Component } from "react"
import ReactDOM from "react-dom"
import Modal from "components/Modal"
import "style/grid.css"
import MyGrid from "components/MyGrid"
class App extends Component {
  constructor(props) {
    super(props)

    this.createMonitor = this.createMonitor.bind(this)
    this.removeMonitor = this.removeMonitor.bind(this)

    this.state = {
      monitors: [],
    }
  }

  createMonitor(location, liveUpdate) {
    const newMonitors = this.state.monitors.concat({
      location,
      liveUpdate,
    })

    this.setState({
      monitors: newMonitors,
    })
    this.resizeCharts()
  }

  removeMonitor(index) {
    const newMonitors = this.state.monitors
    newMonitors.splice(index, 1)

    this.setState({
      monitors: newMonitors,
    })
    this.resizeCharts()
  }

  resizeCharts() {
    setTimeout(() => window.dispatchEvent(new Event("resize")), 10)
    setTimeout(() => window.dispatchEvent(new Event("resize")), 500)
  }

  render() {
    const { monitors } = this.state

    return (
      <div>
        <Modal createMonitor={this.createMonitor} />
        <MyGrid monitors={monitors} removeMonitor={this.removeMonitor} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
