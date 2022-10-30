import React from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '600px',
  height: '600px'
};

const center = {
  lat: 53.30961,
  lng: -6.32615
};

const myLatLng = { lat: 53.30961, lng: -6.32615 };

function MyComponent() {
  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
      >
        { /* Child components, such as markers, info windows, etc. */ 
        <Marker position={center}></Marker>}
                <Marker position={center}></Marker>

        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)
