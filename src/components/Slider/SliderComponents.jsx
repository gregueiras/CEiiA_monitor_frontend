import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import "./tooltip.css"
const numberPrecision = 1

// *******************************************************
// RAIL
// *******************************************************
const railOuterStyle = {
  position: "absolute",
  width: "100%",
  height: 36,
  transform: "translate(0%, -50%)",
  borderRadius: 7,
  cursor: "pointer",
  // border: '1px solid white',
}

const railInnerStyle = {
  position: "absolute",
  width: "100%",
  height: 14,
  transform: "translate(0%, -50%)",
  borderRadius: 7,
  pointerEvents: "none",
  backgroundColor: "rgb(155,155,155)",
}

export function SliderRail({ getRailProps }) {
  return (
    <Fragment>
      <div style={railOuterStyle} {...getRailProps()} />
      <div style={railInnerStyle} />
    </Fragment>
  )
}

SliderRail.propTypes = {
  getRailProps: PropTypes.func.isRequired,
}

// *******************************************************
// HANDLE COMPONENT
// *******************************************************
export class Handle extends Component {
  static defaultProps = {
    disabled: false,
  }

  state = {
    mouseOver: false,
  }

  onMouseEnter = () => {
    const {
      onChange,
      handle: { value },
    } = this.props
    this.setState({ mouseOver: true })

    if (onChange) onChange([value])
  }

  onMouseLeave = () => {
    this.setState({ mouseOver: false })
  }

  render() {
    const {
      domain: [min, max],
      handle: { id, value, percent },
      isActive,
      disabled,
      getHandleProps,
      valuePrefix,
      valueSuffix,
    } = this.props
    const { mouseOver } = this.state

    return (
      <Fragment>
        {(mouseOver || isActive) && !disabled ? (
          <div
            style={{
              left: `${percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px",
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">
                {valuePrefix} {value.toFixed(numberPrecision)} {valueSuffix}
              </span>
            </div>
          </div>
        ) : null}
        <div
          role="slider"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          style={{
            left: `${percent}%`,
            position: "absolute",
            marginLeft: "-11px",
            marginTop: "-6px",
            zIndex: 400,
            width: 24,
            height: 24,
            cursor: "pointer",
            border: 0,
            borderRadius: "50%",
            boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.4)",
            backgroundColor: disabled ? "#666" : "#ea4335",
          }}
          {...getHandleProps(id, {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
      </Fragment>
    )
  }
}

Handle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Handle.defaultProps = {
  disabled: false,
}

// *******************************************************
// KEYBOARD HANDLE COMPONENT
// Uses a button to allow keyboard events
// *******************************************************
export function KeyboardHandle({
  domain: [min, max],
  handle: { id, value, percent },
  disabled,
  getHandleProps,
}) {
  return (
    <button
      role="slider"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      style={{
        left: `${percent}%`,
        position: "absolute",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
        width: 24,
        height: 24,
        borderRadius: "50%",
        boxShadow: "1px 1px 1px 1px rgba(0, 0, 0, 0.3)",
        backgroundColor: disabled ? "#666" : "#ea4335",
      }}
      {...getHandleProps(id)}
    />
  )
}

KeyboardHandle.propTypes = {
  domain: PropTypes.array.isRequired,
  handle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getHandleProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

KeyboardHandle.defaultProps = {
  disabled: false,
}

// *******************************************************
// TRACK COMPONENT
// *******************************************************
export function Track({ source, target, getTrackProps, disabled = false }) {
  return (
    <div
      style={{
        position: "absolute",
        height: 14,
        zIndex: 1,
        backgroundColor: disabled ? "#999" : "#811411",
        borderRadius: 7,
        cursor: "pointer",
        left: `${source.percent}%`,
        width: `${target.percent - source.percent}%`,
      }}
      {...getTrackProps()}
    />
  )
}

Track.propTypes = {
  source: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  target: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  getTrackProps: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
}

Track.defaultProps = {
  disabled: false,
}

// *******************************************************
// TICK COMPONENT
// *******************************************************
export function Tick({ tick, count, format }) {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          marginTop: 14,
          width: 1,
          height: 5,
          backgroundColor: "rgb(200,200,200)",
          left: `${tick.percent}%`,
        }}
      />
      <div
        style={{
          position: "absolute",
          marginTop: 22,
          fontSize: 10,
          textAlign: "center",
          marginLeft: `${-(100 / count) / 2}%`,
          width: `${100 / count}%`,
          left: `${tick.percent}%`,
        }}
      >
        {format(tick.value)}
      </div>
    </div>
  )
}

Tick.propTypes = {
  tick: PropTypes.shape({
    id: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    percent: PropTypes.number.isRequired,
  }).isRequired,
  count: PropTypes.number.isRequired,
  format: PropTypes.func.isRequired,
}

Tick.defaultProps = {
  format: d => d,
}

// *******************************************************
// TOOLTIP RAIL
// *******************************************************
const railStyle = {
  position: "absolute",
  width: "90%",
  height: 46,
  top: -13,
  borderRadius: 7,
  cursor: "pointer",
  opacity: 0.3,
  zIndex: 300,
  border: "0",
}

const railCenterStyle = {
  position: "absolute",
  width: "100%",
  height: 14,
  borderRadius: 7,
  cursor: "pointer",
  pointerEvents: "none",
  backgroundColor: "rgb(155,155,155)",
}

export class TooltipRail extends Component {
  state = {
    value: null,
    percent: null,
  }

  static defaultProps = {
    disabled: false,
    onChange: null,
  }

  onMouseEnter = () => {
    document.addEventListener("mousemove", this.onMouseMove)
  }

  onMouseLeave = () => {
    this.setState({ value: null, percent: null })
    document.removeEventListener("mousemove", this.onMouseMove)
  }

  onMouseMove = e => {
    const { activeHandleID, getEventData } = this.props

    if (activeHandleID) {
      this.setState({ value: null, percent: null })
    } else {
      const { value, percent } = getEventData(e)
      this.setState({ value, percent })
    }
  }

  render() {
    const { value, percent } = this.state
    const {
      activeHandleID,
      getRailProps,
      valuePrefix,
      valueSuffix,
    } = this.props

    return (
      <Fragment>
        {!activeHandleID && value ? (
          <div
            style={{
              left: `${percent}%`,
              position: "absolute",
              marginLeft: "-11px",
              marginTop: "-35px",
            }}
          >
            <div className="tooltip">
              <span className="tooltiptext">
                {valuePrefix} {value.toFixed(numberPrecision)} {valueSuffix}
              </span>
            </div>
          </div>
        ) : null}
        <div
          style={railStyle}
          {...getRailProps({
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
          })}
        />
        <div style={railCenterStyle} />
      </Fragment>
    )
  }
}
