import './App.css';
import {Route, Routes} from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import Layout from "./components/Layout/Layout/Layout";
import CatalogPage from "./components/pages/CatalogPage";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Layout/>} >
                <Route index element={<HomePage/>} />
                <Route path='catalog' element={<CatalogPage/>} />
            </Route>
        </Routes>
    );
}

export default App;
