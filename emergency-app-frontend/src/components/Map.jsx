import React from "react"
import {MapContainer, TileLayer, useMap, Marker, Popup} from 'react-leaflet'

export default function Map() {
    const startingLoc = [41.8781, -87.6298];

    return (
    <MapContainer center={startingLoc} zoom={8} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={startingLoc}>
        <Popup>
          This is a popup
        </Popup>
      </Marker>
    </MapContainer>
  )
}