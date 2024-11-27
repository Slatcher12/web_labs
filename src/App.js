import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Layout from "./components/Layout/Layout/Layout";
import CatalogPage from "./components/pages/CatalogPage";
import ItemPage from "./components/pages/ItemPage";
import {DestinationsProvider} from "./components/context/DestinationsContext";

function App() {

    return (
        <DestinationsProvider>
            <Routes>
            <Route path="/" element={<Layout/>} >
                <Route index element={<HomePage/>} />
                <Route path='catalog' element={<CatalogPage/>} />
                <Route path="catalog/:id" element={<ItemPage/>} />
            </Route>
        </Routes>
        </DestinationsProvider>

    );
}

export default App;
