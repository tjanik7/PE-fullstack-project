import axios from 'axios'

const rapidApiKey = 'd9466f9e5amsh0d46ae26ef950b6p148717jsn19f2aa03f062'

export async function getWeather(stationId, startDate, hourOfDay, setWeatherData) {
    try {
        const response = await axios.get('https://meteostat.p.rapidapi.com/stations/hourly', {
            params: {
                station: stationId,
                start: startDate,
                end: startDate,
                units: 'imperial'
            },
            headers: {
                'x-rapidapi-key': rapidApiKey
            }
        })
        setWeatherData(response.data.data[hourOfDay])
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
                'x-rapidapi-key': rapidApiKey
            }
        })
        setStationId(response.data.data[0].id)
    } catch (error) {
        console.error(error)
    }
}