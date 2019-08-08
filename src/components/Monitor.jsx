import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Table from "./Monitor/Table";
import MyChart from "./Monitor/MyChart";
import MyMap from "./Monitor/MyMap";
import Constants from "style/Constants";
import "react-tabs/style/react-tabs.css";

class Monitor extends React.Component {
  render() {
    const { charts, o2, misc, location = "Your Location", style } = this.props;

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
            marginBottom: "1em"
          }}
        >
          <div style={{ width: "50%" }}>
            <Tabs>
              <TabList>
                <Tab
                  style={{
                    fontSize: Constants.mediumText
                  }}
                >
                  Map
                </Tab>
                <Tab
                  style={{
                    fontSize: Constants.mediumText
                  }}
                >
                  Feeding
                </Tab>
              </TabList>

              <TabPanel style={{ height: "15em" }}>
                <MyMap style={{ height: "inherit" }} />
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
        <div>
          <Tabs>
            <TabList>
              {charts &&
                charts.map(({ name }, index) => (
                  <Tab key={index} style={{ fontSize: Constants.mediumText }}>
                    {name}
                  </Tab>
                ))}
            </TabList>

            {charts &&
              charts.map(({ data, yTitle, title }, index) => {
                if (data) {
                  return (
                    <TabPanel key={index}>
                      <MyChart
                        style={style}
                        title={title}
                        yTitle={yTitle}
                        data={data}
                      />
                    </TabPanel>
                  );
                } else {
                  return <TabPanel key={index}></TabPanel>;
                }
              })}
          </Tabs>{" "}
        </div>
      </div>
    );
  }
}

const headerStyle = {
  marginBottom: "0.5em"
};

const panelHeaderStyle = {
  paddingLeft: "0.5em",
  paddingRight: "0.5em",
  background: Constants.darkBackground,
  display: "flex",
  justifyContent: "space-between"
};

const monitorStyle = {
  fontFamily: Constants.fontFamily,
  background: Constants.lightBackground,
  color: Constants.whiteText,
  padding: "1em",
  paddingTop: "1em"
};

export default Monitor;
