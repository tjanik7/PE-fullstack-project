import './App.css'
import React, { useEffect, useState } from 'react';
import Map from "./components/Map.jsx"
import { apparatusToEvent, objectToAddressString } from "./objectTransformers.jsx"
import { getNearbyStation, getWeather } from "./weatherApiClient.js"
import WeatherReport from "./components/WeatherReport.jsx"
import EventSummary from "./components/EventSummary.jsx"

function App() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadedData, setUploadedData] = useState(null)
    const [incidentLocation, setIncidentLocation] = useState(null)
    const [locationList, setLocationList] = useState([])
    const [stationId, setStationId] = useState(null)
    const [weatherData, setWeatherData] = useState(null)
    const [fetchingWeatherData, setFetchingWeatherData] = useState(null)
    const [eventDatetime, setEventDatetime] = useState(null)

    const calcAverageTemp = (weatherArray) => {
        let sum = 0
        let cnt = 0
        for (const weatherItem of weatherArray) {
            if (weatherItem.temp != null) {
                cnt += 1
                sum += weatherItem.temp
            }
        }
        return sum / cnt
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    // Load uploaded file and parse JSON
    const readJsonFile = async (file) => {
        const fileText = await file.text()
        const jsonIncidentData = JSON.parse(fileText)
        setUploadedData(jsonIncidentData)
    }

    // Use event datetime to request relevant weather data
    useEffect(() => {
        if (stationId && uploadedData?.description?.event_opened) {
            const eventOpened = uploadedData.description.event_opened
            const eventOpenedDate = eventOpened.slice(0, 10)

            setEventDatetime(new Date(eventOpened))

            getWeather(stationId, eventOpenedDate, setWeatherData, setFetchingWeatherData)
        }
    }, [stationId, uploadedData]);

    // Transform incident info and apparatus status updates into lat/long events we can place on the map
    useEffect(() => {
        if (incidentLocation) {
            const latLongEvents = []
            for (const apparatus of uploadedData.apparatus) {
                apparatusToEvent(apparatus, latLongEvents)
            }
            latLongEvents.push(incidentLocation)

            setLocationList(latLongEvents)
        }
    }, [incidentLocation, uploadedData]);

    // Parse incident location and find nearest weather station
    useEffect(() => {
        if (uploadedData?.address?.latitude && uploadedData?.address?.longitude) {
            const address = uploadedData.address
            setIncidentLocation({
                latitude: address.latitude,
                longitude: address.longitude,
                title: address.common_place_name,
                text: objectToAddressString(address)
            })

            // API request to find station nearest to this incident's lat/long
            getNearbyStation(address.latitude, address.longitude, setStationId, setFetchingWeatherData)
        }
    }, [uploadedData]);

    useEffect(() => {
        // Parse file if one is uploaded
        if (selectedFile) {
            readJsonFile(selectedFile)
        }
    }, [selectedFile]);

    const renderWeatherReport = () => {
        if (fetchingWeatherData == null) {
            return null
        }

        if (fetchingWeatherData === true) {
            return <div>Loading weather data...</div>
        }

        const averageTemp = calcAverageTemp(weatherData)

        // Render weather data since we know it has been fetched successfully
        return (
            <WeatherReport
                date={eventDatetime.toDateString()}
                time={eventDatetime.toTimeString()}
                temperature={weatherData[uploadedData.description.hour_of_day].temp}
                averageTemperature={averageTemp}
            />
        )
    }

    return (
        <>
            {selectedFile ? null : <h2>Please upload a file to analyze below</h2>}
            <div>
                <input type={"file"} onChange={onFileChange}/>
            </div>
            {uploadedData ? <Map locationList={locationList}/> : null}
            {uploadedData ? <EventSummary address={uploadedData.address} fire_department={uploadedData.fire_department} description={uploadedData.description} /> : null}
            {renderWeatherReport()}
        </>
    )
}

export default App
