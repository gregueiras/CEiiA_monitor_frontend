import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Table from "./Monitor/Table"
import MyMap from "./Monitor/MyMap"
import Constants from "style/Constants"
import "react-tabs/style/react-tabs.css"
import md5 from "md5"
import MyChartsTabs from "./Monitor/MyChartsTabs"
import MonitorHeader from "components/Monitor/MonitorHeader"

class Monitor extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...props, lastUpdate: null }
    this.updateTime = this.updateTime.bind(this)
  }

  componentDidMount() {
    const { location } = this.state
    this.loadData(location)
  }

  updateTime(date) {
    const { lastUpdate } = this.state
    const time = date.toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    })

    if (!lastUpdate || time > lastUpdate) {
      this.setState({ lastUpdate: time })
    }
  }

  async loadData(location) {
    const hash = md5(location).toUpperCase()
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/?wantedModule=${hash}`
    )

    const json = await data.json()

    this.setState({ ...json })
    const date = new Date()
    this.updateTime(date)
  }

  render() {
    const {
      charts,
      o2,
      misc,
      location,
      style,
      mapCenter,
      buoys,
      liveUpdate,
      lastUpdate,
      index,
    } = this.state

    const { removeMonitor } = this.props

    return (
      <div style={{ ...monitorStyle, ...style }}>
        <MonitorHeader
          location={location}
          close={removeMonitor}
          lastUpdate={lastUpdate}
          index={index}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginBottom: "1em",
          }}
        >
          <div style={{ width: "50%" }}>
            <Tabs>
              <TabList>
                <Tab
                  style={{
                    fontSize: Constants.mediumText,
                  }}
                >
                  Map
                </Tab>
                <Tab
                  style={{
                    fontSize: Constants.mediumText,
                  }}
                >
                  Feeding
                </Tab>
              </TabList>

              <TabPanel style={{ height: "15em" }}>
                <MyMap
                  style={{ height: "inherit" }}
                  mapCenter={mapCenter}
                  buoys={buoys}
                />
              </TabPanel>
              <TabPanel>
                <h2>Any content 2</h2>
              </TabPanel>
            </Tabs>
          </div>
          <div style={{ width: "50%" }}>
            {o2 && <Table data={o2.data} schema={o2.schema} />}
            {!o2 && (
              <p>
                No O<sub>2</sub> data
              </p>
            )}
            {misc && <Table data={misc.data} schema={misc.schema} />}
            {!misc && <p>No miscellaneous data</p>}
          </div>
        </div>
        <MyChartsTabs
          charts={charts}
          selectedTab={0}
          style={style}
          liveUpdate={liveUpdate}
          location={location}
          updateLastUpdate={this.updateTime}
        />
      </div>
    )
  }
}



const monitorStyle = {
  background: Constants.lightBackground,
  color: Constants.whiteText,
  padding: "1em",
  paddingTop: "1em",
}

export default Monitor
