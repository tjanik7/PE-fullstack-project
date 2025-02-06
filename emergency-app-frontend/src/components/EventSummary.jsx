import React from "react"
import PropTypes from "prop-types"
import './EventSummary.css'

export default function EventSummary(props) {
    const address = props.address
    const description = props.description
    const fireDepartment = props.fire_department

    return (
        <div className={'summary-container'}>
            <h2>Location of incident {description.incident_number}:</h2>
            {address.common_place_name}<br/>
            {address.address_line1}<br/>
            {address.city}, {address.state} {address.postal_code}<br/>
            ({address.latitude}, {address.longitude})
            <h3>Incident description:</h3>
            Incident type: {description.type} ({description.subtype})<br/>
            Event opened on {description.event_opened} and closed on {description.event_closed}<br/>
            Comments:<br/> {description.comments}<br/><br/>
            <h3>Fire Department Information:</h3>
            {fireDepartment.name} ({fireDepartment.state}), shift {fireDepartment.shift}<br/><br/>
        </div>
    )
}

EventSummary.propTypes = {
    address: PropTypes.object,
    description: PropTypes.object,
    fire_department: PropTypes.object
}