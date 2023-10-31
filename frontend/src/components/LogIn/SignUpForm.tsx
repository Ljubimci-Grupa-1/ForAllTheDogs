import React, {useState} from "react";
import "./SignUpForm.css";
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
    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Update the formData state with the new value for the specific input field
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e : React.FormEvent) => {
        e.preventDefault();

        if(formData.telephoneNumber.length !== 9 && formData.telephoneNumber.length !== 10) {
            setError("Telephone number must be 9 or 10 digits long");
            return;
        }
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
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                            className="form-control"
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
                            className={`form-control ${error ? "is-invalid" : ""}`}
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
