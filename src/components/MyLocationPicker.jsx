import React, { Component } from "react"
import LocationPicker from "react-location-picker"

/* Default position */
const defaultPosition = {
  lat: 32.6729618,
  lng: -16.688149,
}

class MyLocationPicker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      position: {
        lat: 0,
        lng: 0,
      },
    }

    // Bind
  }
  render() {
    const { onChange, radius, visible } = this.props
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
