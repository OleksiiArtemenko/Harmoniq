import { setAmountTracks, setIsPlaying, setTracks, setIndex } from "../../../../redux/actions/tracksActions.ts";
import { faEllipsisV, faHeart, faDownload, faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import mainImage from '../../../../assets/side_images/Search.jpg';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../MainPage/MainPage.scss';

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
    isLiked?: boolean;
}

const MainPage: React.FC = () => {
    const dispatch = useDispatch();
    const searchInput = useSelector((state: any) => state.searchInput);
    const isPlaying = useSelector((state: any) => state.isPlaying);
    const trackIndex = useSelector((state: any) => state.trackIndex);
    const amountTracks = useSelector((state: any) => state.amountTracks);

    const popupRef = useRef<HTMLDivElement | null>(null);
    const [isLimited, setIsLimited] = useState(false);
    const [localtracks,setlocalTracks] = useState<Track[]>([]);
    const [activePopup, setActivePopup] = useState<{ index: number; x: number; y: number } | null>(null);

    const increaseAmountTracks = () => {
        dispatch(setAmountTracks(amountTracks + 5))
    };

    const fetchTracksBySearchQuery = async (searchQuery: string, index: number, amountTracks: number) => {
        if (trackIndex === index) {
            dispatch(setIsPlaying(!isPlaying));
        }
        try {
            const response = await fetch(`/api/search-tracks?q=${encodeURIComponent(searchQuery)}&amountTracks=${amountTracks}`);
            const data = await response.json();

            setlocalTracks(data.tracks);
            dispatch(setTracks(data.tracks));
            dispatch(setIndex(index));

        } catch (error) {
            console.error('Error uploading track:', error);
        }
    };

    useEffect(() => {
        const fetchTracksBySearchQuery = async (searchQuery: string, amountTracks: number) => {
            try {
                const response = await fetch(`/api/search-tracks?q=${encodeURIComponent(searchQuery)}&amountTracks=${amountTracks}`);
                const data = await response.json();

                setlocalTracks(data.tracks);
                setIsLimited(data.isLimited);

                const storedLikes = localStorage.getItem('LikesTracks');
                const likedTracks = storedLikes ? JSON.parse(storedLikes) : [];
                setlocalTracks(localTracks => localTracks.map(track => ({
                    ...track,
                    isLiked: likedTracks.some((t: Track) => t.name === track.name && t.autor === track.autor)
                })));
            } catch (error) {
                console.error('Error uploading track:', error);
            }
        };

        if (searchInput) {
            fetchTracksBySearchQuery(searchInput, amountTracks);
        }
    }, [searchInput, amountTracks, dispatch]);


    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        e.stopPropagation();
        const { clientX, clientY } = e;
        setActivePopup({ index, x: clientX - 258, y: clientY });
    };

    const handleClickOutside = (e: MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
            setActivePopup(null);
        }
    };

    const toggleLike = (track: Track) => {
        const storedTracks = localStorage.getItem('LikesTracks');
        const LikesTracks = storedTracks ? JSON.parse(storedTracks) : [];
        const isTrackInLikes = LikesTracks.some((t: Track) => t.name === track.name && t.autor === track.autor);

        if (isTrackInLikes) {
            const updatedLikes = LikesTracks.filter((t: Track) => !(t.name === track.name && t.autor === track.autor));
            localStorage.setItem('LikesTracks', JSON.stringify(updatedLikes));
        } else {
            LikesTracks.push(track);
            localStorage.setItem('LikesTracks', JSON.stringify(LikesTracks));
        }

        setlocalTracks(localtracks.map(t => t.name === track.name && t.autor === track.autor ? { ...t, isLiked: !isTrackInLikes } : t));
    };

    const downloadTrack = (filename: string) => {
        const link = document.createElement('a');
        link.href = `/api/download/${filename}`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        if (activePopup !== null) {
            document.addEventListener('click', handleClickOutside);
        } else {
            document.removeEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [activePopup]);

    useEffect(() => {
        document.title = 'Search Song';
    }, []);


    return (
        <div className="music-list-container">
            <div className="music-list">
                <div className="music-list__button">
                    <button className="music-list__button-search">Search</button>
                </div>

                {localtracks.length > 0 ? (
                    localtracks.map((track, index) => (
                        <div key={index} className="music-list__track">
                            <button onClick={() => fetchTracksBySearchQuery(searchInput, index, amountTracks)} className="music-list__track--img-btn">
                                <img
                                    src={`/api/images/${track.imgSrc}`}
                                    alt={track.name}
                                />
                                <FontAwesomeIcon
                                    icon={isPlaying && trackIndex === index ? faPause : faPlay}
                                    className="play-icon"
                                />
                            </button>
                            <div className="music-list__track__name">
                                <h3>{track.name}</h3>
                                <p>{track.autor}</p>
                            </div>
                            <button className="music-list__track__name-button" onClick={(e) => handleClick(e, index)}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            {activePopup?.index === index && (
                                <div
                                    ref={popupRef}
                                    className="music-list__track__popup"
                                    style={{ top: activePopup.y, left: activePopup.x }}
                                >
                                    <img src={`/api/images/${track.imgSrc}`} alt={track.name} />
                                    <div className="music-list__track__modal-window">
                                        <h3>{track.name}</h3>
                                        <h5>{track.autor}</h5>
                                    </div>
                                    <button
                                        className={`music-list__track__modal-window-button ${track.isLiked ? 'liked' : ''}`}
                                        onClick={() => toggleLike(track)}
                                    >
                                        <FontAwesomeIcon icon={faHeart} style={{ fontSize: '24px', marginInline: '10px' }} />
                                        {track.isLiked ? 'Unlike' : 'Like'}
                                    </button>
                                    <button
                                        onClick={() => downloadTrack(track.src.split('/').pop() || '')}
                                        className="music-list__track__modal-window-button"
                                    >
                                        <FontAwesomeIcon icon={faDownload} style={{fontSize: '24px', marginInline: '10px'}}/>
                                        Download
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <h1 style={{padding: '1rem', fontWeight: 'bold'}}>Nothing 🥺</h1>
                )}
                {!isLimited && (
                    <button
                        className="add-amountTracks"
                        onClick={increaseAmountTracks}>
                        Upload more
                    </button>
                )}
            </div>
            <div className="music-list-container-side">
                <img src={mainImage} alt="main" />
                <p className="music-list-container-side-text1">Search songs</p>
                <p className="music-list-container-side-text2">
                    Hope you found what you were looking for!
                </p>
            </div>
        </div>
    );
};

export default MainPage;
