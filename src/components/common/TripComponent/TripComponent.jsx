import React from "react";
import {Link} from "react-router-dom";
import './TripComponent.css'

const TripComponent = ({title, id, country, picture}) => {
    return (
        <div className="element">
            <Link to={`/catalog/${id}`} className='avatar'
                 style={{backgroundImage: `url(${picture})`}}
            ></Link>
            <div className='element__info'>
                <h3 className="h3">{title}</h3>
                <h4 className="h4">{country}</h4>
            </div>

        </div>
    );
};

export default TripComponent;