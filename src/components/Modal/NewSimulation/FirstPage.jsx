import React, { Component } from "react"
import MyLocationPicker from "components/MyLocationPicker"
import MySlider from "components/Slider/MySlider"

export default class FirstPage extends Component {
  static defaultProps = {
    radius: 2,
    area: true,
    handleLocationChange: undefined,
    toggleAreaUpdate: undefined,
    handleAreaChange: undefined,
    handleRandomChange: undefined,
  }

  render() {
    const {
      radius,
      area,
      handleLocationChange,
      toggleAreaUpdate,
      handleAreaChange,
      handleRandomChange,
      address,
      defaultPosition,
    } = this.props

    return (
      <div style={{ marginRight: 10, marginLeft: 10 }}>
        <div>
          <span>Initial Position: {address}</span>
          <MyLocationPicker
            defaultPosition={defaultPosition}
            onChange={handleLocationChange}
            radius={radius}
            visible={area}
          />
        </div>
        <div>
          <label style={styles.label}>
            <input
              type="checkbox"
              name={"Area restriction"}
              checked={area}
              onChange={toggleAreaUpdate}
              style={styles.checkbox}
            />
            {"Area restriction"}
          </label>
        </div>
        {area && (
          <div style={area ? styles.smallSpacer : {}}>
            <span>Area radius</span>
            <div style={styles.slider}>
              <MySlider
                domain={[1, 10]}
                step={0.5}
                values={[2]}
                onChange={handleAreaChange}
                valuePrefix={""}
                valueSuffix={" km"}
              />
            </div>
          </div>
        )}
        <div style={area ? styles.spacer : {}}>
          <span>Random bound</span>
          <div style={styles.slider}>
            <MySlider
              domain={[-1, 1]}
              step={0.1}
              values={[-0.3, 0.3]}
              onChange={handleRandomChange}
              handlesNames={["Lower Bound", "Upper Bound"]}
            />
          </div>
        </div>
      </div>
    )
  }
}

const styles = {
  spacer: {
    marginTop: 50,
  },
  smallSpacer: {
    marginTop: 10,
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
