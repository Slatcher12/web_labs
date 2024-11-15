import React from 'react';
import './LearnMoreSection.css';
import Thousand from '../../assets/Thousand@2x.svg'

const LearnMoreSection = () => {
    return (
        <section className="learnMoreSection">
            <img src={Thousand} alt="Thousand 2"/>
            <div>
                <h1>A new way to explore the world</h1>
                <p>For decades travellers have reached for Lonely Planet books when looking to plan and execute their
                    perfect
                    trip, but now, they can also let Lonely Planet Experiences lead the way</p>
                <a className="learnMore" href="/">Learn more</a>
            </div>
        </section>
    );
};

export default LearnMoreSection;