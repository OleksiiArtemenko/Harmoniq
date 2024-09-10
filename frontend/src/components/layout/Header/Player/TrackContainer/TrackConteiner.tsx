import './TrackConteiner.scss';
import React from 'react';

interface TrackContainerProps {
    bufferedPercentage: number;
    progressPercentage: number;
    onSeek: (newTime: number) => void;
}

const TrackContainer: React.FC<TrackContainerProps> = ({ bufferedPercentage, progressPercentage, onSeek }) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const containerRect = container.getBoundingClientRect();
        const clickX = event.clientX - containerRect.left;
        const containerWidth = containerRect.width;
        const clickPercentage = (clickX / containerWidth) * 100;
        onSeek(clickPercentage);
    };

    return (
        <div className="track-container" onClick={handleClick}>
            <div
                className="track-buffered"
                style={{ width: `${bufferedPercentage}%` }}
            ></div>
            <div
                className="track-progress"
                style={{ width: `${progressPercentage}%` }}
            ></div>
            <div className="track-label">Track Name</div>
        </div>
    );
};

export default TrackContainer;
