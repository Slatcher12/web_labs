import React from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useDestinations} from "../context/DestinationsContext";
import starIcon from '../../assets/star.png';
import './ItemPage.css';

const ItemPage: React.FunctionComponent = () => {
    const { id } = useParams();
    const { destinations } = useDestinations();
    const destination = destinations.find(d => d.destination_id === Number(id));
    const navigate = useNavigate();

    if (!destination) {
        return <div className='item-page'>Destination not found</div>;
    }

    return (
        <div className='item-page'>
            <div className='info'>
                <img className='avatar' src={destination.picture} alt={destination.name} />
                <div className='details'>
                    <div className='filters'>
                        <div className='rate-item-page'>
                            {destination.rating}
                            <img width={20} height={20} src={starIcon} alt='stars'/>
                        </div>
                        <div className='location-item-page'>{destination.country}</div>
                        <button className='go-back-button' onClick={() => navigate(-1)}>Go back</button>
                    </div>
                    <h1 className='name-item-page'>{destination.name}</h1>
                    <h2 className='description-item-page'>{destination.description}</h2>
                    <h5 className='price-item-page'>Price: {destination.price} $</h5> {/* Переміщено під опис */}
                </div>
            </div>
        </div>
    );
};

export default ItemPage;
