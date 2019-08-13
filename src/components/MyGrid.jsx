import React from "react"
import Monitor from "./Monitor"
class MyGrid extends React.Component {
  render() {
    const { monitors, removeMonitor } = this.props
    return (
      <ul className="monitors">
        {monitors.map(({ location, liveUpdate }, index) => (
          <li key={location + index}>
            <Monitor
              location={location}
              liveUpdate={liveUpdate}
              removeMonitor={removeMonitor}
              index={index}
            />
          </li>
        ))}
      </ul>
    )
  }
}

export default MyGrid
