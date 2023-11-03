import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpForm from "../components/LogIn/SignUpForm"
import LoginForm from "./LogIn/LogInForm.tsx";
import MainContent from "./MainContent/MainContent.tsx";
import { LostPet } from "./MainContent/MainContent.tsx";
function App() {

    const lostPets: LostPet[] = [
        {
            id: 1,
            name: "Buddy",
            species: "Dog",
            description: "Golden Retriever, very friendly",
            dateLost: "2023-10-29",
            imageUrl: "https://example.com/images/buddy.jpg"
        },
        {
            id: 2,
            name: "Whiskers",
            species: "Cat",
            description: "White and brown spots, green eyes",
            dateLost: "2023-10-28",
            imageUrl: "https://example.com/images/whiskers.jpg"
        },
        {
            id: 3,
            name: "Polly",
            species: "Bird",
            description: "Green Parrot with a red neck",
            dateLost: "2023-10-27",
            imageUrl: "https://example.com/images/polly.jpg"
        }
    ];


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path={"/"} element={<MainContent lostPets={lostPets}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
