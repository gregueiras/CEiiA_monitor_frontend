import React, { Component } from "react"
import Select from "react-select"
import Constants from "style/Constants"
import HoverButton from "components/Buttons/HoverButton"
import { GoAlert, GoX } from "react-icons/go"

class NewLocationModal extends Component {
  constructor(props) {
    super(props)

    this.createMonitor = this.createMonitor.bind(this)
    this.toggleLiveUpdate = this.toggleLiveUpdate.bind(this)

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
      error: null,
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

  toggleLiveUpdate() {
    const { liveUpdate } = this.state
    this.setState({
      liveUpdate: !liveUpdate,
    })
  }
  createMonitor() {
    const { selectedOption, liveUpdate } = this.state

    if (selectedOption) {
      this.props.close()
      this.props.onSubmit(selectedOption.label, liveUpdate)

      this.setState({
        selectedOption: null,
        error: null,
      })
    } else {
      this.setState({
        error: "Location is required",
      })
    }
  }

  render() {
    const { selectedOption, options, liveUpdate, error } = this.state
    const { style, close, show } = this.props

    const selectStyle = {
      control: (provided, state) => {
        let errorStyle = {
          border: "1px solid red",
        }

        if (error)
          return {
            ...provided,
            ...errorStyle,
          }
        else return provided
      },
    }
    return (
      <div style={style}>
        <div
          className="modalAddLocation"
          style={{
            ...styles.containerStyle,
            transform: show !== null
              ? "translateY(0vh)"
              : "translateY(-100vh)",
            opacity: show ? "1" : "0",
          }}
        >
          <div style={styles.header}>
            <span style={styles.headerText}>Add a new location</span>
            <button style={styles.buttonStyle} onClick={close}>
              <GoX style={styles.crossStyle} />
            </button>
          </div>
          <div style={{ marginRight: 10, marginLeft: 10 }}>
            <Select
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
              placeholder="Select a location"
              aria-label="Location Selector"
              aria-required="true"
              styles={selectStyle}
              error={error}
            />
            {error && (
              <span style={styles.errorStyle}>
                <GoAlert
                  style={{ marginRight: 5, verticalAlign: "text-bottom" }}
                />
                {error}
              </span>
            )}
            <label style={styles.label}>
              <input
                type="checkbox"
                name={"Live Update"}
                checked={liveUpdate}
                onChange={this.toggleLiveUpdate}
                style={styles.checkbox}
              />
              {"Live Update"}
            </label>
          </div>
          <HoverButton
            outerStyle={styles.button}
            hoverStyle={styles.buttonHover}
            onClick={this.createMonitor}
          >
            <span>Add a new Location</span>
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
    margin: "100px auto 0",
    transition: "all .8s",
    width: "40%",
    height: "50vh",
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
}

export default NewLocationModal
