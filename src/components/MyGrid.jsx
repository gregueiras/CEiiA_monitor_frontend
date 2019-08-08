import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
import Monitor from "./Monitor"
import { O2, Misc, charts } from "data/dataB1"

const ResponsiveGridLayout = WidthProvider(Responsive)

class MyGrid extends React.Component {
  render() {
    // layout is an array of objects, see the demo for more complete usage
    const layouts = {
      lg: lgLayout,
      md: mdLayout,
      sm: smLayout,
    }
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        rowHeight={30}
        width={1400}
        margin={[5, 8]}
        breakpoints={{ lg: 1200, md: 996, sm: 768 }}
        cols={{ lg: 3, md: 2, sm: 1 }}
        draggableCancel=".chart, button,.react-tabs"
      >
        <div key="a">
          <Monitor charts={charts} o2={O2} misc={Misc} location="S. Miguel" />
        </div>
        <div key="b">
          <Monitor charts={charts} o2={O2} misc={Misc} location="S. Miguel" />
        </div>
        <div key="c">
          <Monitor charts={charts} o2={O2} misc={Misc} location="S. Miguel" />
        </div>
        <div key="d">
          <Monitor charts={charts} o2={O2} misc={Misc} location="S. Miguel" />
        </div>
      </ResponsiveGridLayout>
    )
  }
}

const lgLayout = [
  { i: "a", x: 0, y: 0, w: 1, h: 23 },
  { i: "b", x: 1, y: 0, w: 1, h: 23 },
  { i: "c", x: 2, y: 0, w: 1, h: 23 },
  { i: "d", x: 0, y: 1, w: 1, h: 23 },
]

const mdLayout = [
  { i: "a", x: 0, y: 0, w: 1, h: 23 },
  { i: "b", x: 1, y: 0, w: 1, h: 23 },
  { i: "c", x: 0, y: 24, w: 1, h: 23 },
  { i: "d", x: 1, y: 24, w: 1, h: 23 },
]

const smLayout = [
  { i: "a", x: 0, y: 0, w: 1, h: 23 },
  { i: "b", x: 0, y: 1, w: 1, h: 23 },
  { i: "c", x: 0, y: 2, w: 1, h: 23 },
  { i: "d", x: 0, y: 3, w: 1, h: 23 },
]

export default MyGrid
