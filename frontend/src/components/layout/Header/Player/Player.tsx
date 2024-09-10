import React, { useState, useRef, useEffect } from 'react';
import { setIndex, setIsPlaying } from "../../../../redux/actions/tracksActions.ts";
import PlayerControls from './PlayerControls/PlayerControls.tsx';
import TrackContainer from "./TrackContainer/TrackConteiner.tsx";
import MusicVolume from "./MusicVolume/MusicVolume.tsx";
import SearchSong from "./SearchSong/SearchSong.tsx";
import { useDispatch, useSelector } from 'react-redux';
import './Player.scss';

const Player: React.FC = () => {
    const dispatch = useDispatch();
    const tracks = useSelector((state: any) => state.tracks);
    const trackIndex = useSelector((state: any) => state.trackIndex);
    const isPlaying = useSelector((state: any) => state.isPlaying);
    const [bufferedPercentage, setBufferedPercentage] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(99);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isRepeat, setIsRepeat] = useState(false);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);

    const handlePlayPauseClick = () => {
        if (tracks.length > 0) {
            dispatch(setIsPlaying(!isPlaying));
            if (audioRef.current) {
                if (isPlaying) {
                    audioRef.current.pause();
                } else {
                    audioRef.current.play().catch(error => {
                        console.error('Error playing audio:', error);
                    });
                }
            }
        } else {
            console.log('No tracks available for playback.');
        }
    };


    const handleBarsRepeatClick = () => {
        setIsRepeat(!isRepeat);
    };

    const handlePrevClick = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    };

    const handleNextClick = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const handleVolumeChange = (newVolume: number) => {
        setVolume(newVolume);
    };

    const handleTrackEnd = () => {
        if (isRepeat && audioRef.current) {
            audioRef.current.play().catch(error => {
                console.error('Error replaying audio:', error);
            });
        } else {
            handleNextClick();
        }
    };


    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (percentage: number) => {
        if (audioRef.current) {
            const duration = audioRef.current.duration;
            audioRef.current.currentTime = (percentage / 100) * duration;
        }
    };

    useEffect(() => {
        const favicon = document.getElementById('favicon') as HTMLLinkElement;
        if (favicon) {
            favicon.href = `/${isPlaying ? 'play.png' : 'pause.png'}`;
        }
        const updateTime = () => {
            if (audioRef.current) {
                setCurrentTime(audioRef.current.currentTime);
            }
        };
        const intervalId = setInterval(updateTime, 1000);
        return () => clearInterval(intervalId);
    }, [isPlaying]);

    useEffect(() => {
        dispatch(setIndex(currentTrackIndex));
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => {
                    console.error('Error playing audio:', error);
                });
            } else {
                audioRef.current.pause();
            }
            audioRef.current.volume = volume / 100;
        }
    }, [dispatch, currentTrackIndex, isPlaying, volume]);

    useEffect(() => {
        const updateProgress = () => {
            if (audioRef.current) {
                const duration = audioRef.current.duration;
                if (duration === 0) return;

                const bufferedEnd = audioRef.current.buffered.length > 0
                    ? audioRef.current.buffered.end(0)
                    : 0;
                const bufferedPercentage = (bufferedEnd / duration) * 100;
                const progress = (audioRef.current.currentTime / duration) * 100;

                setBufferedPercentage(bufferedPercentage);
                setProgressPercentage(progress);
            }
        };
        const intervalId = setInterval(updateProgress, 100);
        return () => clearInterval(intervalId);
    }, []);

    useEffect(() => {
        setCurrentTrackIndex(trackIndex);
    }, [trackIndex]);

    return (
        <div className="player">
            <div className="player__container">
                {tracks.length > 0 && tracks[currentTrackIndex]?.imgSrc && (
                    <img
                        className="player__container-img"
                        src={`/api/images/${tracks[currentTrackIndex]?.imgSrc}`}
                        alt={tracks[currentTrackIndex]?.name || 'Track Image'}
                    />
                )}
                <PlayerControls
                    isPlaying={isPlaying}
                    onPlayPauseClick={handlePlayPauseClick}
                    onPrevClick={handlePrevClick}
                    onNextClick={handleNextClick}/>
                <audio
                    ref={audioRef}
                    src={tracks[currentTrackIndex]?.src}
                    onEnded={handleTrackEnd}
                    onLoadedMetadata={handleLoadedMetadata}
                />
                <div>
                    <TrackContainer
                        bufferedPercentage={bufferedPercentage}
                        progressPercentage={progressPercentage}
                        onSeek={handleSeek}
                    />
                    <div className="player__container__duration-text">
                        <div>{formatTime(currentTime)}</div>
                        <div>{formatTime(duration)}</div>
                    </div>
                </div>
                <MusicVolume
                    isRepeat={isRepeat}
                    onBarsRepeatClick={handleBarsRepeatClick}
                    onVolumeChange={handleVolumeChange}
                />
            </div>
            <SearchSong/>
        </div>
    );
};

export default Player;
