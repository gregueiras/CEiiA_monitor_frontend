import React, { Component } from "react"
import { GoPlus, GoGlobe } from "react-icons/go"
import HoverButton from "components/Buttons/HoverButton"
import Constants from "style/Constants"
import NewSimulationModal from "components/Modal/NewSimulationModal"
import NewLocationModal from "components/Modal/NewLocationModal"
import "style/animation.css"

class Modal extends Component {
  constructor(props) {
    super(props)
    const { modalShowing } = props

    this.toggleModalHandler = this.toggleModalHandler.bind(this)
    this.state = {
      suggestions: [],
      modalShowing,
    }

    this.loadSuggestions()
  }

  async loadSuggestions() {
    const data = await fetch(`${process.env.REACT_APP_BACKEND_API}/`)
    const json = await data.json()

    this.setState({
      suggestions: json,
    })
  }

  toggleModalHandler(idx) {
    console.log(idx)
    this.setState({
      modalShowing: idx,
    })
  }

  render() {
    const { modalShowing, suggestions } = this.state
    const { createMonitor } = this.props
    return (
      <div style={modalShowing ? style.backModal : {}}>
        <NewLocationModal
          show={{ ...style.shadow }}
          close={() => this.toggleModalHandler(null)}
          onSubmit={createMonitor}
          suggestions={suggestions}
          style={
            modalShowing === 0
              ? { ...style.modal, ...style.shadow }
              : { display: "none" }
          }
        />
        <NewSimulationModal
          show={{ ...style.shadow }}
          close={() => this.toggleModalHandler(null)}
          onSubmit={createMonitor}
          suggestions={suggestions}
          style={
            modalShowing === 1
              ? { ...style.modal, ...style.shadow }
              : { display: "none" }
          }
        />
        <HoverButton
          animate
          outerStyle={{ ...style.modalButton }}
          hoverStyle={{ ...style.buttonHover }}
          onClick={this.toggleModalHandler}
        >
          <GoPlus style={{ ...style.modalButtonSVG }} size={28} />
          <GoGlobe style={{ ...style.modalButtonSVG }} size={28} />
        </HoverButton>
      </div>
    )
  }
}

const style = {
  position: {
    right: 20,
    bottom: 20,
    position: "fixed",
  },
  modalButton: {
    zIndex: 2,
    background: Constants.lightBackground,
    border: 0,
    borderRadius: 50,
    color: "white",
    textAlign: "center",
    cursor: "pointer",
    width: 50,
    height: 50,
    WebkitBoxShadow: "0px 0px 48px 22px rgba(0,0,0,0.75)",
    MozBoxShadow: "0px 0px 48px 22px rgba(0,0,0,0.75)",
    boxShadow: "0px 0px 48px 22px rgba(0,0,0,0.75)",
  },
  modalButtonSVG: {
    backgroundSize: "40 40",
  },
  buttonHover: {
    background: Constants.hoverBackground,
  },
  backModal: {
    position: "absolute",
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
  modal: {
    position: "fixed",
    zIndex: 3,
    marginLeft: "auto",
    marginRight: " auto",
    width: "100%",
    transform: "translate(-50%, 0)",
    left: "50%",
  },
  shadow: {
    WebkitBoxShadow:
      "0px 0px 158px 400px rgba(0,0,0,0.9), inset 0px 0px 158px 200px rgba(0,0,0,0.9)",
    MozBoxShadow:
      "0px 0px 158px 400px rgba(0,0,0,0.9), inset 0px 0px 158px 200px rgba(0,0,0,0.9)",
    boxShadow:
      "0px 0px 158px 400px rgba(0,0,0,0.9), inset 0px 0px 158px 200px rgba(0,0,0,0.9)",
  },
}

export default Modal
