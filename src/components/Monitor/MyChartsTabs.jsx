import React, { Component } from "react"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs"
import MyChart from "components/Monitor/MyChart"
import Headers from "data/headers"
import Constants from "style/Constants"

class MyChartsTabs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 0,
    }
  }

  render() {
    const { selectedTab } = this.state
    const { charts, style, liveUpdate, location, updateLastUpdate } = this.props

    return (
      <div>
        <Tabs
          selectedIndex={selectedTab}
          onSelect={index => this.setState({ selectedTab: index })}
        >
          <TabList>
            {charts &&
              charts.map(({ type, name }, index) => (
                <Tab key={index} style={{ fontSize: Constants.mediumText }}>
                  {(!name && Headers[`${type.toLowerCase()}`]) || name}
                </Tab>
              ))}
          </TabList>

          {charts &&
            charts.map(({ data, yTitle, title, type }, index) => {
              if (data) {
                return (
                  <TabPanel key={index}>
                    <MyChart
                      style={style}
                      title={title}
                      yTitle={yTitle}
                      data={data}
                      location={location}
                      type={type}
                      liveUpdate={liveUpdate}
                      updateLastUpdate={updateLastUpdate}
                    />
                  </TabPanel>
                )
              } else {
                return <TabPanel key={index}></TabPanel>
              }
            })}
        </Tabs>{" "}
      </div>
    )
  }
}

export default MyChartsTabs
