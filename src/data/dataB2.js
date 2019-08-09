import React from "react"
import Constants from "style/Constants"
import dataO2P from "./data1/O2P"
import dataMGL from "./data1/mgL"

const cellStyle = {
  style: {
    textAlign: Constants.textAlign,
  },
  width: Constants.cellWidth,
}

const O2Data = [
  {
    name: "Max",
    o2P: "90.1",
    o2mg: "7.7",
    hypoxia: "3.3",
  },
  {
    name: "Avg",
    o2P: "85.6",
    o2mg: "7.1",
    hypoxia: "2.4",
  },
  {
    name: "Min",
    o2P: "81.0",
    o2mg: "6.6",
    hypoxia: "1.6",
  },
]

const O2Schema = [
  {
    Header: "",
    accessor: "name", // String-based value accessors!
    style: {
      color: Constants.lightText,
      fontSize: Constants.smallText,
    },
    width: Constants.cellWidth,
  },
  {
    Header: (
      <>
        O<sub>2</sub> %
      </>
    ),
    accessor: "o2P",
    ...cellStyle,
  },
  {
    Header: (
      <>
        O<sub>2</sub> mg/L
      </>
    ),
    accessor: "o2mg",
    ...cellStyle,
  },
  {
    Header: "Hypoxia",
    accessor: "hypoxia",
    ...cellStyle,
  },
]

const MiscData = [
  {
    name: "Max",
    WFms: "2.2",
    CT: "25.8",
    Temp: "19.7",
  },
  {
    name: "Avg",
    WFms: "2.0",
    CT: "15.5",
    Temp: "14.0",
  },
  {
    name: "Min",
    WFms: "1.4",
    CT: "7.4",
    Temp: "4.7",
  },
]

const MiscSchema = [
  {
    Header: "",
    accessor: "name", // String-based value accessors!,
    style: {
      color: Constants.lightText,
      fontSize: Constants.smallText,
    },
    width: Constants.cellWidth,
  },
  {
    Header: "WF m/s",
    accessor: "WFms",
    ...cellStyle,
  },
  {
    Header: "CT ‰",
    accessor: "CT",
    ...cellStyle,
  },
  {
    Header: "ºC",
    accessor: "Temp",
    ...cellStyle,
  },
]

const O2_2 = {
  data: O2Data,
  schema: O2Schema,
}

const Misc_2 = {
  data: MiscData,
  schema: MiscSchema,
}

const dataBuoys = [
  {
    name: "B2582",
    data: JSON.parse(process.env.REACT_APP_TEST_DATA_2),
  },
  {
    name: "B4242",
    data: JSON.parse(process.env.REACT_APP_TEST_DATA_3),
  },
  /*
  {
    name: "B8952",
    data: JSON.parse(process.env.REACT_APP_TEST_DATA_2),
  },
  {
    name: "B1482",
    data: JSON.parse(process.env.REACT_APP_TEST_DATA_3),
  },
*/
]

const charts_2 = [
  {
    name: (
      <>
        O<sub>2</sub> %
      </>
    ),
    data: process.env.NODE_ENV === "development" ? dataBuoys : dataO2P,
    yTitle: "%",
    title: "Oxygen Percentage",
    type: "O2P",
  },
  {
    name: (
      <>
        O<sub>2</sub> mg/L
      </>
    ),
    data: process.env.NODE_ENV === "development" ? dataBuoys : dataMGL,
    yTitle: "mg/L",
    title: "Oxygen (mg/L)",
    type: "O2C",
  },
  {
    name: "Salinity",
  },
  {
    name: "Current Speed",
  },
  {
    name: "Temperature",
  },
]

const mapCenter_2 = { lat: 38.7211917, lng: -27.2805513 }
const buoys_2 = [
  { lat: 38.864673, lng: -27.198971, key: "B4712" },
  { lat: 38.783374, lng: -26.952793, key: "B4242" },
  { lat: 38.701063, lng: -26.951252, key: "B4520" },
  { lat: 38.596731, lng: -26.989337, key: "B4209" },
]

const name_2 = "Terceira"

export { O2_2, Misc_2, charts_2, mapCenter_2, buoys_2, name_2 }
