import React, { Component } from "react";
import ReactDOM from "react-dom";
import MyGrid from "./components/MyGrid";
import MyChart from "components/Monitor/MyChart";
import { charts } from "data/dataB1";
import Monitor from "components/Monitor";
import "style/grid.css";

class App extends Component {
  render() {
    //return <MyGrid/>
    return (
      <ul className="monitors">
        <li>
          <MyChart location="Test" data={ [[1, 4], [2, 5], [3, 5]]} />
        </li>
      </ul>
    );
    //return <MyChart data={ charts[0].data}/>
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
