import React from 'react';
import './HamburgerMenu.scss';

interface HamburgerMenuProps {
    isOpen: boolean;
    toggleMenu: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ isOpen, toggleMenu }) => {
    return (
        <div className="hamburger-menu" onClick={toggleMenu}>
            <div className={`bar ${isOpen ? 'open' : ''} bar1`}></div>
            <div className={`bar ${isOpen ? 'open' : ''} bar2`}></div>
            <div className={`bar ${isOpen ? 'open' : ''} bar3`}></div>
        </div>
    );
};

export default HamburgerMenu;
