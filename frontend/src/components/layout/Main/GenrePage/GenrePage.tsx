import {setAmountTracks, setGenreMode, setIsPlaying} from "../../../../redux/actions/tracksActions.ts";
import {faEllipsisV, faHeart, faDownload, faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
import { setTracks, setIndex } from "../../../../redux/actions/tracksActions.ts";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import genreImages from './genreImages.ts';
import genreTexts from './genreTexts.ts';
import './GenrePage.scss';

interface Track {
    src: string;
    imgSrc: string; // Ссылка на изображение будет приходить с сервера
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


const GenrePage: React.FC = () => {
    const dispatch = useDispatch();
    const amountTracks = useSelector((state: any) => state.amountTracks);
    const trackIndex = useSelector((state: any) => state.trackIndex);
    const isPlaying = useSelector((state: any) => state.isPlaying);
    const genreMode = useSelector((state: any) => state.genreMode);
    const tracks = useSelector((state: any) => state.tracks);
    const genreText = genreTexts[genreMode] || 'Unknown genre';
    const genreImage = genreImages[genreMode] || 'default.png';
    const pathname = window.location.pathname.slice(1);
    const popupRef = useRef<HTMLDivElement | null>(null);
    const [isLimited, setIsLimited] = useState(false);
    const [localtracks,setlocalTracks] = useState<Track[]>([]);
    const [activePopup, setActivePopup] = useState<{ index: number; x: number; y: number } | null>(null);

    const increaseAmountTracks = () => {
        dispatch(setAmountTracks(amountTracks + 5))
    };

    const fetchTopTracks = async (genreMode: string, index: number, amountTracks: number) => {
        if (trackIndex === index) {
            dispatch(setIsPlaying(!isPlaying));
        }
        try {
            const url: string = `/api/${genreMode}?amountTracks=${amountTracks}`;
            const response = await fetch(url);
            const data = await response.json();
            setlocalTracks(data.tracks);
            dispatch(setTracks(data.tracks));
            dispatch(setIndex(index));
        } catch (error) {
            console.error('Error when loading tracks:', error);
        }
    };

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
        const fetchTopTracks = async (genreMode: string, amountTracks: number) => {
            try {
                const url: string = `/api/${genreMode}?amountTracks=${amountTracks}`;
                const response = await fetch(url);
                const data = await response.json();
                setlocalTracks(data.tracks);
                setIsLimited(data.isLimited);

                const storedLikes = localStorage.getItem('LikesTracks');
                const likedTracks = storedLikes ? JSON.parse(storedLikes) : [];
                setlocalTracks(localtracks => localtracks.map(track => ({
                    ...track,
                    isLiked: likedTracks.some((t: Track) => t.name === track.name && t.autor === track.autor)
                })));

            } catch (error) {
                console.error('client:', error);
            }
        };

        fetchTopTracks(genreMode, amountTracks);
    }, [genreMode, amountTracks]);

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
        dispatch(setGenreMode(pathname));
        document.title = `${genreMode}`;
    }, [dispatch, genreMode, pathname]);


    return (
        <div className="genre-page-container">
            <div className="genre-page">
                <div className="genre-page__button">
                    <button className="genre-page__button-params">{genreMode}</button>
                </div>

                {localtracks.length > 0 ? (
                    localtracks.map((track, index) => (
                        <div key={index} className="genre-page__track">
                            <button onClick={() => fetchTopTracks(genreMode, index, amountTracks)} className="genre-page__track--img-btn">
                                <img
                                    src={`/api/images/${track.imgSrc}`}
                                    alt={track.name}
                                />
                                <FontAwesomeIcon
                                    icon={isPlaying && tracks[trackIndex].name === localtracks[index].name ? faPause : faPlay}
                                    className="play-icon"
                                />
                            </button>
                            <div className="genre-page__track__name">
                                <h3>{track.name}</h3>
                                <p>{track.autor}</p>
                            </div>
                            <button className="genre-page__track__name-button" onClick={(e) => handleClick(e, index)}>
                                <FontAwesomeIcon icon={faEllipsisV} />
                            </button>
                            {activePopup?.index === index && (
                                <div
                                    ref={popupRef}
                                    className="genre-page__track__popup"
                                    style={{ top: activePopup.y, left: activePopup.x }}
                                >
                                    <img src={`/api/images/${track.imgSrc}`} alt={track.name} />
                                    <div className="genre-page__track__modal-window">
                                        <h3>{track.name}</h3>
                                        <h5>{track.autor}</h5>
                                    </div>
                                    <button
                                        className={`genre-page__track__modal-window-button ${track.isLiked ? 'liked' : ''}`}
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
            <div className="genre-page-container-side">
                <img src={genreImage} alt={genreImage} />
                <p className="genre-page-container-side-text1">{genreMode}</p>
                <p className="genre-page-container-side-text2">{genreText}</p>
            </div>
        </div>
    );
};

export default GenrePage;
