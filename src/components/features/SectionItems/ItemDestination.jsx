import React from "react";

const ItemDestination = ({ name, description, updated_at, picture, price }) => {
    return (
        <div className="item">
            <div className="avatar"
                 style={{backgroundImage: `url(${picture})`}}
            ></div>
            <div className="info">
                <h3 className="name">{name}</h3>
                <h4 className="description">{description}</h4>
                <h5 className="updated-at">{updated_at}</h5>
                <h6 className="price">{price}$</h6>
            </div>
            <div className="manage">
                <button className="edit-destination">Edit</button>
                <button className="remove-destination">Remove</button>
            </div>
        </div>
    );
};

export default ItemDestination;