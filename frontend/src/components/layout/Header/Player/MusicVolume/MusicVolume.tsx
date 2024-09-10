import {faBars, faRepeat} from "@fortawesome/free-solid-svg-icons";
import React, { useState, ChangeEvent, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './MusicVolume.scss';

interface MusicVolumeProps {
    isRepeat: boolean;
    onBarsRepeatClick: () => void;
    onVolumeChange: (volume: number) => void;
}

const MusicVolume: React.FC<MusicVolumeProps> = ({isRepeat, onBarsRepeatClick, onVolumeChange }) => {
    const iconStyle = isRepeat ? { color: '#00aeff', fontSize: '24px' } : { fontSize: '24px' };
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        const slider = document.getElementById('volume') as HTMLInputElement;
        if (slider) {
            slider.style.backgroundSize = `${volume}% 2px`;
        }
    }, [volume]);

    const handleSliderChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(event.target.value);
        setVolume(value);
        onVolumeChange(value);
        event.target.style.backgroundSize = `${value}% 2px`;
    };

    return (
        <div className="music-setting">
            <div className="music-setting--column">
            <label className="music-setting__label" htmlFor="volume">{Math.floor(volume)}%</label>
            <input
                type="range"
                id="volume"
                className="music-setting__slider"
                min="0"
                max="100"
                value={volume}
                onChange={handleSliderChange}
            />
            </div>
            <button onClick={onBarsRepeatClick} className="player-controls__button-next">
                <FontAwesomeIcon icon={isRepeat ? faRepeat : faBars} style={iconStyle} />
            </button>
        </div>
    );
};

export default MusicVolume;
