import React, {useState} from 'react';
import data from "../../data.json";
import SectionMenu from "../features/SectionMenu/SectionMenu";
import SectionItems from "../features/SectionItems/SectionItems";

const CatalogPage = () => {
    const [destinations, setDestinations] = useState(data)
    const [searchOptions, setSearchOptions] = useState ({term: '', sort: 'price'});

    return (
        <>
            <SectionMenu
                destinations={destinations}
                setDestinations={setDestinations}
                setSearchOptions={setSearchOptions}
            />
            <SectionItems
                destinations={destinations}
                setDestinations={setDestinations}
                searchOptions={searchOptions}
                setSearchOptions={setSearchOptions}
            />
        </>
    );
};

export default CatalogPage;