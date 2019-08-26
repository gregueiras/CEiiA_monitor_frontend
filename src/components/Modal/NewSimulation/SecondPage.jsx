import React, { Component } from "react"

export default class SecondPage extends Component {
  static defaultProps = {

  }

  render() {
    return (
      <div>
        <h1>Hello World</h1>
      </div>
    )
  }
}

const styles = {
  spacer: {
    marginTop: 50,
  },
  slider: {
    width: "95%",
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
}
