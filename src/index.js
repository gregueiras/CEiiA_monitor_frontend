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

    let monitors

    try {
      monitors = JSON.parse(localStorage.getItem("monitors"))
      if (!monitors) monitors = []
    } catch (error) {
      monitors = []
    }
    this.state = {
      monitors: monitors,
    }
  }

  createMonitor(location, liveUpdate) {
    const { monitors: oldMonitors } = this.state

    const monitors = [
      ...oldMonitors,
      {
        location,
        liveUpdate,
      },
    ]

    this.setState({
      monitors,
    })
    localStorage.setItem("monitors", JSON.stringify(monitors))
    this.resizeCharts()
  }

  removeMonitor(index) {
    const newMonitors = this.state.monitors
    newMonitors.splice(index, 1)

    this.setState({
      monitors: newMonitors,
    })
    localStorage.setItem("monitors", JSON.stringify(newMonitors))
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
        <Modal createMonitor={this.createMonitor}/>
        <MyGrid monitors={monitors || []} removeMonitor={this.removeMonitor} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
