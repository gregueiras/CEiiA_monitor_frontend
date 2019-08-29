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
            charts.map(({ data, yTitle, title, type, charts }, index) => {
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
              } else if (charts) {
                return (
                  <TabPanel key={index} style={styles.chartGrid}>
                    {charts.map(({ type, yTitle, title, data }, idx) => (
                      <MyChart
                        key={idx}
                        style={style}
                        title={title}
                        yTitle={yTitle}
                        data={data}
                        location={location}
                        type={type}
                        liveUpdate={liveUpdate}
                        updateLastUpdate={updateLastUpdate}
                      />
                    ))}
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

const styles = {
  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
    gridGap: "0.5em",
  }
}

export default MyChartsTabs
