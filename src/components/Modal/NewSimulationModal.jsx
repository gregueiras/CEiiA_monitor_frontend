import React, { Component } from "react"
import Constants from "style/Constants"
import HoverButton from "components/Buttons/HoverButton"
import { GoX } from "react-icons/go"
import FirstPage from "./NewSimulation/FirstPage"
import SecondPage from "./NewSimulation/SecondPage"
import encodeForAjax from "api/util"

class NewSimulationModal extends Component {
  static defaultLeg = { engine: true, turn: 0, velocity: 0, time: 1 }

  state = {
    area: true,
    radius: 2,
    activePage: 1,
    legs: [
      { engine: false, turn: 0, velocity: 0, time: 6 },
      { engine: true, turn: 30, velocity: 2, time: 0.75 },
      { engine: true, turn: 0, velocity: 2, time: 5 },
    ],
    lowerBound: -0.3,
    upperBound: 0.3,
    longitude: -9.504377,
    latitude: 40.765354,
    address: "Portugal",
  }

  toggleAreaUpdate = () => {
    const { area } = this.state
    this.setState({
      area: !area,
    })
  }

  handleLocationChange = ({ position, address }) => {
    console.log(position)
    console.log(address)
    const { lat: latitude, lng: longitude } = position
    // Set new location
    this.setState({ latitude, longitude, address })
  }

  handleAreaChange = ([radius]) => {
    // Set new radius
    this.setState({ radius })
  }

  handleRandomChange = ([lowerBound, upperBound]) => {
    // Set new random limits
    this.setState({ lowerBound, upperBound })
  }

  setPage = activePage => {
    this.setState({ activePage })
  }

  handleTimeChange = (selectedTime, idx) => {
    const time = selectedTime.target.value
    const { legs } = this.state
    legs[idx].time = time

    this.setState({ legs })
  }

  handleEngineChange = idx => {
    const { legs } = this.state

    const { engine, time } = legs[idx]
    legs[idx].engine = !engine
    legs[idx].time = engine ? time / 60 : time * 60

    this.setState({ legs })
  }

  handleTurnChange = (selectedTurn, idx) => {
    const turn = Number(selectedTurn.target.value)
    const { legs } = this.state
    legs[idx].turn = turn

    if (turn !== 0) {
      legs[idx].velocity = 2
    }

    this.setState({ legs })
  }

  handleVelocityChange = ([velocity], idx) => {
    const { legs } = this.state
    legs[idx].velocity = velocity

    this.setState({ legs })
  }

  removeLeg = idx => {
    const { legs } = this.state
    legs.splice(idx, 1)

    this.setState({ legs })
  }

  addLeg = () => {
    const { legs } = this.state
    const newLeg = JSON.parse(JSON.stringify(NewSimulationModal.defaultLeg))

    this.setState({ legs: [...legs, newLeg] })
  }

  showSimulation = async () => {
    const driftingTimeStep = 0.0625 //1.5 hours
    const engineTurnTimeStep = 1 / (24 * 60 * 12) // 5 seconds
    const engineStraightTimeStep = 1 / (24 * 60) // 1 minute

    const turnDegree = Math.PI / 6 // 30 degrees

    const {
      legs,
      area,
      radius,
      lowerBound,
      upperBound,
      latitude,
      longitude,
    } = this.state

    const timeSteps = [driftingTimeStep / 90]
    const timeJumps = [1]
    const turns = []
    const velocities = []

    //time is in minutes if engine, hours otherwise
    legs.forEach(({ engine, turn, velocity, time }) => {
      let jump = null
      let timeDays = time / 24

      if (engine) {
        timeDays /= 60
        if (turn === 0) {
          jump = engineStraightTimeStep
        } else {
          jump = engineTurnTimeStep
        }
      } else {
        jump = driftingTimeStep
      }

      timeJumps.push(jump)
      timeSteps.push(Math.round(timeDays / jump))

      turns.push(turn)
      velocities.push(velocity)
    })

    const url = new URL(`${process.env.REACT_APP_BACKEND_API}/simulation?`)
    const params = {
      time_jumps: timeJumps,
      time_steps: timeSteps,
      turns,
      velocity: velocities,
      area,
      radius,
      randomLowerBound: lowerBound,
      randomUpperBound: upperBound,
      latitude,
      longitude,
      reCalc: true,
    }

    let request = new XMLHttpRequest()
    request.open("get", url + encodeForAjax(params), true)
    request.send()

    request.onreadystatechange = evt => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          console.log(JSON.parse(request.responseText))
        } else console.log("ERROR STATUS")
      }
    }
  }

  render() {
    const { area, radius, activePage, legs, latitude, longitude } = this.state
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
                defaultPosition={{ lat: latitude, lng: longitude }}
              />
            )}
            {activePage === 1 && (
              <SecondPage
                handleTimeChange={this.handleTimeChange}
                handleEngineChange={this.handleEngineChange}
                handleTurnChange={this.handleTurnChange}
                handleVelocityChange={this.handleVelocityChange}
                removeLeg={this.removeLeg}
                addLeg={this.addLeg}
                legs={legs}
              />
            )}
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
