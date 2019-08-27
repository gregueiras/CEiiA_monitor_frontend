import React, { Component } from "react"
import Constants from "style/Constants"
import HoverButton from "components/Buttons/HoverButton"
import { GoX } from "react-icons/go"
import FirstPage from "./NewSimulation/FirstPage"
import SecondPage from "./NewSimulation/SecondPage"

class NewSimulationModal extends Component {
  state = {
    area: true,
    radius: 2,
    activePage: 1,
  }

  constructor(props) {
    super(props)
    this.toggleAreaUpdate = this.toggleAreaUpdate.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleAreaChange = this.handleAreaChange.bind(this)
    this.handleRandomChange = this.handleRandomChange.bind(this)
    this.setPage = this.setPage.bind(this)
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
    // Set new radius
    this.setState({ radius })
  }

  handleRandomChange([lowerBound, upperBound]) {
    // Set new random limits
    this.setState({ lowerBound, upperBound })
  }

  setPage(activePage) {
    this.setState({ activePage })
  }

  render() {
    const { area, radius, activePage } = this.state
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
          <div style={{ flexGrow: 1 }}>
            {activePage === 0 && (
              <FirstPage
                radius={radius}
                area={area}
                handleLocationChange={this.handleLocationChange}
                toggleAreaUpdate={this.toggleAreaUpdate}
                handleAreaChange={this.handleAreaChange}
                handleRandomChange={this.handleRandomChange}
              />
            )}
            {activePage === 1 && <SecondPage />}
          </div>
          <div style={styles.buttonContainer}>
            <div style={styles.buttons}>
              {activePage === 1 && (
                <HoverButton
                  outerStyle={styles.button}
                  hoverStyle={styles.buttonHover}
                  onClick={() => this.setPage(0)}
                >
                  <span>Back</span>
                </HoverButton>
              )}
              <HoverButton
                outerStyle={{ marginLeft: "1em", ...styles.button }}
                hoverStyle={styles.buttonHover}
                onClick={
                  activePage === 1 ? this.showSimulation : () => this.setPage(1)
                }
              >
                <span>{activePage === 1 ? "Run Simulation" : "Next"}</span>
              </HoverButton>
            </div>
          </div>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "space-between",
    background: "white",
    borderRadius: 6,
    margin: "10vh auto 10vh",
    transition: "all .8s",
    width: "50%",
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
  text: {
    marginLeft: "0.2em",
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
  buttonContainer: {
    width: "100%",
    display: "flex",
  },
  buttons: {
    marginLeft: "auto",
    marginRight: "0.5em",
    display: "flex",
  },
}

export default NewSimulationModal
