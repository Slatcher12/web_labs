import React from 'react';

const FormInput = ({ label, value, onChange, type = "text", isTextArea = false }) => {
    return (
        <div>
            <label>{label}:</label>
            {isTextArea ? (
                <textarea value={value} onChange={onChange} />
            ) : (
                <input type={type} value={value} onChange={onChange} />
            )}
        </div>
    );
};

export default FormInput;
