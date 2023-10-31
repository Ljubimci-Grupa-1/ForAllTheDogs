import React, {useState} from "react";
interface Props {
    // Define the type of props (if any)
}

const SignUpForm: React.FC<Props> = () => {
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
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Update the formData state with the new value for the specific input field
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newUserType = isChecked ? "skloniste" : "osoba";
        setFormData({
            ...formData,
            userType: newUserType,
        });
        const jsonString = JSON.stringify(formData);
        console.log(jsonString);
    };


    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };



    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">Sign up</h3>
                    <div className="form-group mt-3">
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email address</label>
                        <input
                            type="email"
                            className="form-control mt-1"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control mt-1"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Name</label>
                        <input
                            type="text"
                            className="form-control mt-1"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Telephone number</label>
                        <input
                            type="tel"
                            pattern="[0-9]{9,10}"
                            className={`form-control mt-1 ${error ? "is-invalid" : ""}`}
                            placeholder="xxx-xxx-xxxx"
                            name="telephoneNumber"
                            value={formData.telephoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                        {error && <div className="invalid-feedback">{error}</div>}
                    </div>
                    <div>
                        <label>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                            Jeste li sklonište?
                        </label>
                        <p>Checkbox is {isChecked ? "checked" : "unchecked"}</p>
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
