import './App.css'
import { useState } from 'react';
import Map from "./components/Map.jsx"

function App() {
    const [selectedFile, setSelectedFile] = useState(null)

    const onFileChange = (event) => {
        setSelectedFile(event.target.files[0])
    }

  return (
    <>
        <h2>Upload your file below:</h2>
        <div>
            <input type={"file"} onChange={onFileChange} />
        </div>
        <Map/>
    </>
  )
}

export default App
