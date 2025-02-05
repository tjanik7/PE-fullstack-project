import React from "react"
import { Marker, Popup } from "react-leaflet"
import PropTypes from "prop-types"

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