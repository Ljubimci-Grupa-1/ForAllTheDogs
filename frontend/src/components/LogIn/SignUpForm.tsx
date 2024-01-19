import React, { useState } from "react";
import "./SignUpForm.css";
import { useNavigate } from 'react-router-dom';
import {Button, Checkbox, Input, Sheet, Stack} from "@mui/joy";

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
        userTypeId: ""
    });
    const [isChecked, setIsChecked] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.telephoneNumber.length !== 9 && formData.telephoneNumber.length !== 10) {
            alert("Telephone number must be 9 or 10 digits long");
            return;
        }
        const newUserType = isChecked ? 2 : 1;

        const updatedFormData = {
            ...formData,
            userTypeId: newUserType,
        };

        try {
            const response = await fetch('http://localhost:8080/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedFormData),
            });

            if (!response.ok) {
                const responseBody = await response.json();
                console.log(responseBody);
                alert(responseBody.message || 'Something went wrong. Please try again.');
            } else {
                alert("You have successfully signed up!");
                navigate("/login");
            }
            console.log(response);
        } catch (error) {
            alert("Network error. Please try again.");
        }
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <Sheet sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            width: '100%',
            background: '#f5f5f5',

        }}>
            <form className="Auth-form" onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <h3 className="Auth-form-title">Sign up</h3>
                    <div className="input-container">
                        <label>Username</label>
                        <Input
                            size="md"
                            placeholder="Enter Username"
                            variant="soft"
                            color="primary"
                            required
                            className="input"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="input-container">
                        <label>Email</label>
                        <Input
                            size="md"
                            placeholder="Enter Email Adress"
                            variant="soft"
                            color="primary"
                            type="email"
                            className="input"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label>Password</label>
                        <Input
                            size="md"
                            variant="soft"
                            color="primary"
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
                        <Input
                            size="md"
                            variant="soft"
                            color="primary"
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
                            pattern="[0-9]{9,10}"
                            placeholder="xxx-xxx-xxxx"
                            className="input"
                            name="telephoneNumber"
                            value={formData.telephoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div>
                        <Checkbox
                            color="primary"
                            label="Are you a shelter?"
                            variant="solid"
                            onChange={handleCheckboxChange}
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="solid">Sign up</Button>
                    </div>
                </Stack>
            </form>
        </Sheet>
    );
};

export default SignUpForm;
