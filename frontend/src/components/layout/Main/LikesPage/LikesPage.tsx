import { setIndex, setTracks } from "../../../../redux/actions/tracksActions.ts";
import mainImage from '../../../../assets/side_images/fav_playlist.png';
import { faPause, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from 'react';
import './LikesPage.scss';

interface Track {
    src: string;
    imgSrc: string;
    name: string;
    autor: string;
    genre: string;
    secondaryParam: string;
    listening: {
        day: number;
        month: number;
        week: number;
    };
}

const LikesPage: React.FC = () => {
    const dispatch = useDispatch();
    const trackIndex = useSelector((state: any) => state.trackIndex);
    const isPlaying = useSelector((state: any) => state.isPlaying);
    const tracks = useSelector((state: any) => state.tracks);
    const [likesTracks, setLikesTracks] = useState<Track[]>([]);

    useEffect(() => {
        document.title = 'Favorite songs'
        const storedTracks = localStorage.getItem('LikesTracks');
        if (storedTracks) {
            setLikesTracks(JSON.parse(storedTracks));
        }
    }, []);

    const handleRemoveTrack = (trackToRemove: Track) => {
        const updatedTracks = likesTracks.filter(track => track !== trackToRemove);
        setLikesTracks(updatedTracks);
        localStorage.setItem('LikesTracks', JSON.stringify(updatedTracks));
    };

    const fetchLikesTracks = async (index: number) => {
        try {
            dispatch(setTracks(likesTracks));
            dispatch(setIndex(index));
        } catch (error) {
            console.error('Error when loading tracks:', error);
        }
    };

    return (
        <div className="likes-list-container">
            <div className="likes-list">
                {likesTracks.length > 0 ? (
                    likesTracks.map((track, index) => (
                        <div key={index} className="likes-list__track">
                            <button onClick={() => fetchLikesTracks(index)} className="likes-list__track--img-btn">
                                <img
                                    src={`/api/images/${track.imgSrc}`}
                                    alt={track.name} />

                                <FontAwesomeIcon
                                    icon={isPlaying && tracks[trackIndex].name === likesTracks[index].name ? faPause : faPlay}
                                    className="playLikes-icon"
                                />
                            </button>
                            <div className="likes-list__track__name">
                                <h3>{track.name}</h3>
                                <p>{track.autor}</p>
                            </div>
                            <button
                                className="likes-list__track__name-button"
                                onClick={() => handleRemoveTrack(track)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))
                ) : (
                    <p style={{
                        fontWeight: 'bold',
                        padding: '1rem',
                        color: 'gray',
                        fontStyle: 'italic',
                        textAlign: 'center'
                    }}>
                        No favorite tracks yet.
                    </p>
                )}
            </div>

            <div className="likes-list-container-side">
                <img className='likes-list-container-side-img' src={mainImage} alt="main" />
                <p className="likes-list-container-side-text1">Favorite songs</p>
                <p className="likes-list-container-side-text2">To add a song to the playlist use ♥</p>
            </div>
        </div>
    );
};

export default LikesPage;
