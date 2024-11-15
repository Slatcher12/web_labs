import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef(null);
    const headerDivRef = useRef(null);

    const toggleBurger = () => {
        setIsOpen(!isOpen);
    };

    const checkScreenWidth = () => {
        const header = headerDivRef.current;
        const nav = navRef.current;
        const width = window.innerWidth;

        if (header && nav) {
            if (width > 1100) {
                nav.style.display = "flex";
                nav.style.flexDirection = "row";
                nav.style.alignItems = "center";
                setIsOpen(false);
            } else if (width <= 1100 && !isOpen) {
                nav.style.display = "none";
            }
        }
    };

    useEffect(() => {
        window.addEventListener("resize", checkScreenWidth);
        checkScreenWidth();
        return () => {
            window.removeEventListener("resize", checkScreenWidth);
        };
    }, [isOpen]);

    return (
        <header>
            <div id="header" ref={headerDivRef}>
                <img src={logo} alt="logo"/>
                <nav ref={navRef} className={isOpen ? 'open' : ''}>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Destinations</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Partner</a></li>
                    </ul>
                    <div className="signButtons">
                        <a className="login" href="#">Login</a>
                        <a className="register" href="#">Register</a>
                    </div>
                </nav>
                <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleBurger}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
            <div className='container'>
                <nav ref={navRef} className={isOpen ? 'open' : ''}>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/">Destinations</a></li>
                        <li><a href="/">About</a></li>
                        <li><a href="/">Partner</a></li>
                    </ul>
                    <div className="signButtons">
                        <a className="login" href="/">Login</a>
                        <a className="register" href="/">Register</a>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;