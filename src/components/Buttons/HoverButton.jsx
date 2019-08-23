import React, { Component, Children } from "react"

class HoverButton extends Component {
  state = {
    hovering: false,
    hoveringIdx: null,
  }

  constructor(props) {
    super(props)

    this.hoverIn = this.hoverIn.bind(this)
    this.hoverOut = this.hoverOut.bind(this)
  }

  hoverIn(idx) {
    this.setState({
      hovering: true,
      hoveringIdx: idx,
    })
  }

  hoverOut() {
    this.setState({
      hovering: false,
      hoveringIdx: null,
    })
  }

  render() {
    const { onClick, outerStyle, hoverStyle, children, animate } = this.props
    const { hovering, hoveringIdx } = this.state

    console.log(animate)

    if (children.length > 1) {
      return (
        <ul className={`buttonContainer ${animate ? "animation" : ""}`}>
          {Children.map(children, (child, idx) => {
            let style = { ...outerStyle }
            if (hovering && idx === hoveringIdx) {
              style = { ...style, ...hoverStyle }
            }

            return (
              <li key={idx} className="btn">
                <button
                  onClick={onClick}
                  style={style}
                  onMouseOver={() => this.hoverIn(idx)}
                  onMouseOut={this.hoverOut}
                  className="modalButton"
                >
                  {child}
                </button>
              </li>
            )
          })}
        </ul>
      )
    } else {
      let style = { ...outerStyle }
      if (hovering) {
        style = { ...style, ...hoverStyle }
      }
      return (
        <button
          onClick={onClick}
          style={style}
          onMouseOver={this.hoverIn}
          onMouseOut={this.hoverOut}
          className="modalButton"
        >
          {children}
        </button>
      )
    }
  }
}

export default HoverButton
