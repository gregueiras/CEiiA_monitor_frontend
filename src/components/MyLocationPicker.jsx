import React, { Component } from "react"
import LocationPicker from "react-location-picker"

class MyLocationPicker extends Component {
  render() {
    const { onChange, radius, visible, defaultPosition } = this.props
    return (
      <div>
        <div>
          <LocationPicker
            containerElement={<div />}
            mapElement={<div style={{ height: "30vh" }} />}
            defaultPosition={defaultPosition}
            onChange={onChange}
            circleOptions={{
              radius: radius * 1000,
              fillColor: "#ea4335",
              fillOpacity: 0.6,
              strokeColor: "#811411",
              strokeWeight: 1,
              strokeOpacity: 1,
              visible,
            }}
          />
        </div>
      </div>
    )
  }
}

export default MyLocationPicker
