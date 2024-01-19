import { useState, FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import "./LogInForm.css";
import {Button, Input, Sheet, Stack} from "@mui/joy";
import Typography from '@mui/joy/Typography';

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
            const response = await fetch('https://forallthedogs.onrender.com/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const responseJson = JSON.parse(await response.text());
                const jwt = responseJson.token;
                localStorage.setItem('jwt',jwt);
                navigate('/');
            } else {
                const errorJson = await response.json() as { message: string };
                const errorText = errorJson.message;
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
                height: '100vh',
                width: '100%',
                backgroundColor: '#f5f5f5',
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
                            {error && <Typography
                                id="error" color="danger" level="title-lg" variant="plain">{error}</Typography>}
                            <Button
                                id="submitLogin"
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
