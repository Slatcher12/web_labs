import React from 'react';
import './DestinationItem.css';
import {Link} from 'react-router-dom';

const DestinationItem = ({ destination, setDestinations, setEditedDestination, setActive }) => {

    const timeSince = (date) => {
        const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
        const days = Math.floor(seconds / 86400);
        const hours = Math.floor((seconds % 86400) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);

        let result = 'updated';

        if (days > 0) {
            result += `${days} day${days > 1 ? 's' : ''} `;
        }
        if (hours > 0) {
            result += `${hours} hour${hours > 1 ? 's' : ''} `;
        }
        if (minutes > 0) {
            result += `${minutes} minute${minutes > 1 ? 's' : ''} `;
        }

        return result.trim() + ' ago';
    }

    const handleDelete = (e) => {
        e.preventDefault();
        setDestinations((prev) => prev.filter((d) => d.destination_id !== destination.destination_id));
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEditedDestination(destination);
        setActive(true);
    }
    return (
        <div className="item">
            <Link
                to={`/catalog/${destination.destination_id}`}
                className="avatar"
                style={{ backgroundImage: `url(${destination.picture})` }}
            ></Link>
            <div className="item-info">
                <p>{destination.name}</p>
                <p>{destination.description}</p>
                <p className="item-updated-at">{destination.updated_at}</p>
                <p>{destination.price} $</p>
            </div>
            <div className="item-buttons">
                <button onClick={handleEdit} className="edit-destination">Edit</button>
                <button onClick={handleDelete} className="remove-destination">Remove</button>
            </div>
        </div>
    );
};

export default DestinationItem;
