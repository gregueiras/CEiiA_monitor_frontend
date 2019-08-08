import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { ReactTableDefaults } from "react-table"
import Constants from "style/Constants"

class Table extends React.Component {
  render() {
    const { data, schema } = this.props

    const style = {
      border: 0,
    }

    return (
      <div>
        <ReactTable
          data={data}
          columns={schema}
          showPagination={false}
          sortable={false}
          style={style}
          pageSize={data.length}
          defaultColumn={columnStyle}
          resizable={false}
        />{" "}
      </div>
    )
  }
}

const columnStyle = {
  headerStyle: {
    borderLeft: 0,
    borderRight: 0,
    color: "rgb(204, 204, 204)",
    fontSize: Constants.smallText,
  },
  style: {
    borderLeft: 0,
    borderRight: 0,
    borderBottomColor: "rgb(204, 204, 204)",
    borderTopColor: "rgb(204, 204, 204)",
    fontSize: Constants.smallText,
  },
}

Object.assign(ReactTableDefaults.column, {
  ...ReactTableDefaults.column,
  headerStyle: columnStyle.headerStyle,
  style: columnStyle.style,
})

export default Table
