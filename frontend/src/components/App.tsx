import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpForm from "../components/LogIn/SignUpForm"
import LoginForm from "./LogIn/LogInForm.tsx";
import MainContent from "./MainContent/MainContent.tsx";
import Map from "./MainContent/Map/Map.tsx";
import {useState} from "react";
import SheltersComponent from "./ShelterContent/SheltersComponent";
import ShelterById from "./ShelterContent/ShelterById";

function App() {
    const [isLoggedIn, setLoggedIn] = useState(false);

    const handleLoggedInAppC = () => {
        setLoggedIn(true);
    };

    const handleLoggedOutAppC = () => {
        setLoggedIn(false);
    };
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/" element={<MainContent handleLoggedInAppC={handleLoggedInAppC} handleLoggedOutAppC={handleLoggedOutAppC}/>} />
                <Route path="/map" element={<Map isLoggedIn={isLoggedIn}/>} />
                <Route path="/shelters" element={<SheltersComponent handleLoggedIn={handleLoggedInAppC} handleLoggedOut={handleLoggedOutAppC}/>}/>
                <Route path="/shelters/:id" element={<ShelterById />}/>
            </Routes>

        </BrowserRouter>
    )
}

export default App
