import React, { Component } from "react"
import Constants from "style/Constants"
import HoverButton from "components/Buttons/HoverButton"
import { GoX } from "react-icons/go"
import MyLocationPicker from "components/MyLocationPicker"
import MySlider from "components/Slider/MySlider"

class NewLocationModal extends Component {
  state = {
    area: true,
    radius: 2,
  }

  constructor(props) {
    super(props)
    this.toggleAreaUpdate = this.toggleAreaUpdate.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleAreaChange = this.handleAreaChange.bind(this)
    this.handleRandomChange = this.handleRandomChange.bind(this)
  }

  toggleAreaUpdate() {
    const { area } = this.state
    this.setState({
      area: !area,
    })
  }

  handleLocationChange({ position, address }) {
    // Set new location
    this.setState({ position, address })
  }

  handleAreaChange([radius]) {
    console.log(radius)
    // Set new radius
    this.setState({ radius })
  }

  handleRandomChange([ lowerBound, upperBound ]) {
    console.log(lowerBound, upperBound)
    // Set new random limits
    this.setState({ lowerBound, upperBound })
  }

  render() {
    const { area, radius } = this.state
    const { style, close, show } = this.props

    return (
      <div style={style}>
        <div
          className="modalAddLocation"
          style={{
            ...styles.containerStyle,
            transform: show ? "translateY(0vh)" : "translateY(-100vh)",
            opacity: show ? "1" : "0",
          }}
        >
          <div style={styles.header}>
            <span style={styles.headerText}>Create new simulation</span>
            <button style={styles.buttonStyle} onClick={close}>
              <GoX style={styles.crossStyle} />
            </button>
          </div>
          <div style={{ marginRight: 10, marginLeft: 10 }}>
            <div>
              <span>Initial Position:</span>
              <MyLocationPicker onChange={this.handleLocationChange} radius={radius} visible={area}/>
            </div>
            <div>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  name={"Area restriction"}
                  checked={area}
                  onChange={this.toggleAreaUpdate}
                  style={styles.checkbox}
                />
                {"Area restriction"}
              </label>
            </div>
            {area && (
              <div>
                <span>Area radius</span>
                <MySlider
                  domain={[1, 10]}
                  step={0.5}
                  values={[2]}
                  onChange={this.handleAreaChange}
                />
              </div>
            )}
            <div style={area ? styles.spacer : {}}>
              <span>Random bound</span>
              <MySlider
                domain={[-1, 1]}
                step={0.1}
                values={[-0.3, 0.3]}
                onChange={this.handleRandomChange}
              />
            </div>
          </div>
          <HoverButton
            outerStyle={styles.button}
            hoverStyle={styles.buttonHover}
            onClick={this.showSimulation}
          >
            <span>Run Simulation</span>
          </HoverButton>
        </div>
      </div>
    )
  }
}

const styles = {
  trackStyle: { height: 15 },
  thumbStyle: {
    position: "absolute",
    width: 30,
    height: 30,
    boxShadow: "0 0 2px rgba(0,0,0,.12),0 2px 4px rgba(0,0,0,.24)",
    display: "flex",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbStyleHover: { width: 32, height: 32 },
  containerStyle: {
    maxWidth: "minmax(300px, 1fr)",
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    background: "white",
    borderRadius: 6,
    margin: "10vh auto 10vh",
    transition: "all .8s",
    width: "40%",
    height: "80vh",
  },
  header: {
    background: Constants.lightBackground,
    height: "40px",
    lineHeight: "40px",
    padding: "5px 20px",
    paddingRight: 10,
    color: "white",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: "1em",
    display: "flex",
    justifyContent: "space-between",
  },
  headerText: {
    marginTop: 0,
    marginBottom: 0,
  },
  button: {
    width: "fit-content",
    padding: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "1em",
    border: 0,
    borderRadius: 3,
    background: Constants.lightBackground,
    color: "white",
    cursor: "pointer",
  },
  buttonHover: {
    background: Constants.hoverBackground,
  },
  label: {
    marginTop: "0.5em",
    display: "block",
  },
  text: {
    marginLeft: "0.2em",
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  errorStyle: {
    color: "red",
    paddingLeft: "0.2em",
    paddingTop: "0.2em",
    display: "block",
    fontStyle: "italic",
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
    padding: 0,
  },
  spacer: {
    marginTop: 50,
  },
}

export default NewLocationModal
