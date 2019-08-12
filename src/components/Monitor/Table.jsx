import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import { ReactTableDefaults } from "react-table"
import Constants from "style/Constants"
import Headers from "data/headers"

class Table extends React.Component {
  constructor(props) {
    super(props)
    const { data, schema } = props

    const newSchema = schema.map((content, index) => {
      let toReturn = { ...content }
      if (index === 0) {
        toReturn = { ...toReturn, ...firstCellStyle }
      } else {
        toReturn = { ...toReturn, ...cellStyle }
      }

      if (!toReturn.Header) {
        const acc = content.accessor.toLowerCase()
        toReturn.Header = Headers[`${acc}`]
      }

      return toReturn
    })

    this.state = {
      data,
      schema: newSchema,
    }
  }

  render() {
    const { data, schema } = this.state

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

const cellStyle = {
  style: {
    textAlign: Constants.textAlign,
  },
  width: Constants.cellWidth,
}

const firstCellStyle = {
  style: {
    color: Constants.lightText,
    fontSize: Constants.smallText,
  },
  width: Constants.cellWidth,
}

Object.assign(ReactTableDefaults.column, {
  ...ReactTableDefaults.column,
  headerStyle: columnStyle.headerStyle,
  style: columnStyle.style,
})

export default Table
