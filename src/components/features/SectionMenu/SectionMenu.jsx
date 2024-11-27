import React, {useState} from 'react';
import './SectionMenu.css';
import {useDestinations} from "../../context/DestinationsContext";
import PopUpDestinationForm from "../../entities/PopUpDestinationForm/PopUpDestinationForm";

const defaultDestination = {
    destination_id: -1,
    name: '',
    description: '',
    updated_at: new Date().toISOString(),
    price: 0,
    picture: '',
    rating: 5.0,
    location: 'Ukraine',
};


const SectionMenu = ({ setSearchOptions}) => {
    const {destinations, setDestinations} = useDestinations();
    const [active, setActive] = useState(false);
    const [newDestination, setNewDestination] = useState(defaultDestination);
    const [error, setError] = useState('')

    const handleNewDestination = (e) => {
        e.preventDefault();
        if (!newDestination.name || !newDestination.description || !newDestination.price || !newDestination.picture) {
            setError('All fields are required');
            return;
        }

        const isNameUnique = !destinations.some(destination => destination.name === newDestination.name);
        if (!isNameUnique) {
            setError('Destination name must be unique');
            return;
        }

        const maxId = destinations.length > 0 ? Math.max(...destinations.map(destination => destination.destination_id)) : 0;
        setDestinations([...destinations, {...newDestination, destination_id: maxId + 1}]);
        setActive(false);
        setError('');
        setNewDestination(defaultDestination);

    }
    return (
        <section className="section-menu">
            <div className="create">
                <button className="create-button" onClick={() => setActive(true)}>Create a destination</button>
            </div>
            <div className="search-menu" id="search-menu">
                <form className='filter-form'>

                    <label>
                        Price:
                        <select onChange={(e) => setSearchOptions(prev => ({...prev, price: Number(e.target.value)}))}>
                            <option value="">Select a price</option>
                            <option value="50">{'< '}50</option>
                            <option value="100">{'< '}100</option>
                            <option value="200">{'< '}200</option>
                            <option value="400">{'< '}400</option>
                        </select>
                    </label>
                    <label>
                        Rating:
                        <select onChange={(e) => setSearchOptions(prev => ({...prev, rating: Number(e.target.value)}))}>
                            <option value="">Select a rating</option>
                            <option value="1">1+</option>
                            <option value="2">2+</option>
                            <option value="3">3+</option>
                            <option value="4">4+</option>
                        </select>
                    </label>
                    <label>
                        Country:
                        <select onChange={(e) => setSearchOptions(prev => ({...prev, country: e.target.value}))}>
                            <option value="">Select a country</option>
                            <option value="Ukraine">Ukraine</option>
                            <option value="Japan">Japan</option>
                            <option value="USA">USA</option>
                            <option value="Germany">Germany</option>
                        </select>
                    </label>
                    <label className="input-buttons-menu">
                        <input placeholder="Type something..."
                               onChange={(e) => setSearchOptions(prev => ({...prev, term: e.target.value}))}
                        />
                    </label>
                </form>
            </div>

            <PopUpDestinationForm
                destination={newDestination}
                setDestination={setNewDestination}
                handleSubmit={handleNewDestination}
                error={error}
                headText="Add new destination"
                active={active}
                setActive={setActive}
            />
        </section>
    );
};

export default SectionMenu;