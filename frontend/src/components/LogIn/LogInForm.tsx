import { useState, FC, FormEvent } from 'react';
import './LoginForm.css';

const LoginForm: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const validateEmail = (email: string): boolean => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return regex.test(email);
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateEmail(email)) {
            setError("Invalid email format.");
            return;
        }
        if (password.length < 6) {
            setError("Password should be at least 6 characters long.");
            return;
        }

        const formData = {
            email: email,
            password: password
        };
        console.log("Form Data in JSON:", JSON.stringify(formData));
    };

    return (
        <div className="login-form">
            <h2 className="login-form-title">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email:</label>
                    <input
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
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                        className="form-input"
                    />
                </div>
                {error && <p className="form-error">{error}</p>}
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
}

export default LoginForm;
