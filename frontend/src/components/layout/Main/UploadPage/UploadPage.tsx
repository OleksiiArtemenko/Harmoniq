import { useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import './UploadPage.scss'

const UploadPage: React.FC = () => {
    const navigate = useNavigate();
    const [autor, setAutor] = useState('')
    const [genre, setGenre] = useState('')
    const [trackName, setTrackName] = useState('')
    const [secondaryParam, setSecondaryParam] = useState('')
    const [src, setSrc] = useState<File | null>(null)
    const [imgSrc, setImgSrc] = useState<File | null>(null)
    const [imgShow, setImgShow] = useState<string | null>(null)

    const handleSave = async () => {
        if (!src || !imgSrc) {
            console.error("Please upload both music and image files.")
            return
        }

        const formData = new FormData()
        formData.append("music", src)
        formData.append("image", imgSrc)
        formData.append("name", trackName)
        formData.append("autor", autor)
        formData.append("genre", genre)
        formData.append("secondaryParam", secondaryParam)
        formData.append("listening_day", "0")
        formData.append("listening_week", "0")
        formData.append("listening_month", "0")

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            })
            if (response.ok) {
                console.log("Track uploaded successfully!")
            } else {
                console.error("Failed to upload track.")
            }
        } catch (error) {
            console.error("Error uploading track:", error)
        }
        navigate('/new');
    }

    const isFormValid = trackName && autor && genre && src && imgSrc && secondaryParam

    return (
        <div className="upload-page-container">
            <div className="upload-page-container-side">
                <img src={imgShow || "https://via.placeholder.com/150"} alt="Track Cover" />
                <div className="upload-page-container-side-text1">
                    {trackName || "Track Name"}
                </div>
                <div className="upload-page-container-side-text2">
                    {autor || "Author"}
                </div>
            </div>
            <div className="upload-page">
                <h1>Add New Track</h1>
                <form className="add-track-form">
                    <div className="form-group">
                        <label htmlFor="trackName">Track Name</label>
                        <input
                            type="text"
                            id="trackName"
                            value={trackName}
                            onChange={(e) => setTrackName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="autor">Autor</label>
                        <input
                            type="text"
                            id="autor"
                            value={autor}
                            onChange={(e) => setAutor(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="genre">Genre</label>
                        <input
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="secondaryParam">Secondary Param</label>
                        <input
                            type="text"
                            id="secondaryParam"
                            value={secondaryParam}
                            onChange={(e) => setSecondaryParam(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="src">Track Source (mp3)</label>
                        <input
                            type="file"
                            id="src"
                            accept=".mp3"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setSrc(file)
                                }
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="imgSrc">Image Source</label>
                        <input
                            type="file"
                            id="imgSrc"
                            accept=".png, .jpg, .jpeg"
                            onChange={(e) => {
                                const file = e.target.files?.[0]
                                if (file) {
                                    setImgSrc(file)
                                    setImgShow(URL.createObjectURL(file))
                                }
                            }}
                        />
                    </div>
                    <button type="button" onClick={handleSave} disabled={!isFormValid}>
                        Save Track
                    </button>
                </form>
            </div>
        </div>
    )
}

export default UploadPage
