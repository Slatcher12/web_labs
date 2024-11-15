import React from 'react';
import './DestinationsSection.css';
import arrow from '../../assets/arrow.svg';

import RajaAmpatIndonesia from '../../assets/RajaAmpatIndonesia.svg';
import FanjingshanChina from '../../assets/FanjingshanChina.svg';
import VeveySwitzerland from '../../assets/VeveySwitzerland.svg';
import SkadarMontenegro from '../../assets/SkadarMontenegro.svg';
import TripComponent from "../TripComponent/TripComponent";

const DestinationsSection = () => {
    return (
        <section className="destinationsSection">
            <div className="destinationsTitle">
                <h1>Featured destinations</h1>
                <a href="#">View all <img src={arrow} alt="arrow"/></a>
            </div>
            <div className="elements">
                <TripComponent
                    imageSrc={RajaAmpatIndonesia}
                    title="Raja Ampat"
                    location="Indonesia"
                    description=""
                />
                <TripComponent
                    imageSrc={FanjingshanChina}
                    title="Fanjingshan"
                    location="China"
                    description=""
                />
                <TripComponent
                    imageSrc={RajaAmpatIndonesia}
                    title="Raja Ampat"
                    location="Indonesia"
                    description=""
                />
                <TripComponent
                    imageSrc={RajaAmpatIndonesia}
                    title="Raja Ampat"
                    location="Indonesia"
                    description=""
                />
            </div>
        </section>
    );
};

export default DestinationsSection;