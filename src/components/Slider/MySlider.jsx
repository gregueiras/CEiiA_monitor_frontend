import React, { Component } from "react"
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider"
import {
  Handle,
  Track,
  Tick,
  TooltipRail,
} from "./SliderComponents" // example render components - source below

const sliderStyle = {
  position: "relative",
  width: "100%",
  marginTop: "1em",
}

class MySlider extends Component {
  render() {
    const { values, step, domain, onChange } = this.props

    return (
      <div>
        <Slider
          mode={2}
          step={step}
          domain={domain}
          rootStyle={sliderStyle}
          onChange={onChange}
          values={values}
        >
          <Rail>{railProps => <TooltipRail {...railProps} />}</Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map(handle => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => (
              <div className="slider-tracks">
                {tracks.map(({ id, source, target }) => (
                  <Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />
                ))}
              </div>
            )}
          </Tracks>
          <Ticks count={5}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map(tick => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} format={(value) => value.toFixed(1)} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
    )
  }
}

export default MySlider
