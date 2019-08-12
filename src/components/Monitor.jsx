import React from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import Table from "./Monitor/Table"
import MyMap from "./Monitor/MyMap"
import Constants from "style/Constants"
import "react-tabs/style/react-tabs.css"
import md5 from "md5"
import MyChartsTabs from "./Monitor/MyChartsTabs";

class Monitor extends React.Component {
  constructor(props) {
    super(props)

    this.state = { ...props }
  }

  componentDidMount() {
    const { location } = this.state
    this.loadData(location)
  }

  async loadData(location) {
    const hash = md5(location).toUpperCase()
    const data = await fetch(
      `${process.env.REACT_APP_BACKEND_API}/?wantedModule=${hash}`
    )

    const json = await data.json()

    console.log(json)
    this.setState({ ...json})
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
    } = this.state

    return (
      <div style={{ ...monitorStyle, ...style }}>
        <div style={panelHeaderStyle}>
          <h2 style={headerStyle}>{location}</h2>
          <h5 style={{ ...headerStyle, fontWeight: 400 }}>
            Last Update: 12:40
          </h5>
        </div>
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
        <MyChartsTabs charts={charts} selectedTab={0} style={style} liveUpdate={liveUpdate} location={location}/>
      </div>
    )
  }
}

const headerStyle = {
  marginBottom: "0.5em",
}

const panelHeaderStyle = {
  paddingLeft: "0.5em",
  paddingRight: "0.5em",
  background: Constants.darkBackground,
  display: "flex",
  justifyContent: "space-between",
}

const monitorStyle = {
  fontFamily: Constants.fontFamily,
  background: Constants.lightBackground,
  color: Constants.whiteText,
  padding: "1em",
  paddingTop: "1em",
}

export default Monitor
