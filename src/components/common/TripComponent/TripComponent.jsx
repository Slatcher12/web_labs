import React from "react";

const TripComponent = ({ imageSrc, title, location, description }) => {
    return (
            <div className="element">
                <img src={imageSrc} alt="{title}"/>
                <div className="elementText">
                    <h4>{title}</h4>
                    <p>{location}</p>
                    <p>{description}</p>
                </div>
            </div>
    );
};

export default TripComponent;