import React from "react"
import { Marker, Popup } from "react-leaflet"
import PropTypes from "prop-types"

// Provided more time, I would choose to use a different color marker for the address of the incident (to differentiate
// from status updates). On a quick search, it looked like changing the marker requires uploading new png files,
// so I didn't think investing the time there made sense
export default function LabeledMarker(props) {
    const formatLines = props.textLines.map((str, idx) => (
        <div key={idx}>{str}</div>
    ))

    return (
        <Marker position={props.position}>
            <Popup>
                <h3>{props.title}</h3>
                {formatLines}
            </Popup>
        </Marker>
    )
}

LabeledMarker.propTypes = {
    position: PropTypes.array,
    title: PropTypes.string,
    textLines: PropTypes.array
}