import "bootstrap/dist/css/bootstrap.min.css"
import "../App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SignUpForm from "./SignUpForm"
function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth" element={<SignUpForm />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
