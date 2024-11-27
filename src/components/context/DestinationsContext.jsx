import React, {createContext, useContext, useState} from 'react';
import destinationsData from '../../data.json';

const flattenedDestinationsData = destinationsData.flat();

const DestinationsContext = createContext();

export const useDestinations = () => {
    const context = useContext(DestinationsContext);
    if (!context) {
        throw new Error('useDestinations must be used within a DestinationsProvider');
    }
    return context;
};

export const DestinationsProvider = ({ children }) => {
    const [destinations, setDestinations] = useState(flattenedDestinationsData);

    return (
        <DestinationsContext.Provider value={{ destinations, setDestinations }}>
            {children}
        </DestinationsContext.Provider>
    );
};
