import './App.css';
import Header from "./components/Header/Header";
import HeroSection from "./components/HeroSection/HeroSection";
import LearnMoreSection from "./components/LearnMoreSection/LearnMoreSection";
import DestinationsSection from "./components/DestinationsSection/DestinationsSection";
import Footer from "./components/Footer/Footer";

function App() {


    return (
        <>
            <Header />
            <main>
                {/*<HeroSection />*/}
                <LearnMoreSection />
                <DestinationsSection />
            </main>
            <Footer />

        </>
    );
}

export default App;
