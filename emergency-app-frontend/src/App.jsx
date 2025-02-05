import './App.css'
import { useState } from 'react';
import Map from "./components/Map.jsx"

function App() {
    const [selectedFile, setSelectedFile] = useState(null)
    const [lat, setLat] = useState(null)

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

    const readJsonFile = async (file) => {
        const fileText = await file.text()
        return JSON.parse(fileText)
    }

    const parseJsonFile = async(file) => {
        const incidentData = await readJsonFile(file)
        const address = incidentData.address
        setLat(address.latitude)
    }

    // Parse file if one is uploaded
    if (selectedFile) {
        parseJsonFile(selectedFile)
    }


  return (
    <>
        <h2>Upload your file below:</h2>
        <div>
            <input type={"file"} onChange={onFileChange} />
            {lat}
        </div>
        <Map/>
    </>
  )
}

export default App
