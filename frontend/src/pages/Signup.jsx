import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from 'react-router-dom';

function Signup() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [gender, setGender] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [visibility, setVisibility] = useState('visibility_off');
    const [type, setType] = useState('password');
    const { signup, error, isLoading } = useSignup();

    const today = new Date();
    const tenYearsAgo = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(firstName, lastName, email, password, dateOfBirth, contactNumber, gender);
    }

    const handleVisibility = (e) => {
        if (e.target.innerText === 'visibility') {
            setVisibility('visibility_off');
            setType('password');
        } else {
            setVisibility("visibility");
            setType('text');
        }
    }

    return (
        <div className="login-container">
            <form className="login" onSubmit={handleSubmit}>
                <h2>Sign up</h2>
                <h3 className="col-white">Details</h3>
                <div className="user-first-last-name-container">
                    <div>
                        <div className="input-box">
                            <input
                                className="user-first-last-name-input"
                                id="firstName"
                                type="text"
                                onChange={(e) => { setFirstName(e.target.value) }}
                                value={firstName}
                                placeholder="Enter first name"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <div className="input-box">
                            <input
                                className="user-first-last-name-input"
                                id="lastName"
                                type="text"
                                onChange={(e) => { setLastName(e.target.value) }}
                                value={lastName}
                                placeholder="Enter last name"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="input-box">
                    <span className="material-symbols-outlined material-symbols-filled col-primary">
                        email
                    </span>
                    <input
                        id="signup-email"
                        type="email"
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                        required
                        placeholder="Enter your email"
                        autoComplete="email"
                    />
                </div>
                <div className="input-box">
                    <span className="material-symbols-outlined material-symbols-filled col-primary">
                        lock
                    </span>
                    <input
                        id="signup-password"
                        type={type}
                        onChange={(e) => { setPassword(e.target.value) }}
                        value={password}
                        required
                        className="input-90-width"
                        placeholder="Enter your password"
                        autoComplete="new-password"
                    />
                    <span className="material-symbols-outlined col-primary" onClick={handleVisibility}>
                        {visibility}
                    </span>
                </div>
                <div className="input-box">
                    <span className="material-symbols-outlined material-symbols-filled col-primary">
                        calendar_today
                    </span>
                    <input
                        id="dateOfBirth"
                        type="date"
                        onChange={(e) => { setDateOfBirth(e.target.value) }}
                        value={dateOfBirth}
                        min={tenYearsAgo}
                        max={today}
                        required
                        className="w-100p"
                    />
                </div>
                <div className="input-box">
                    <span className="material-symbols-outlined material-symbols-filled col-primary">
                        phone
                    </span>
                    <input
                        id="contact-number"
                        type="text"
                        onChange={(e) => { setContactNumber(e.target.value) }}
                        value={contactNumber}
                        placeholder="Enter your phone"
                        required
                        maxLength={15}
                    />
                </div>
                <div className="input-box">
                    <span className="material-symbols-outlined material-symbols-filled col-primary">
                        wc
                    </span>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <button disabled={isLoading} className={`primary-styled-button ${isLoading && 'loading-anim'}`}>Sign up &nbsp;&rarr;</button>
                {error && <div className="error">{error}</div>}
                <span>Already have an account? <Link to='/login'>Login</Link></span>
            </form>
        </div>
    )
}

export default Signup;