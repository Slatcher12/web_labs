import React from 'react';
import './HeroSection.css';
import thousand from '../../../assets/thousand.svg';

const HeroSection = () => {


    return (
        <section className="heroSection">

                <div>
                    <h1>Explore and Travel</h1>
                    <h2>Holiday finder</h2>
                    <hr />
                    <form>
                        <label>
                            <select defaultValue="">
                                <option value="" disabled hidden>Location</option>
                                <option>option 1</option>
                                <option>option 2</option>
                            </select>
                            <select defaultValue="">
                                <option value="" disabled hidden>Activity</option>
                                <option>option 1</option>
                                <option>option 2</option>
                            </select>
                            <select defaultValue="">
                                <option value="" disabled hidden>Rating</option>
                                <option>option 1</option>
                                <option>option 2</option>
                            </select>
                            <select defaultValue="">
                                <option value="" disabled hidden>Date</option>
                                <option>option 1</option>
                                <option>option 2</option>
                            </select>
                        </label>
                        <button type="button" className="explore">Explore</button>
                    </form>
                </div>
            <img src={thousand} alt="Thousand" />
        </section>
    );
};

export default HeroSection;
