import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"

import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpForm from "../components/LogIn/SignUpForm"
import LoginForm from "./LogIn/LogInForm.tsx";
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<SignUpForm />} />
                <Route path="/login" element={<LoginForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
