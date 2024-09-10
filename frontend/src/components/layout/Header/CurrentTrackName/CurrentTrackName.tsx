import { useSelector } from 'react-redux';
import './CurrentTrackName.scss'

export default function CurrentTrackName() {

    const tracks = useSelector((state: any) => state.tracks);
    const trackIndex = useSelector((state: any) => state.trackIndex);

    return (
        <>
            {tracks.length > 0 && (
                <div className="currentTrackName">
                    <img
                        src={`/api/images/${tracks[trackIndex].imgSrc}`}
                        alt={tracks[trackIndex].name}
                    />
                    <div className="currentTrackName__text">
                        {tracks[trackIndex].autor}&nbsp;-&nbsp;{tracks[trackIndex].name}
                    </div>
                </div>
            )}
        </>
    );

}