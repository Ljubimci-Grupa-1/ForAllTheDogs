import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpForm from "../components/LogIn/SignUpForm"
import LoginForm from "./LogIn/LogInForm.tsx";
import MainContent from "./MainContent/MainContent.tsx";
import Map from "./MainContent/Map/Map.tsx";
import UserProfile from "./MainContent/UserProfile.tsx";
//import { useParams } from 'react-router-dom';
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/" element={<MainContent isLoggedIn={false}/>} />
                <Route path="/map" element={<Map/>} />
                <Route
                    path="/account/:userEmail"
                    element={<UserProfile />}
                />
            </Routes>
        </BrowserRouter>
    )
}

export default App
