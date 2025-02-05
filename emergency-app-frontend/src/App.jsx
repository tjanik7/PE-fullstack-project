import './App.css'
import { useEffect, useState } from 'react';
import Map from "./components/Map.jsx"

function App() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadedData, setUploadedData] = useState(null)
    const [location, setLocation] = useState(null)
    const [locationList, setLocationList] = useState([])

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
        if (location) {
            setLocationList([location])
        }
    }, [location]);

    useEffect(() => {
        if (uploadedData?.address?.latitude && uploadedData?.address?.longitude) {
            const address = uploadedData.address
            setLocation({
                latitude: address.latitude,
                longitude: address.longitude,
                title: address.common_place_name,
                text: addressStringify(address)
            })

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
