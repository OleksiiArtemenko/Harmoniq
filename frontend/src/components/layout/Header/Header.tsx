import { setAmountTracks, setLoginStatus, setLogoutButtonAction } from "../../../redux/actions/tracksActions.ts";
import CurrentTrackName from "./CurrentTrackName/CurrentTrackName.tsx";
import SlideContainer from "./SlideContainer/SlideConteiner.tsx";
import HamburgerMenu from "./HamburgerMenu/HamburgerMenu.tsx";
import LogoutButton from "./LogoutButton/LogoutButton.tsx";
import Player from "./Player/Player.tsx";
import Modal from "./Modal/Modal.tsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import './Header.scss';

export default function Header() {
    const dispatch = useDispatch();
    const logoutButtonAction = useSelector((state: any) => state.logoutButtonAction);
    const loginStatus = useSelector((state: any) => state.loginStatus);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFirstRender, setIsFirstRender] = useState(true);

    const updateAmountTracks = () => {
        dispatch(setAmountTracks(10));
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const toggleModal = () => {
        loginStatus ? dispatch(setLogoutButtonAction(!logoutButtonAction)) : setIsModalOpen(!isModalOpen);
    };

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
        } else if (loginStatus) {
            setIsModalOpen(false);
        } else {
            setIsModalOpen(!isModalOpen);
        }
    }, [loginStatus]);

    useEffect(() => {
        const checkAuthToken = async () => {
            const token = localStorage.getItem('authToken');

            if (token) {
                try {
                    const response = await fetch('/api/validate-token', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        dispatch(setLoginStatus(true));
                    } else {
                        localStorage.removeItem('authToken');
                        dispatch(setLoginStatus(false));
                    }
                } catch (error) {
                    console.error('Error validating token:', error);
                    localStorage.removeItem('authToken');
                    dispatch(setLoginStatus(false));
                }
            } else {
                dispatch(setLoginStatus(false));
            }
        };

        checkAuthToken().catch(error => {
            console.error('Error in checkAuthToken function:', error);
        });
    }, [dispatch]);

    return (
        <>
            <header className="header">
                <HamburgerMenu isOpen={isOpen} toggleMenu={toggleMenu} />
                <SlideContainer isOpen={isOpen} />
                <CurrentTrackName />
                <Player />
                <button className="header--button_login" onClick={toggleModal}>
                    {loginStatus ? (
                        <>
                            <FontAwesomeIcon icon={faUser} />
                            <div className="header--button_login-text" >
                                User
                            </div>
                        </>
                    ) : (
                        <>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="header--button_login--svg_size">
                                <path d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25" />
                            </svg>
                            <div className="header--button_login-text" >
                                Sign in
                            </div>
                        </>
                    )}
                </button>
                <LogoutButton />
            </header>

            <div className="popular-new">
                <Link
                    onClick={() => updateAmountTracks()}
                    to="/"
                    className="popular-new--button"
                >
                    Popular
                </Link>
                <Link
                    onClick={() => updateAmountTracks()}
                    to="/new"
                    className="popular-new--button"
                >
                    New
                </Link>
                <Link to="/about" className="popular-new--button">
                    About
                </Link>
            </div>

            <Modal isOpen={isModalOpen} onClose={toggleModal} />
        </>
    );
}
