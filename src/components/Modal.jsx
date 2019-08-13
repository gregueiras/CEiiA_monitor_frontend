import React from "react"
import Select from "react-select"
import Constants from "style/Constants"
import HoverButton from "components/Buttons/HoverButton"

class Modal extends React.Component {
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
      this.props.onSubmit(selectedOption.label, liveUpdate)
      this.setState({
        selectedOption: null,
      })
    } else {
      this.setState({
        error: "Select an option",
      })
    }
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
        <header style={styles.header}>Add a new location</header>
        <div style={{ marginRight: 10, marginLeft: 10 }}>
          <Select
            value={selectedOption}
            onChange={this.handleChange}
            options={options}
            placeholder="Select a location"
            aria-label="Location Selector"
            aria-required="true"
          />
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
        <HoverButton outerStyle={styles.button} hoverStyle={styles.buttonHover}>
          <span>Add New Location</span>
        </HoverButton>
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
    boxShadow: "0 5px 8px 0 rgba(0,0,0,0.2), 0 7px 20px 0 rgba(0,0,0,0.17)",
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
    textAlign: "right",
    color: "white",
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: "1em",
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
}

export default Modal
