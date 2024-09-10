import {setAmountTracks, setGenreMode} from "../../../../redux/actions/tracksActions.ts";
import { useNavigate } from 'react-router-dom';
import {useDispatch} from "react-redux";
import './SlideContainer.scss';
import React from 'react';

interface SlideContainerProps {
    isOpen: boolean;
}

const SlideContainer: React.FC<SlideContainerProps> = ({ isOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const links = [
        'Popular', 'New', 'Pop', 'Metal', 'Rock',
        'Electronic', 'Hip-hop', 'Rap',  'Club',  'Jazz', 'Classical', 'R&B',  'D&B',
        'Phonk', 'Trance', 'Aggressive', 'Sad', 'Joyful', 'Dreamy',
        'Mystical'
    ];

    const handleClick = (link: string) => {
        if (link === 'Popular') {
            navigate('/');
        } else if (link === 'New') {
            navigate('/new');
        } else {
            document.title = `${link}`;
            navigate(`/${link}`);
            dispatch(setGenreMode(link))
            dispatch(setAmountTracks(10));
        }
    };

    return (
        <div className={`slide-container ${isOpen ? 'open' : ''}`}>
            <div className="links">
                {links.map((link, index) => (
                    <span
                        key={index}
                        className="link"
                        onClick={() => handleClick(link)}
                    > {link} </span>
                ))}
            </div>
        </div>
    );
};

export default SlideContainer;
