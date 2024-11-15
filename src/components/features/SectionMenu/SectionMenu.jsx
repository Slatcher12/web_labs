import React, {useState} from 'react';
import './SectionMenu.css';
import PopUp from "../../common/PopUP/PopUp";

const defaultDestination = {
    destination_id: -1,
    name: '',
    description: '',
    updated_at: new Date().toISOString(),
    price: 0,
    picture: ''
};


const SectionMenu = ({destinations, setDestinations, setSearchOptions}) => {
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

        console.log(newDestination);
    }

    return (
        <section className="section-menu">
            <div className="create">
                <button className="create-button" onClick={() => setActive(true)}>Create a destination</button>
            </div>
            <div className="search-menu" id="search-menu">
                <form>
                    <label className="input-buttons-menu">
                        <input placeholder="Type something..."
                               onChange={(e) => setSearchOptions(prev => ({...prev, term: e.target.value}))}
                        />
                    </label>
                </form>
            </div>

            <PopUp headText={'Add new destination'} active={active} setActive={setActive}>
                <form className='destination-popup-form' onSubmit={handleNewDestination}>
                    <div>
                        <label>Name:</label>
                        <input
                            value={newDestination.name}
                            onChange={e => setNewDestination({...newDestination, name: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={newDestination.description}
                            onChange={e => setNewDestination({...newDestination, description: e.target.value})}
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type={"number"}
                            min={0}
                            value={newDestination.price || ''}
                            onChange={e => setNewDestination({...newDestination, price: Number(e.target.value)})}
                        />
                    </div>
                    <div>
                        <label>Picture's url:</label>
                        <input
                            value={newDestination.picture}
                            onChange={e => setNewDestination({...newDestination, picture: e.target.value})}
                        />
                    </div>
                    <span className='error'>{error}</span>
                    <button className={'blue-btn small'} type={'submit'}>Add</button>
                </form>
            </PopUp>

        </section>
    );
};

export default SectionMenu;