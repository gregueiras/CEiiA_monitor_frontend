import React, { Component } from "react"
import { GoX } from "react-icons/go"
import Constants from "style/Constants"

class MonitorHeader extends Component {
  render() {
    const { close, index, location, lastUpdate } = this.props

    return (
      <div style={style.panelHeaderStyle}>
        <h2 style={style.headerStyle}>{location}</h2>
        <div style={{ display: "flex" }}>
          <h5 style={{ ...style.headerStyle, fontWeight: 400 }}>
            Last Update: {lastUpdate ? lastUpdate : "Never"}
          </h5>
          <button style={style.buttonStyle} onClick={() => close(index)}>
            <GoX style={style.crossStyle} />
          </button>
        </div>
      </div>
    )
  }
}

const style = {
  headerStyle: {
    marginBottom: "0.5em",
  },

  panelHeaderStyle: {
    paddingLeft: "0.5em",
    paddingRight: "0.5em",
    background: Constants.darkBackground,
    display: "flex",
    justifyContent: "space-between",
  },

  crossStyle: {
    verticalAlign: "middle",
    fontSize: 40,
  },

  buttonStyle: {
    background: "none",
    border: "none",
    color: "#FFF",
    cursor: "pointer",
  },
}

export default MonitorHeader
