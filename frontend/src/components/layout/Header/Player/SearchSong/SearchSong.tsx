import { setAmountTracks, setSearchInput } from "../../../../../redux/actions/tracksActions.ts";
import { faMagnifyingGlass, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import React, { useState } from 'react';
import './SearchSong.scss';

const SearchSong: React.FC = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        dispatch(setAmountTracks(10))
        dispatch(setSearchInput(searchTerm));
        navigate('/search');
    };

    return (
        <div className="container">
            <input
                type="text"
                placeholder="Search - enter the song title"
                value={searchTerm}
                onChange={handleInputChange}
                className="input"
            />
            <button
                onClick={handleSearch}
                className="button-search"
                disabled={!searchTerm.trim()}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
            <div className="button-placement">
                <Link to="/Likes" className="button-likes">
                    <FontAwesomeIcon icon={faStar}/>
                </Link>
            </div>
        </div>
    );
};

export default SearchSong;
