import React from 'react';
import './Footer.css';
import logo from '../../assets/logo.svg';
import Twitter from '../../assets/Twitter.svg';
import Facebook from '../../assets/Facebook.svg';
import Instagram from '../../assets/Instagram.svg';
import LinkedIn from '../../assets/LinkedIn.svg';
import YouTube from '../../assets/YouTube.svg';

const Footer = () => {
    return (
        <footer>
            <div className="footerHead">
                <img src={logo} alt="logo"/>
                <p>©2020 Thousand Sunny. All rights reserved</p>
            </div>
            <hr/>
            <div className="footerBot">
                <ul>
                    <li>
                        <a href="https://www.x.com" target='_blank'>
                            <img src={Twitter} alt="Twitter"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.facebook.com" target='_blank'>
                            <img src={Facebook} alt="Facebook"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com" target='_blank'>
                            <img src={Instagram} alt="Instagram"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com" target='_blank'>
                            <img src={LinkedIn} alt="LinkedIn"/>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.youtube.com" target='_blank'>
                            <img src={YouTube} alt="YouTube"/>
                        </a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;