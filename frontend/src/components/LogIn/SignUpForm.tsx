import React, {useState} from "react";
import "./SignUpForm.css";
import { useNavigate } from 'react-router-dom';

interface Props {
    // Define the type of props (if any)
}

const SignUpForm: React.FC<Props> = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        name: "",
        telephoneNumber: "",
        userType: ""
    });
    const [error, setError] = useState("");
    const [isChecked, setIsChecked] = useState(false);
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update the formData state with the new value for the specific input field
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to sign up?");
        if (!isConfirmed) {
            return;
        }
        if (formData.telephoneNumber.length !== 9 && formData.telephoneNumber.length !== 10) {
            setError("Telephone number must be 9 or 10 digits long");
            return;
        }
        const newUserType = isChecked ? "skloniste" : "osoba";

        const updatedFormData = {
            ...formData,
            userType: newUserType,
        };

        try {
            const response = await fetch('/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                const responseBody = await response.json();
                setError(responseBody.message || 'Something went wrong. Please try again.');
            } else {
                alert("You have successfully signed up!");
                navigate("/login");
            }
        } catch (error) {
            setError("Network error. Please try again.");
        }
    };



    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };



    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign up</h3>
                    <div className="input-container">
                        <label>Username</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="input"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <input
                            type="password"
                            className="input"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Name</label>
                        <input
                            type="text"
                            className="input"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Telephone number</label>
                        <input
                            type="tel"
                            pattern="[0-9]{9,10}"
                            className="input"
                            placeholder="xxx-xxx-xxxx"
                            name="telephoneNumber"
                            value={formData.telephoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label>
                            Jeste li sklonište?
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </label>

                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;