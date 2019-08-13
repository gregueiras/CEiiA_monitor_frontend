import React, { Component } from "react"
import { GoPlus } from "react-icons/go"
import HoverButton from "components/Buttons/HoverButton"
import Constants from "style/Constants"
import MyModal from "components/Modal/MyModal"
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

  toggleModalHandler() {
    this.setState({
      modalShowing: !this.state.modalShowing,
    })
  }

  render() {
    const { modalShowing, suggestions } = this.state
    const { createMonitor } = this.props

    return (
      <div style={modalShowing ? style.backModal : {}}>
        <MyModal
          show={modalShowing}
          close={this.toggleModalHandler}
          onSubmit={createMonitor}
          suggestions={suggestions}
          style={modalShowing ? style.modal : { display: "none" }}
        />
        <HoverButton
          outerStyle={{ ...style.position, ...style.modalButton }}
          hoverStyle={style.buttonHover}
          onClick={this.toggleModalHandler}
        >
          <GoPlus style={{ ...style.position, ...style.modalButtonSVG }} />
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
    padding: 20,
    textAlign: "center",
    cursor: "pointer",
    width: 50,
    height: 50,
    WebkitBoxShadow: "0px 0px 48px 22px rgba(0,0,0,0.7)",
    MozBoxShadow: "0px 0px 48px 22px rgba(0,0,0,0.7)",
    boxShadow: "0px 0px 48px 22px rgba(0,0,0,0.7)",
  },
  modalButtonSVG: {
    width: 35,
    height: 35,
    right: 27,
    bottom: 27,
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
}

export default Modal
