import React from 'react';

const Select = ({label, options, onChange}) => {
    return (
        <label>
            {label}:
            <select onChange={onChange}>
                <option value="">Select a {label.toLowerCase()}</option>
                {options.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
        </label>
    );
};
export default Select;