import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpForm from "../components/LogIn/SignUpForm"
import LoginForm from "./LogIn/LogInForm.tsx";
import MainContent from "./MainContent/MainContent.tsx";
import Map from "./MainContent/Map/Map.tsx";
import {useState} from "react";
import SheltersComponent from "./ShelterContent/SheltersComponent";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [mainContentState, setMainContentState]=useState(true);
    const [shelterAdsShow, setShelterAdsShow]=useState(false);

    const handleLoggedInAppC = () => {
        setLoggedIn(true);
    };

    const handleLoggedOutAppC = () => {
        setLoggedIn(false);
    };

    const handlemainContentStateChange=(state:boolean)=>{
        setMainContentState(state);
        setShelterAdsShow(false);
    };
    const handleShowShelterAds=(state:boolean)=>{
        setShelterAdsShow(state);
        console.log("shelter ads show: "+state);
    };
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/" element={<MainContent
                    handleLoggedInAppC={handleLoggedInAppC} handleLoggedOutAppC={handleLoggedOutAppC}
                    handleMainContentStateChange={handlemainContentStateChange}
                    mainContentState={mainContentState} shelterAdsShow={shelterAdsShow}
                    handleShelterAdsShow={handleShowShelterAds}/>} />
                <Route path="/map" element={<Map isLoggedIn={isLoggedIn}/>} />
                <Route path="/shelters" element={<SheltersComponent
                    handleLoggedIn={handleLoggedInAppC} handleLoggedOut={handleLoggedOutAppC}
                mainContentState={mainContentState} setMainContentState={handlemainContentStateChange}
                handleShelterAdsShow={handleShowShelterAds} shelterAdsShow={shelterAdsShow}/>}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App
