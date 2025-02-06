import React from "react"
import PropTypes from "prop-types"
import './EventSummary.css'

export default function WeatherReport(props) {
    return (
        <div className={'summary-container'}>
            <h3>Weather on {props.date} at {props.time}</h3>
            <div>Temperature of {props.temperature}&deg;F</div>
        </div>
    )
}

WeatherReport.propTypes = {
    date: PropTypes.string,
    time: PropTypes.string,
    temperature: PropTypes.number,
}