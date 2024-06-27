import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"; // Asegúrate de importar el ContentWrapper
import "./auth.scss"; // Archivo SCSS compartido para SignIn y Register

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignIn = (e) => {
        e.preventDefault();
        // Lógica de autenticación aquí
        console.log("Signed in with", email, password);
        navigate("/"); // Redirigir al home después de iniciar sesión
    };

    return (
        <div className="authPage">
            <ContentWrapper>
                <div className="auth-container">
                    <h2 className="auth-title">Sign In</h2>
                    <form onSubmit={handleSignIn} className="auth-form">
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
                            Sign In
                        </button>
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
