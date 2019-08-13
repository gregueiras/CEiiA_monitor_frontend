import React, { Component } from "react"

class HoverButton extends Component {
  state = {
    hovering: false,
  }

  constructor(props) {
    super(props)

    this.hoverIn = this.hoverIn.bind(this)
    this.hoverOut = this.hoverOut.bind(this)
  }

  hoverIn() {
    this.setState({
      hovering: true,
    })
  }

  hoverOut() {
    this.setState({
      hovering: false,
    })
  }

  render() {
    const { onClick, outerStyle, children, hoverStyle } = this.props
    const { hovering } = this.state

    let style = { ...outerStyle }
    if (hovering) {
      style = { ...style, ...hoverStyle }
    }

    return (
      <button
        onClick={onClick}
        onMouseOver={this.hoverIn}
        onMouseOut={this.hoverOut}
        style={style}
        className="modalButton"
      >
        {children}
      </button>
    )
  }
}

export default HoverButton
