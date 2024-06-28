import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import {GlobalContext} from "../../context/GlobalState.jsx";
import "./auth.scss";

const Register = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { register, error } = useContext(GlobalContext);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log("Iniciando registro...");
        try {
            const result = await register(username, email, password);
            console.log("Resultado del registro:", result);
            if (result.success) {
                navigate("/auth/signin");
            } else {
                console.error("Error en el registro:", result.message);
            }
        } catch (error) {
            console.error("Error al llamar a register:", error);
        }
    };

    return (
        <div className="authPage">
            <ContentWrapper>
                <div className="auth-container">
                    <h2 className="auth-title">Register</h2>
                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="auth-input-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
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
                        {error && <p className="auth-error">{error}</p>}
                        <button type="submit" className="auth-button">
                            Register
                        </button>
                    </form>
                    <p className="auth-switch">
                        Already have an account? <a onClick={() => navigate("/auth/signin")}>Sign In</a>
                    </p>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Register;
