import './App.css'
import { useEffect, useState } from 'react';
import Map from "./components/Map.jsx"
import apparatusToEvent from "./Apparatus.jsx"
import { getNearbyStation, getWeather } from "./apiRequests.js"

function App() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadedData, setUploadedData] = useState(null)
    const [location, setLocation] = useState(null)
    const [locationList, setLocationList] = useState([])
    const [stationId, setStationId] = useState(null)

    const addressStringify = address => {
        return [
            address.address_line1,
            address.city + ', ' + address.state,
        ]
    }

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const readJsonFile = async (file) => {
        const fileText = await file.text()
        return JSON.parse(fileText)
    }

    const parseJsonFile = async (file) => {
        const incidentData = await readJsonFile(file)
        setUploadedData(incidentData)
    }

    useEffect(() => {
        if (stationId && uploadedData?.description?.event_opened) {
            const eventOpened = uploadedData.description.event_opened
            const eventOpenedDate = eventOpened.slice(0, 10)
            console.log(eventOpenedDate)
            getWeather(stationId, eventOpenedDate, eventOpenedDate)
        }
    }, [stationId, uploadedData]);

    useEffect(() => {
        if (location) {
            const apparatusEvents = []
            for (const apparatus of uploadedData.apparatus) {
                apparatusToEvent(apparatus, apparatusEvents)
            }
            apparatusEvents.push(location)

            setLocationList(apparatusEvents)
        }
    }, [location, uploadedData]);

    useEffect(() => {
        if (uploadedData?.address?.latitude && uploadedData?.address?.longitude) {
            const address = uploadedData.address
            setLocation({
                latitude: address.latitude,
                longitude: address.longitude,
                title: address.common_place_name,
                text: addressStringify(address)
            })
            getNearbyStation(address.latitude, address.longitude, setStationId)
        }
    }, [uploadedData]);

    useEffect(() => {
        // Parse file if one is uploaded
        if (selectedFile) {
            parseJsonFile(selectedFile)
        }
    }, [selectedFile]);

    return (
        <>
            <h2>Upload your file below:</h2>
            <div>
                <input type={"file"} onChange={onFileChange}/>
            </div>
            <Map locationList={locationList} />
        </>
    )
}

export default App
