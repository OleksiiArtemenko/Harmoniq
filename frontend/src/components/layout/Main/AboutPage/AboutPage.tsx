import { setAmountTracks, setGenreMode, setSearchInput } from "../../../../redux/actions/tracksActions.ts";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import './AboutPage.scss'

const categories = {
    genres: ['Pop', 'Metal', 'Rock', 'Electronic', 'Hip-hop', 'Rap', 'Club', 'Jazz', 'Classical', 'R&B', 'D&B', 'Phonk', 'Trance'],
    moods: ['Aggressive', 'Sad', 'Joyful', 'Dreamy', 'Mystical'],
    years: ['Timeless Hits', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'],
    languages: ['English', 'French', 'Spanish', 'Arabic', 'Kazakh'],
};

const AboutPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if(searchTerm.trim()) {
            dispatch(setAmountTracks(10))
            dispatch(setSearchInput(searchTerm));
            navigate('/search');
        }
    };

    useEffect(() => {
        document.title = 'About the site';
    }, []);

    return (
        <>
            <div className="AboutPage">
                <span className="AboutPage__text1">
                    Music review and search
                </span>
                <div className="search-container--about">
                    <input
                        type="text"
                        placeholder="Search - enter the song title"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="input--about"
                    />
                    <button
                        onClick={handleSearch}
                        className="button-search--about"
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass}/>
                    </button>

                </div>
                <div className="AboutPage__category-selection">
                    <CategoryBlock title="Genres" items={categories.genres}/>
                    <CategoryBlock title="Moods" items={categories.moods}/>
                    <CategoryBlock title="Years" items={categories.years}/>
                    <CategoryBlock title="Languages" items={categories.languages}/>
                </div>
            </div>
            <div className="AboutPage">
                <span className="AboutPage__text1">
                    Music for Every Taste
                </span>
                <div className="AboutPage__text2">
                    Choose your music by year and genre, for any activity or mood.
                    Daily updates. This category features only the best and most popular songs,
                    and if you can't find something, you can always use the quick and convenient music search.
                    You can download your favorite tracks and add them to your personal playlist.<br/>
                    Go to <Link className="AboutPage__category-item" to="/Likes">Your Playlist&nbsp;</Link>
                </div>
            </div>
        </>
    )
}

interface CategoryBlockProps {
    title: string;
    items: string[];
}

const CategoryBlock: React.FC<CategoryBlockProps> = ({ title, items }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClick = (item: string) => {
        navigate(`/${item}`);
        dispatch(setGenreMode(item))
        dispatch(setAmountTracks(10));
    };

    return (
        <div className="AboutPage__category-block">
            <h3>{title}</h3>
            <div className="AboutPage__category-items">
                {items.map((item, index) => (
                    <button
                        onClick={() => handleClick(item)}
                        key={index}
                        className="AboutPage__category-item"
                        disabled={title === 'Years' || title === 'Languages'}>
                        {item}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AboutPage;