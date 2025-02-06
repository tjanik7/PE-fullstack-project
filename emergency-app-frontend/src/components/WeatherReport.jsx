import React from "react"
import PropTypes from "prop-types"

export default function WeatherReport(props) {
    return (
        <>
            <h2>Weather on {props.date} at {props.time}</h2>
            <div>Temperature of {props.temperature}&deg;F</div>
        </>
    )
}

WeatherReport.propTypes = {
    date: PropTypes.string,
    time: PropTypes.string,
    temperature: PropTypes.number
}