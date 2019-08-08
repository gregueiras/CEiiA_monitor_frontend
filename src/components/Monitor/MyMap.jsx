import gAPI from "../../auth/GoogleAPI"
import React, { Component } from "react"
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} from "react-google-maps"

class MyMap extends Component {
  render() {
    const mapOptions = {
      disableDefaultUI: true,
    }


    const MapWithAMarker = withScriptjs(
      withGoogleMap(props => (
        <GoogleMap defaultZoom={8} defaultCenter={{ lat: 37.739566, lng: -25.343753 }} defaultOptions={mapOptions}>
          <Marker position={{ lat: 37.486081, lng: -25.205611 }} />
        </GoogleMap>
      )));
    
    return (<MapWithAMarker
      googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${gAPI}&v=3.exp&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `inherit` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />);
  }
}

export default MyMap
