import React, {useContext, useState} from "react";
import {GlobalContext} from "../../context/GlobalState.jsx";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import avatar from "../../assets/avatar.png"; // Asegúrate de que la ruta sea correcta
import "./profile.scss";
import {useNavigate} from "react-router-dom";

const Profile = () => {
    const { user, updateUser, sendTokenPassword, changePassword } = useContext(GlobalContext);
    const [username, setUsername] = useState(user.username);
    const [password, setPassword] = useState("");
    const [token, setToken] = useState("");
    const [isEditingUsername, setIsEditingUsername] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [message, setMessage] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(true);
    const navigate = useNavigate();

    const handlePassword = async (e) => {
        e.preventDefault();

        if (password && token) {
            const response = await changePassword(password, token);
            if (response.success) {
                setIsEditingPassword(false);
                setMessage("Password changed successfully");
                setIsTokenValid(true); // Reset token validity
            } else {
                setIsTokenValid(false);
                setMessage("Invalid token, please try again.");
            }
        } else {
            setMessage("Please enter a valid token and password.");
        }
    };

    const handleUsername = async (e) => {
        e.preventDefault();
        const updatedUser = { ...user, email: user.email, username };
        await updateUser(updatedUser);
        setIsEditingUsername(false);
    }

    const handleChangePasswordClick = async () => {
        setIsEditingPassword(true);
        setIsTokenValid(true); // Reset token validity
        setMessage(""); // Clear previous messages
        await sendTokenPassword(user.email, user.username);
    };

    return (
        <div className="profilePage">
            <ContentWrapper>
                <div className="profile-container">
                    <img src={avatar} alt="Avatar" className="avatar" />
                    <h2 className="profile-title">Login and Security</h2>

                    <div className="profile-section">
                        <span className="label">Username:</span>
                        {isEditingUsername ? (
                            <div className="edit-section">
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <div className="button-group">
                                    <button onClick={handleUsername} className="profile-button save-button">Save</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsEditingUsername(false)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div className="profile-field">
                                <span>{username}</span>
                                <button className="edit-button" onClick={() => setIsEditingUsername(true)}>Change</button>
                            </div>
                        )}
                    </div>

                    <div className="profile-section">
                        <span className="label">Email:</span>
                        <div className="profile-field">
                            <span>{user.email}</span>
                        </div>
                    </div>

                    <div className="profile-section">
                        <span className="label">Password:</span>
                        {isEditingPassword ? (
                            <div className="edit-section">
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="New Password"
                                />
                                <input
                                    type="text"
                                    value={token}
                                    onChange={(e) => setToken(e.target.value)}
                                    placeholder="Token"
                                />
                                <div className="button-group">
                                    <button type="submit" className="profile-button save-button" onClick={handlePassword}>Save</button>
                                    <button type="button" className="cancel-button" onClick={() => setIsEditingPassword(false)}>Cancel</button>
                                </div>
                                {message && <p className="message">{message}</p>}
                            </div>
                        ) : (
                            <div className="profile-field">
                                <span>********</span>
                                <button className="edit-button" onClick={handleChangePasswordClick}>Change</button>
                            </div>
                        )}
                    </div>

                    <button onClick={() => { navigate("/") }} className="finalize-button" type="submit">Finish</button>
                    {message && <p className="message">{message}</p>}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Profile;
