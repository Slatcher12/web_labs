import React from 'react';
import './CreateButton.css'
const CreateButton = ({text, ...props}) => {
    return (
        <button className="create-button" {...props}>
            {text}
        </button>
    );
};

export default CreateButton;
