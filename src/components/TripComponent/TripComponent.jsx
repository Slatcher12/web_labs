import RajaAmpatIndonesia from "../../assets/RajaAmpatIndonesia.svg";
import FanjingshanChina from "../../assets/FanjingshanChina.svg";
import VeveySwitzerland from "../../assets/VeveySwitzerland.svg";
import SkadarMontenegro from "../../assets/SkadarMontenegro.svg";
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
            // <div className="element">
            //     <img src={FanjingshanChina} alt="FanjingshanChina"/>
            //     <div className="elementText">
            //         <h4>Fanjingshan</h4>
            //         <p>China</p>
            //     </div>
            // </div>
            // <div className="element">
            //     <img src={VeveySwitzerland} alt="VeveySwitzerland"/>
            //     <div className="elementText">
            //         <h4>Vevey</h4>
            //         <p>Switzerland</p>
            //     </div>
            // </div>
            // <div className="element">
            //     <img src={SkadarMontenegro} alt="SkadarMontenegro"/>
            //     <div className="elementText">
            //         <h4>Skadar</h4>
            //         <p>Montenegro</p>
            //     </div>
            // </div>
    );
};

export default TripComponent;