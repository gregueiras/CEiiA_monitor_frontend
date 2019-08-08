import React, { Component } from "react"
import ReactDOM from "react-dom"
import MyGrid from './components/MyGrid';


class App extends Component {
  render() {
    return <MyGrid/>
  }
}

ReactDOM.render(<App />, document.getElementById("root"))