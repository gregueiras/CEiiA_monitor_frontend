import React, { Component } from "react"
import LoadingBar from "react-top-loading-bar"

const timeInterval = 0.3 * 1000
const totalTime = 30 * 1000

export default class SimulationResult extends Component {
  state = {
    loadingBarProgress: 0,
    intervalID: null,
  }

  timer = () => {
    const { loadingBarProgress, intervalID } = this.state
    const newValue = loadingBarProgress + (100 * timeInterval) / totalTime

    if (newValue >= 100) {
      clearInterval(intervalID)
      this.setState({ loadingBarProgress: 0 })
    } else {
      this.setState({ loadingBarProgress: newValue })
    }
  }

  componentDidMount() {
    var intervalId = setInterval(this.timer, timeInterval)
    // store intervalId in the state so it can be accessed later:
    this.setState({ intervalID: intervalId })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID)
  }

  onLoaderFinished = () => {
    this.setState({ loadingBarProgress: 0 })
  }

  render() {
    const { simulationResult, simulationDone } = this.props

    return (
      <div>
        {!simulationDone && (
          <LoadingBar
            progress={this.state.loadingBarProgress}
            height={6}
            color="#ea4335"
            onLoaderFinished={() => this.onLoaderFinished()}
          />
        )}
        {simulationResult && (
          <div>
            <p>{simulationResult.data}</p>
          </div>
        )}
      </div>
    )
  }
}
