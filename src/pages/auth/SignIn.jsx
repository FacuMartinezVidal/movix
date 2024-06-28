import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {GlobalContext} from "../../context/GlobalState";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import "./auth.scss";

const SignIn = () => {
    const { login } = useContext(GlobalContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await login(email, password);
        if (response.success) {
            navigate("/");
        } else {
            setError(response.message);
        }
    };

    return (
        <div className="authPage">
            <ContentWrapper>
                <div className="auth-container">
                    <h2 className="auth-title">Sign In</h2>
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="auth-input-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        {error && <div className="auth-error">{error}</div>}
                        <button type="submit" className="auth-button">Sign In</button>
                    </form>
                    <p className="auth-switch">
                        Don't have an account? <a onClick={() => navigate("/auth/register")}>Register</a>
                    </p>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default SignIn;
