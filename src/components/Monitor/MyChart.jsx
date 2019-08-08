import React, { Component } from "react"
import Highcharts from "highcharts"
import {
  HighchartsChart,
  Chart,
  withHighcharts,
  XAxis,
  YAxis,
  Title,
  LineSeries,
  Tooltip,
} from "react-jsx-highcharts"
import { subscribeTo, unsubscribeTo } from "api/liveUpdate"

class App extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.updateLiveData = this.updateLiveData.bind(this)
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this)
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this)
    this.chart = null

    this.state = {
      data: props.data,
      liveUpdate: props.liveUpdate,
      title: props.title,
      xTitle: props.xTitle,
      yTitle: props.yTitle,
      style: props.style,
      timestamp: "no timestamp yet",
    }

    this.location = props.location ? props.location : "default"
  }

  componentDidMount() {
    this._isMounted = true
    subscribeTo(this.location, (err, value) =>
      this.handleStartLiveUpdate(value)
    )
  }

  componentWillUnmount() {
    console.log("UNMOUNT")
    this._isMounted = false
    unsubscribeTo(this.location, err => this.handleStopLiveUpdate())
  }

  updateLiveData(messageReceived) {
    if (!messageReceived) {
      console.error(`Corrupted Message: ${messageReceived}`)
      return
    }

    const [timestamp, value] = messageReceived
    console.log(timestamp, value)

    function addDataPoint(data) {
      try {
        if (data) {
          const [lastTime, lastValue] = data[data.length - 1]
          const [last2Time, last2Value] = data[data.length - 2]

          const newPoint = []
          let inc = Math.random() < 0.5 ? 1 : -1

          const newTime = timestamp
            ? timestamp
            : lastTime + (lastTime - last2Time)

          const newValue = value
            ? value
            : parseFloat(
                (lastValue + (lastValue - last2Value) * inc).toFixed(2)
              )

          newPoint.push(newTime)
          newPoint.push(newValue)
          let newData = data.slice(0) // 0 to Add, 1 to Delete Oldest Record
          newData = [...newData, newPoint]
          return newData
        }
      } catch {}
    }

    if (this._isMounted) {
      const { data } = this.state
      const newData = addDataPoint(data)

      this.setState({
        data: newData,
      })
    }
  }

  handleStartLiveUpdate(e) {
    this.setState({
      liveUpdate: true,
    })

    try {
      if (e) {
        this.updateLiveData(JSON.parse(e))
      }
    } catch {
      console.warn(e)
    }
  }

  handleStopLiveUpdate(e) {
    e && e.preventDefault()
    this.setState({
      liveUpdate: false,
    })
  }

  render() {
    const { liveUpdate, title, xTitle, yTitle, data, style } = this.state

    return (
      <div className="app" style={style}>
        <HighchartsChart oneToOne={true}>
          <Chart zoomType="x" type="datetime" />
          <Title>{title}</Title>

          <Tooltip valueSuffix={yTitle ? ` ${yTitle}` : ""} shared />

          <XAxis type="datetime">
            {xTitle && <XAxis.Title>{xTitle}</XAxis.Title>}
          </XAxis>

          <YAxis>
            <YAxis.Title>{yTitle}</YAxis.Title>
            <LineSeries data={data} />
          </YAxis>
        </HighchartsChart>
        <div>
          {!liveUpdate && (
            <button
              className="btn btn-success"
              onClick={this.handleStartLiveUpdate}
            >
              Live update
            </button>
          )}
          {liveUpdate && (
            <button
              className="btn btn-danger"
              onClick={this.handleStopLiveUpdate}
            >
              Stop update
            </button>
          )}
        </div>
      </div>
    )
  }
}

const MyChart = withHighcharts(App, Highcharts)
export default MyChart
