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
import Socket from "api/liveUpdate"

class App extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.updateLiveData = this.updateLiveData.bind(this)
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this)
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this)
    this.socket = new Socket()

    this.state = {
      data: props.data,
      liveUpdate: props.liveUpdate,
      title: props.title,
      xTitle: props.xTitle,
      yTitle: props.yTitle,
      style: props.style,
    }

    this.location =
      props.location && props.type
        ? `${props.location}${props.type}`
        : `default`
  }

  componentDidMount() {
    this._isMounted = true
    if (this.props.liveUpdate) {
      this.handleStartLiveUpdate()
    }
  }

  componentWillUnmount() {
    console.log("UNMOUNT")
    this._isMounted = false
    this.socket.unsubscribeTo(this.location, err => this.handleStopLiveUpdate())
  }

  updateLiveData(messageReceived) {
    if (!messageReceived) {
      console.error(`Corrupted Message: ${messageReceived}`)
      return
    }

    const [location, timestamp, value] = JSON.parse(messageReceived)
    console.log(`Message Received: ${messageReceived}`)

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

    if (this._isMounted && this.location === location) {
      const { data } = this.state
      const newData = addDataPoint(data)

      this.setState({
        data: newData,
      })
    }
  }

  handleStartLiveUpdate(e) {
    this.socket.subscribeTo(this.location, (err, value) =>
      this.updateLiveData(value)
    )
    this.setState({
      liveUpdate: true,
    })
  }

  handleStopLiveUpdate(e) {
    e && e.preventDefault()
    this.setState({
      liveUpdate: false,
    })
  }

  render() {
    const { liveUpdate, title, xTitle, yTitle, data, style } = this.state

    const liveUpdateStyle = {
      height: "18px",
      width: "18px",
      position: "absolute",
      borderRadius: "50%",
      zIndex: 1,
      top: 0,
      right: 0,
      marginRight: "0.5em",
      marginTop: "0.5em",
    }

    return (
      <div className="app" style={{ ...style, position: "relative" }}>
        <span
          style={{
            ...liveUpdateStyle,
            backgroundColor: `rgb(${liveUpdate ? "72, 173, 72" : "234, 67, 53"})`,
          }}
        ></span>
        <HighchartsChart oneToOne={true}>
          <Chart zoomType="x" type="datetime" />
          <Title>{title}</Title>

          <Tooltip valueSuffix={yTitle ? ` ${yTitle}` : ""} shared />

          <XAxis type="datetime">
            {xTitle && <XAxis.Title>{xTitle}</XAxis.Title>}
          </XAxis>

          <YAxis>
            <YAxis.Title>{yTitle}</YAxis.Title>
            {data.map(({ name, data: dataBuoy }) => <LineSeries data={dataBuoy} key={name} name={name}/>)}
          </YAxis>
        </HighchartsChart>
      </div>
    )
  }
}

const MyChart = withHighcharts(App, Highcharts)
export default MyChart
