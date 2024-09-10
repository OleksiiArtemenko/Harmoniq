import { faPlay, faPause, faForward, faBackward } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './PlayerControls.scss';
import React from 'react';

interface PlayerControlsProps {
    isPlaying: boolean;
    onPlayPauseClick: () => void;
    onPrevClick: () => void;
    onNextClick: () => void;
}

const PlayerControls: React.FC<PlayerControlsProps> = ({ isPlaying, onPlayPauseClick, onPrevClick, onNextClick }) => {
    return (
        <div className="player-controls">
            <button onClick={onPrevClick} className="player-controls__button-next">
                <FontAwesomeIcon icon={faBackward} />
            </button>
            <button onClick={onPlayPauseClick} className="player-controls__button">
                <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
            </button>
            <button onClick={onNextClick} className="player-controls__button-next">
                <FontAwesomeIcon icon={faForward} />
            </button>
        </div>
    );
};

export default PlayerControls;