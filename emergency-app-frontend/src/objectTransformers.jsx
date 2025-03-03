export function apparatusToEvent(apparatus, apparatusEvents) {

    for (const [status, statusData] of Object.entries(apparatus.unit_status)) {
        apparatusEvents.push({
            latitude: statusData.latitude,
            longitude: statusData.longitude,
            title: apparatus.unit_type + ' ' + apparatus.car_id + ' ' + status,
            text: [statusData.timestamp]
        })
    }
}

export const objectToAddressString = address => {
        return [
            address.address_line1,
            address.city + ', ' + address.state,
        ]
    }