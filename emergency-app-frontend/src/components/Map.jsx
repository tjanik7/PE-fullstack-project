import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import PropTypes from 'prop-types'
import LabeledMarker from "./LabeledMarker.jsx"

export default function Map(props) {
    const initialStartingLoc = [41.8781, -87.6298]
    const [startingLoc, setStartingLoc] = useState(initialStartingLoc)

    const locationList = props.locationList

    useEffect(() => {
        if (locationList && locationList[0]?.latitude && locationList[0]?.longitude) {
            setStartingLoc([locationList[0].latitude, locationList[0].longitude])
        }
    }, [locationList]);

    const Recenter = ({lat, long}) => {
        const map = useMap()
        useEffect(() => {
            map.setView([lat, long], 13)
        }, [lat, long]);
    }

    const createMarkers = (locationList) => {
        if (locationList) {
            return( locationList.map((loc, idx) => <LabeledMarker
                key={idx}
                position={[loc.latitude, loc.longitude]}
                title={loc.title}
                textLines={loc.text}
            />))
        }
    }

    return (
        <>
            <MapContainer center={startingLoc} zoom={8} scrollWheelZoom={true}>
                <Recenter lat={startingLoc[0]} long={startingLoc[1]}/>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {createMarkers(props.locationList)}
            </MapContainer>
        </>
    )
}

Map.propTypes = {
    locationList: PropTypes.array
}