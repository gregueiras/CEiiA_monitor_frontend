import React from "react"
import Select from "react-select"
import ToggleButton from "react-toggle-button"
import { GoGlobe, GoPlus } from "react-icons/go"

class Autocomplete extends React.Component {
  constructor(props) {
    super(props)

    this.createMonitor = this.createMonitor.bind(this)

    const { suggestions } = this.props
    const options = suggestions.map(suggestion => {
      return {
        value: suggestion,
        label: suggestion,
      }
    })

    this.state = {
      selectedOption: null,
      options,
      liveUpdate: true,
    }
  }

  componentWillReceiveProps({ suggestions }) {
    const options = suggestions.map(suggestion => {
      return {
        value: suggestion,
        label: suggestion,
      }
    })

    this.setState({
      options,
    })
  }

  handleChange = selectedOption => {
    this.setState({ selectedOption })
  }

  createMonitor() {
    const { selectedOption, liveUpdate } = this.state
    this.props.onSubmit(selectedOption.label, liveUpdate)
    this.setState({
      selectedOption: null,
    })
  }

  render() {
    const { selectedOption, options, liveUpdate } = this.state

    return (
      <div
        style={{
          ...styles.containerStyle,
          transform: this.props.show ? "translateY(0vh)" : "translateY(-100vh)",
          opacity: this.props.show ? "1" : "0",
        }}
      >
        <header>Add a new location</header>
        <div style={{ display: "flex", flexDirection: "row", marginRight: 20 }}>
          <div style={{ flexGrow: 2 }}>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </div>
          <div style={{ alignSelf: "center", marginLeft: 10 }}>
            <ToggleButton
              inactiveLabel={""}
              activeLabel={""}
              colors={{
                activeThumb: {
                  base: "rgb(250,250,250)",
                },
                inactiveThumb: {
                  base: "rgb(72, 173, 72)",
                },
                active: {
                  base: "rgb(207,221,245)",
                  hover: "rgb(177, 191, 215)",
                },
                inactive: {
                  base: "rgb(65,66,68)",
                  hover: "rgb(95,96,98)",
                },
              }}
              trackStyle={styles.trackStyle}
              thumbStyle={styles.thumbStyle}
              thumbAnimateRange={[-10, 36]}
              value={liveUpdate}
              onToggle={value => {
                this.setState({
                  liveUpdate: !value,
                })
              }}
              thumbStyleHover={styles.thumbStyleHover}
              thumbIcon={<GoGlobe />}
              animateThumbStyleHover={n => {
                return {
                  boxShadow: `0 0 ${2 + 4 * n}px rgba(0,0,0,.16),0 ${2 +
                    3 * n}px ${4 + 8 * n}px rgba(0,0,0,.32)`,
                }
              }}
            />
          </div>
        </div>
        <button onClick={this.createMonitor}>
          <span>Add new Location</span>
          <span>
            <GoPlus style={{ verticalAlign: "middle" }} />
          </span>
        </button>
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
  },
}

export default Autocomplete
