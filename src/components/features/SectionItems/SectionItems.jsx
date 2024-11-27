import React, {useEffect, useState} from 'react';
import './SectionItems.css';
import {useDestinations} from "../../context/DestinationsContext";
import PopUpDestinationForm from "../../entities/PopUpDestinationForm/PopUpDestinationForm";
import DestinationItem from "../../entities/DestinationItem/DestinationItem";

const filterDestinationsBySearchOptions = (destinations, searchOptions) => {
    const { term, sort, price, rating, country } = searchOptions;
    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().trim().includes(term.toLowerCase().trim()) &&
        destination.description.toLowerCase().trim().includes(term.toLowerCase().trim()) &&
        (price ? destination.price <= price : true) &&
        (rating ? destination.rating >= rating : true) &&
        (country ? destination.country.toLowerCase().trim() === country.toLowerCase().trim() : true)
    );

    return filteredDestinations.sort((a, b) => {
        if (sort === 'price') {
            return a.price - b.price;
        } else if (sort === 'name') {
            return a.name.localeCompare(b.name);
        }
        return 0;
    });
}

const defaultDestination = {
    destination_id: -1,
    name: '',
    description: '',
    updated_at: new Date().toISOString(),
    price: 0,
    picture: '',
    rating: 5.0,
    country: '',
};

const SectionItems = ({searchOptions, setSearchOptions}) => {
    const {destinations, setDestinations} = useDestinations();
    const [editedDestination, setEditedDestination] = useState(defaultDestination);
    const [active, setActive] = useState(false);
    const [error, setError] = useState('');
    const [filteredDestinations, setFilteredDestinations] = useState(filterDestinationsBySearchOptions(destinations, searchOptions));

    useEffect(() => {
        setFilteredDestinations(filterDestinationsBySearchOptions(destinations, searchOptions));
    }, [destinations, searchOptions]);
    const handleEditedDestination = (e) => {
        e.preventDefault();
        if (!editedDestination.name || !editedDestination.description || !editedDestination.price || !editedDestination.picture) {
            setError('All fields are required');
            return;
        }

        const isNameUnique = !destinations.some(destination => destination.name === editedDestination.name);
        if (!isNameUnique) {
            setError('Destination name must be unique');
            return;
        }

        const updatedDestinations = destinations.map(destination =>
            destination.destination_id === editedDestination.destination_id ? editedDestination : destination
        );
        setDestinations(updatedDestinations);
        setActive(false);
        setError('');
        setEditedDestination(defaultDestination);
    }
    console.log(searchOptions);
    return (
        <section className="section-items">
            <div className="item-manager">
                <div className="sort-div">
                    <h1>Manage Destinations</h1>
                    <form>
                        <label htmlFor="sort"> Sort by: </label>
                        <select className="sort-select" name="sort" id="sort" onChange={(e) => setSearchOptions(prev => ({
                            ...prev,
                            sort: e.target.value
                        }))}>
                            <option value='price'>Price</option>
                            <option value='name'>Name</option>
                        </select>
                    </form>
                </div>
                <hr/>
                <div className="count-div">
                    <h2>Count price</h2>
                    <form>
                        <label>
                            <output>Total:
                                <span id="total_price">
                                     {` ${filteredDestinations.reduce((total, destination) => total + destination.price, 0)} $`}
                                </span>
                            </output>
                        </label>
                    </form>
                </div>
            </div>

            <div id="ItemsWrappper" className="items-wrapper">
                {filteredDestinations.map((destination) => (
                    <DestinationItem
                        key={destination.destination_id}
                        destination={destination}
                        setDestinations={setDestinations}
                        setEditedDestination={setEditedDestination}
                        setActive={setActive}
                    />
                ))}
            </div>
            <PopUpDestinationForm
                destination={editedDestination}
                setDestination={setEditedDestination}
                handleSubmit={handleEditedDestination}
                error={error}
                headText="Edit destination"
                active={active}
                setActive={setActive}
            />
        </section>
    );
};

export default SectionItems;
