import React, { Component } from "react"
import ReactDOM from "react-dom"
import { charts, mapCenter, buoys, O2, Misc, name } from "data/dataB1"
import {
  charts_2,
  mapCenter_2,
  buoys_2,
  O2_2,
  Misc_2,
  name_2,
} from "data/dataB2"
import Monitor from "components/Monitor"
import "style/grid.css"

class App extends Component {
  render() {
    //return <MyGrid/>
    return (
      <ul className="monitors">
        <li>
          <Monitor
            location={name}
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
            location={name_2}
            charts={charts_2}
            mapCenter={mapCenter_2}
            o2={O2_2}
            misc={Misc_2}
            buoys={buoys_2}
            liveUpdate={true}
          />
        </li>
        <li>
          <Monitor
            location={name_2}
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
