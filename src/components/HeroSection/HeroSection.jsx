import React, { useState } from 'react';
import './HeroSection.css';
import thousand from '../../assets/thousand.svg';

const HeroSection = () => {
    const [isVisible, setIsVisible] = useState(true); // Стан для контролю видимості

    const toggleVisibility = () => {
        setIsVisible(prev => !prev); // Перемикання видимості
    };

    return (
        <section className="heroSection">
            <button onClick={toggleVisibility}>
                {isVisible ? 'Сховати секцію' : 'Показати секцію'}
            </button>
            {isVisible && ( // Рендеринг секції тільки якщо isVisible - true
                <div>
                    <h1>Explore and Travel</h1>
                    <h2>Holiday finder</h2>
                    <hr />
                    <form>
                        <label>
                            <select defaultValue="">
                                <option value="" disabled hidden>Локація</option>
                                <option>опція 1</option>
                                <option>опція 2</option>
                            </select>
                            <select defaultValue="">
                                <option value="" disabled hidden>Активність</option>
                                <option>опція 1</option>
                                <option>опція 2</option>
                            </select>
                            <select defaultValue="">
                                <option value="" disabled hidden>Рейтинг</option>
                                <option>опція 1</option>
                                <option>опція 2</option>
                            </select>
                            <select defaultValue="">
                                <option value="" disabled hidden>Дата</option>
                                <option>опція 1</option>
                                <option>опція 2</option>
                            </select>
                        </label>
                        <button type="button" className="explore">Дослідити</button>
                    </form>
                </div>
            )}
            {isVisible && <img src={thousand} alt="Thousand 1" />}
        </section>
    );
};

export default HeroSection;
