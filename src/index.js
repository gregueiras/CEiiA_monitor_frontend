import React, { Component } from "react"
import ReactDOM from "react-dom"
import { charts, mapCenter, buoys, O2, Misc } from "data/dataB1"
import Monitor from "components/Monitor"
import "style/grid.css"

class App extends Component {
  render() {
    //return <MyGrid/>
    return (
      <ul className="monitors">
        <li>
          <Monitor
            location="S. Miguel"
            charts={charts}
            mapCenter={mapCenter}
            o2={O2}
            misc={Misc}
            buoys={buoys}
            liveUpdate={true}
          />
        </li>
        <li>
          <Monitor
            location="Horta"
            charts={charts}
            mapCenter={mapCenter}
            o2={O2}
            misc={Misc}
            buoys={buoys}
            liveUpdate={true}
          />
        </li>
        <li>
          <Monitor
            location="Horta"
            charts={charts}
            mapCenter={mapCenter}
            o2={O2}
            misc={Misc}
            buoys={buoys}
            liveUpdate={false}
          />
        </li>
      </ul>
    )
    //return <MyChart data={ charts[0].data}/>
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
