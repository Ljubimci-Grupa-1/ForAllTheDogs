import { useState, FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogInForm.css";
import {Button, Input, Sheet, Stack} from "@mui/joy";

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
    };

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }

        const formData = {
            email: email,
            password: password
        };

        try {
            const response = await fetch('https://forallthedogs.onrender.com//user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                navigate('/home');
            } else {
                const errorText = await response.text();
                setError(errorText);
            }

        } catch (error) {
            setError("An error occurred while logging in.");
            console.error('There was an error!', error);
        }
    };


    return (
        <Sheet
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: 'url("/FATD_BG.png")',
                backgroundRepeat: 'repeat',
                backgroundSize: '10%',
            }}>
            <div className="login-form">
                <Stack spacing={3}>
                    <h2 className="login-form-title">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={3}>
                            <div className="form-group">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <Input
                                    size="md"
                                    variant="soft"
                                    color="primary"
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="form-label">Password:</label>
                                <Input
                                    size="md"
                                    variant="soft"
                                    color="primary"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    className="form-input"
                                />
                            </div>
                            {error && <p className="form-error">{error}</p>}
                            <Button
                                variant="solid"
                                type="submit">Login</Button>
                        </Stack>
                    </form>
                    <div className="signup-redirect">
                        <p>Haven't got an account? <Button onClick={navigateToSignup} variant="outlined">Sign up here!</Button></p>
                    </div>
                </Stack>
            </div>
        </Sheet>
    );
}

export default LoginForm;
