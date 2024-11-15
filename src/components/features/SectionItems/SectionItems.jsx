import React, {useState, useEffect} from 'react';
import ItemDestination from "./ItemDestination";
import './SectionItems.css';
import PopUp from "../../common/PopUP/PopUp";

const sortOptions = [
    {value: 'price', label: 'Price'},
    {value: 'name', label: 'Name'},
];

const filterDestinationsBySearchOptions = (destinations, searchOptions: {term: string, sort: string}) => {
    const { term, sort } = searchOptions;

    const filteredDestinations = destinations.filter(destination =>
        destination.name.toLowerCase().trim().includes(term.toLowerCase().trim()) ||
        destination.description.toLowerCase().trim().includes(term.toLowerCase().trim())
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
    picture: ''
};

const SectionItems = ({destinations, setDestinations, searchOptions, setSearchOptions}) => {
    const [editedDestination, setEditedDestination] = useState(defaultDestination);
    const [active, setActive] = useState(false);
    const [error, setError] = useState('');
    const [filteredDestinations, setFilteredDestinations] = useState(filterDestinationsBySearchOptions(destinations, searchOptions));

    useEffect(() => {
        setFilteredDestinations(filterDestinationsBySearchOptions(destinations, searchOptions));
    }, [destinations, searchOptions]);
    console.log(filteredDestinations);
    const handleEditedDestination = (e: FormEvent) => {
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
                        }))}>>
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
                            <button type="submit" className="item-count-button">Count</button>
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
                {destinations.map((destination) => (
                    <ItemDestination
                        key={destination.destination_id}
                        name={destination.name}
                        description={destination.description}
                        picture={destination.picture}
                        price={destination.price}
                        updated_at={destination.updated_at}
                    />
                ))}
            </div>
            <PopUp headText={'Add new destination'} active={active} setActive={setActive}>
                <form className='destination-popup-form' onSubmit={handleEditedDestination}>
                    <div>
                        <label>Name:</label>
                        <input
                            value={editedDestination.name}
                            onChange={e => setEditedDestination({...editedDestination, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={editedDestination.description}
                            onChange={e => setEditedDestination({...editedDestination, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type={"number"}
                            min={0}
                            value={editedDestination.price || ''}
                            onChange={e => setEditedDestination({...editedDestination, price: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label>Picture's url:</label>
                        <input
                            value={editedDestination.picture}
                            onChange={e => setEditedDestination({...editedDestination, picture: e.target.value})}
                        />
                    </div>
                    <span className='error'>{error}</span>
                    <button className={'blue-btn small'} type={'submit'}>Add</button>
                </form>
            </PopUp>
        </section>
    );
};

export default SectionItems;
