import React, { Component } from "react"
import { Marker, InfoWindow } from "react-google-maps"

class MyMarker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isOpen: false,
    }
  }

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    })
  }

  handleToggleClose = () => {
    this.setState({
      isOpen: false,
    })
  }

  render() {
    const { lat, lng, name } = this.props

    return (
      <Marker
        key={name}
        position={{ lat: lat, lng: lng }}
        onClick={() => this.handleToggle()}
      >
        {
          this.state.isOpen &&
          <InfoWindow onCloseClick={this.handleToggleClose}>
            <span style={labelStyle}>{name}</span>
          </InfoWindow>
        }
      </Marker>

    )
  }
}

const labelStyle = {
  color: "#000",
}

export default MyMarker
