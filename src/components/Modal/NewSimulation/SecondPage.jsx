import React, { Component } from "react"
import { GoX, GoPlus } from "react-icons/go"
import ordinal from "ordinal"
import Constants from "style/Constants"
import MySlider from "components/Slider/MySlider"
import HoverButton from "components/Buttons/HoverButton"

export default class SecondPage extends Component {
  static options = [
    { value: "days", label: "Days" },
    { value: "hours", label: "Hours" },
    { value: "minutes", label: "Minutes" },
  ]

  static defaultLeg = { engine: true, turn: 0, velocity: 0, time: 1 }

  state = {
    error: null,
    legs: [
      SecondPage.defaultLeg,
      SecondPage.defaultLeg,
      SecondPage.defaultLeg,
      SecondPage.defaultLeg,
      SecondPage.defaultLeg,
      SecondPage.defaultLeg,
    ],
  }

  handleTimeChange = (selectedTime, idx) => {
    const time = selectedTime.target.value
    const { legs } = this.state
    legs[idx].time = time

    this.setState({ legs })
  }

  handleEngineChange = idx => {
    console.log(idx)
    const { legs } = this.state
    legs[idx].engine = !legs[idx].engine

    this.setState({ legs })
  }

  handleTurnChange = (selectedTurn, idx) => {
    const turn = Number(selectedTurn.target.value)
    const { legs } = this.state
    legs[idx].turn = turn

    if (turn === 0) {
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
    const newLeg = SecondPage.defaultLeg
  
    console.log(newLeg)

    this.setState({ legs: [...legs, newLeg] })
  }

  render() {
    const { legs } = this.state

    return (
      <div>
        <div
          style={{
            ...styles.grid,
            gridTemplateColumns: `repeat(${legs.length + // +2 to give space for add element and final spacer
              2}, minmax(200px, 1fr))`,
          }}
        >
          {legs.map(({ engine, time, turn, velocity }, idx) => {
            return (
              <div style={styles.inputGroup} key={idx}>
                <div style={styles.header}>
                  <span style={styles.headerText}>{ordinal(idx + 1)} Leg</span>
                  <button
                    style={styles.buttonStyle}
                    onClick={() => this.removeLeg(idx)}
                  >
                    <GoX style={styles.crossStyle} />
                  </button>
                </div>
                <div style={styles.container}>
                  <div style={styles.inputLine}>
                    <label>Maneuver Time (hours)</label>
                    <input
                      type="number"
                      min="0"
                      max="99"
                      style={styles.inputNumber}
                      onChange={val => this.handleTimeChange(val, idx)}
                      value={time}
                    />
                  </div>
                  <div style={styles.inputLine}>
                    <label>Engine</label>
                    <input
                      type="checkbox"
                      style={styles.checkbox}
                      checked={engine}
                      onChange={() => this.handleEngineChange(idx)}
                    />
                  </div>
                  <div style={styles.inputLine}>
                    <label
                      style={!engine ? { color: Constants.disabledColor } : {}}
                    >
                      Turn (degrees)
                    </label>
                    <input
                      type="number"
                      style={styles.inputNumber}
                      min="-180"
                      max="180"
                      onChange={val => this.handleTurnChange(val, idx)}
                      value={turn}
                      disabled={!engine}
                    />
                  </div>
                  <div
                    style={{
                      ...styles.inputLine,
                      flexDirection: "column",
                      ...{
                        color:
                          turn === 0 || !engine
                            ? Constants.disabledColor
                            : "auto",
                      },
                    }}
                  >
                    <label>Velocity (m/s)</label>
                    <div style={styles.slider}>
                      <MySlider
                        values={[engine ? velocity : 0]}
                        step={0.05}
                        domain={[0, 2]}
                        onChange={val => this.handleVelocityChange(val, idx)}
                        valuePrefix={""}
                        valueSuffix={" m/s"}
                        handlesNames={[]}
                        numberPrecision={2}
                        disabled={turn === 0 || !engine}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          <div style={{ ...styles.inputGroup }}>
            <HoverButton
              outerStyle={styles.button}
              hoverStyle={styles.buttonHover}
              onClick={this.addLeg}
            >
              <GoPlus size={28} />
            </HoverButton>
          </div>
          <div style={{ width: "5px", height: "5px" }}></div>
        </div>
      </div>
    )
  }
}

const styles = {
  slider: {
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  checkbox: {
    width: 16,
    height: 16,
  },
  label: {
    marginTop: "0.5em",
    display: "block",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    borderRadius: 4,
    marginLeft: 5,
    marginRight: 5,
    height: "50vh",
    background: "#F5F5F0",
  },
  inputNumber: {
    width: "25%",
  },
  grid: {
    display: "grid",
    gridGap: "minmax(150px, 1fr)",
    paddingBottom: 10,
    overflowX: "auto",
  },
  inputLine: {
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "0.5em",
    marginRight: "0.5em",
    marginBottom: "1em",
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
    display: "flex",
    justifyContent: "space-between",
  },
  headerText: {
    marginTop: 0,
    marginBottom: 0,
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
  container: {
    paddingTop: "1em",
    border: "1px solid grey",
    height: "100%",
  },
  button: {
    width: 50,
    height: 50,
    padding: 10,
    alignSelf: "center",
    marginTop: "auto",
    marginBottom: "auto",
    border: 0,
    borderRadius: "50%",
    background: Constants.lightBackground,
    color: "white",
    cursor: "pointer",
  },
  buttonHover: {
    background: Constants.hoverBackground,
  },
}
