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
  Legend,
} from "react-jsx-highcharts"
import Socket from "api/liveUpdate"
import "style/charts.css"

class App extends Component {
  _isMounted = false

  constructor(props) {
    super(props)
    this.updateLiveData = this.updateLiveData.bind(this)
    this.handleStartLiveUpdate = this.handleStartLiveUpdate.bind(this)
    this.handleStopLiveUpdate = this.handleStopLiveUpdate.bind(this)
    this.socket = new Socket()

    this.socket.socket.on("connect_error", e => {
      this.handleStopLiveUpdate()
    })

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
    this._isMounted = false
    this.socket.unsubscribeTo(this.location, err => this.handleStopLiveUpdate())
  }

  updateLiveData(messageReceived) {
    console.log("UPDATE")

    function addDataPoint(data, eraseOldest) {
      try {
        if (data) {
          let newTime, newValue
          if (!timestamp) {
            const [lastTime] = data[data.length - 1]
            const [last2Time] = data[data.length - 2]

            newTime = lastTime + (lastTime - last2Time)
          } else {
            newTime = timestamp
          }

          if (!value) {
            const [, lastValue] = data[data.length - 1]
            const [, last2Value] = data[data.length - 2]

            const inc = Math.random() < 0.5 ? 1 : -1
            newValue = parseFloat(
              (lastValue + (lastValue - last2Value) * inc).toFixed(2)
            )
          } else {
            newValue = value
          }

          const newPoint = [newTime, newValue]

          let newData = data.slice(eraseOldest ? 1 : 0) // 0 to Add, 1 to Delete Oldest Record
          newData = [...newData, newPoint]
          console.log(newData)

          return newData
        }
      } catch {}
      console.log(timestamp, value)
      return [[timestamp, value]]
    }

    const { updateLastUpdate } = this.props
    updateLastUpdate(new Date())

    if (!this.state.liveUpdate) this.setState({ liveUpdate: true })

    if (!messageReceived) {
      console.error(`Corrupted Message: ${messageReceived}`)
      return
    } else {
      console.log(`Message received ${messageReceived}`)
    }

    const [buoyID, timestamp, value] = JSON.parse(messageReceived)

    console.log([timestamp, value])

    if (this._isMounted) {
      const { data } = this.state
      console.log(data.length)
      const newData = data.map(({ name, data: buoyData }) => {
        if (name === buoyID) {
          buoyData = addDataPoint(buoyData, false)
        }

        return { name, data: buoyData }
      })

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
            backgroundColor: `rgb(${
              liveUpdate ? "72, 173, 72" : "234, 67, 53"
            })`,
          }}
        ></span>
        <HighchartsChart oneToOne={true} styledMode>
          <Chart zoomType="x" type="datetime" />
          <Title>{title}</Title>
          <Legend layout="vertical" align="right" verticalAlign="middle" />

          <Tooltip valueSuffix={yTitle ? ` ${yTitle}` : ""} shared />

          <XAxis type="datetime">
            {xTitle && <XAxis.Title>{xTitle}</XAxis.Title>}
          </XAxis>

          <YAxis>
            <YAxis.Title>{yTitle}</YAxis.Title>
            {data.map(({ name, data: dataBuoy }, index) => (
              <LineSeries data={dataBuoy} key={index} name={name} />
            ))}
          </YAxis>
        </HighchartsChart>
      </div>
    )
  }
}

const MyChart = withHighcharts(App, Highcharts)
export default MyChart
