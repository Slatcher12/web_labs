import React from 'react';
import FormInput from "../../common/FormInput/FormInput";
import PopUp from "../../common/PopUP/PopUp";

const PopUpDestinationForm = ({ destination, setDestination, handleSubmit, error, headText, active, setActive }) => {
    return (
        <PopUp headText={headText} active={active} setActive={setActive}>
            <form className='destination-popup-form' onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    value={destination.name}
                    onChange={e => setDestination({ ...destination, name: e.target.value })}
                />
                <FormInput
                    label="Description"
                    value={destination.description}
                    onChange={e => setDestination({ ...destination, description: e.target.value })}
                    isTextArea={true}
                />
                <FormInput
                    label="Price"
                    type="number"
                    value={destination.price || ''}
                    onChange={e => setDestination({ ...destination, price: Number(e.target.value) })}
                />
                <FormInput
                    label="Picture's url"
                    value={destination.picture}
                    onChange={e => setDestination({ ...destination, picture: e.target.value })}
                />
                {error && <span className='error'>{error}</span>}
                <button className='blue-btn small' type='submit'>Ok</button>
            </form>
        </PopUp>
    );
};

export default PopUpDestinationForm;
