import React, {useState} from "react";

interface Props {
    // Define the type of props (if any)
}

const Auth: React.FC<Props> = () => {
    const [authMode, setAuthMode] = useState("signup");

    const changeAuthMode = () => {
        setAuthMode(authMode === "signin" ? "signup" : "signin");
    };

    return (
        <div className="Auth-form-container">
            <form className="Auth-form">
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">
                        {authMode === "signin" ? "Sign In" : "Sign Up"}
                    </h3>
                    <div className="text-center">
                        {authMode === "signin" ? (
                            <>
                                Not registered yet?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                  Sign Up
                </span>
                            </>
                        ) : (
                            <>
                                Already registered?{" "}
                                <span className="link-primary" onClick={changeAuthMode}>
                  Sign In
                </span>
                            </>
                        )}
                    </div>
                    {authMode === "signin" ? (
                        <>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="Enter email"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Enter password"
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="form-group mt-3">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control mt-1"
                                    placeholder="e.g Jane Doe"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Email address</label>
                                <input
                                    type="email"
                                    className="form-control mt-1"
                                    placeholder="Email Address"
                                />
                            </div>
                            <div className="form-group mt-3">
                                <label>Password</label>
                                <input
                                    type="password"
                                    className="form-control mt-1"
                                    placeholder="Password"
                                />
                            </div>
                        </>
                    )}
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                    <p className="text-center mt-2">
                        Forgot <a href="#">password?</a>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Auth;
