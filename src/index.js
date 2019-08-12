import React, { Component } from "react"
import ReactDOM from "react-dom"
import Monitor from "components/Monitor"
import "style/grid.css"

const locations = ["S. Miguel", "Terceira"]

class App extends Component {
  render() {
    //return <MyGrid/>
    return (
      <ul className="monitors">
        <li>
          <Monitor location={locations[0]} liveUpdate={true} />
        </li>
        <li>
          <Monitor location={locations[1]} liveUpdate={true} />
        </li>
        <li>
          <Monitor location={locations[1]} liveUpdate={false} />
        </li>
      </ul>
    )
    //return <MyChart data={ charts[0].data}/>
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
