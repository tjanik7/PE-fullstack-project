import axios from 'axios'

export async function getWeather(stationId, startDate, endDate) {
    try {
        const response = await axios.get('https://meteostat.p.rapidapi.com/stations/hourly', {
            params: {
                station: stationId,
                start: startDate,
                end: endDate,
            },
            headers: {
                'x-rapidapi-key': 'd9466f9e5amsh0d46ae26ef950b6p148717jsn19f2aa03f062'
            }
        })
        console.log(response.data)
    } catch (error) {
        console.error(error)
    }
}

export async function getNearbyStation(lat, long, setStationId) {
    try {
        const response = await axios.get('https://meteostat.p.rapidapi.com/stations/nearby', {
            params: {
                lat: lat,
                lon: long,
                limit: 1
            },
            headers: {
                'x-rapidapi-key': 'd9466f9e5amsh0d46ae26ef950b6p148717jsn19f2aa03f062'
            }
        })
        setStationId(response.data.data[0].id)
    } catch (error) {
        console.error(error)
    }
}