import React, {useRef, useState} from 'react';
import './DestinationsSection.css';
import arrow from '../../../assets/arrow.svg';
import TripComponent from '../../common/TripComponent/TripComponent';
import {Link} from 'react-router-dom';
import {useDestinations} from '../../context/DestinationsContext';

const DestinationsSection = () => {
    const { destinations } = useDestinations();
    const [counter, setCounter] = useState(2);
    const mainRef = useRef();

    const handleShowMore = (e) => {
        e.preventDefault();
        setCounter((prevCounter) => prevCounter + 2);
    };

    console.log(destinations);

    if (!destinations || destinations.length === 0) {
        return (
            <section className="destinationsSection" ref={mainRef}>
                <div className="destinationsTitle">
                    <h1>Featured destinations</h1>
                    <Link to={'/catalog'}>
                        View all <img src={arrow} alt="arrow" />
                    </Link>
                </div>
                <p className="noDestinations">No destinations available.</p>
            </section>
        );
    }

    return (
        <section className="destinationsSection" ref={mainRef}>
            <div className="destinationsTitle">
                <h1>Featured destinations</h1>
                <Link to={'/catalog'}>
                    View all <img src={arrow} alt="arrow"/>
                </Link>
            </div>
            <div className="elements">
                {destinations.slice(0, counter).map((destination) => (
                    <TripComponent
                        key={destination.destination_id}
                        title={destination.name}
                        id={destination.destination_id}
                        country={destination.country}
                        picture={destination.picture}
                    />
                ))}
                {counter < destinations.length && (
                    <button className="blue-btn" onClick={handleShowMore}>
                        Show more
                    </button>
                )}
            </div>
        </section>
    );
    };

export default DestinationsSection;
