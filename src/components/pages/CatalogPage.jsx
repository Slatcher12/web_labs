import React, {useState} from 'react';
import SectionMenu from "../features/SectionMenu/SectionMenu";
import SectionItems from "../features/SectionItems/SectionItems";

const CatalogPage = () => {
    const [searchOptions, setSearchOptions] = useState({term: '', sort: 'price', price: 0, rating: 0, country: ''});

    return (
        <>
            <SectionMenu
                setSearchOptions={setSearchOptions}
            />
            <SectionItems
                searchOptions={searchOptions} setSearchOptions={setSearchOptions}
            />
        </>
    );
};

export default CatalogPage;