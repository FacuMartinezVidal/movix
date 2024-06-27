import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"; // Asegúrate de importar el ContentWrapper
import "./auth.scss"; // Archivo SCSS compartido para SignIn y Register

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Lógica de registro aquí
        console.log("Registered with", name, email, password);
        navigate("/auth/signin"); // Redirigir a SignIn después de registrarse
    };

    return (
        <div className="authPage">
            <ContentWrapper>
                <div className="auth-container">
                    <h2 className="auth-title">Register</h2>
                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="auth-input-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
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
