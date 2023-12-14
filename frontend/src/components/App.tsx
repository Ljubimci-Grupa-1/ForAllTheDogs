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
            imageUrl: "https://hips.hearstapps.com/hmg-prod/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=0.752xw:1.00xh;0.175xw,0&resize=1200:*"
        },
        {
            id: 2,
            name: "Whiskers",
            species: "Cat",
            description: "White and brown spots, green eyes",
            dateLost: "2023-10-28",
            imageUrl: "https://cdn.pixabay.com/photo/2014/11/30/14/11/cat-551554_640.jpg"
        },
        {
            id: 3,
            name: "Polly",
            species: "Bird",
            description: "Green Parrot with a red neck",
            dateLost: "2023-10-27",
            imageUrl: "https://www.mpg.de/18490336/original-1656406663.jpg?t=eyJ3aWR0aCI6MTIwMCwiaGVpZ2h0IjpudWxsLCJmaXQiOm51bGwsIm9ial9pZCI6MTg0OTAzMzZ9--9fae20441fec6fc549b18c2df95372b99979a919"
        }
    ];


    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm/>} />
                <Route element={<MainContent lostPets={lostPets}/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
