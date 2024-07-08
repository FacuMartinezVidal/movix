import React, {useContext, useState} from "react";
import {GlobalContext} from "../../context/GlobalState.jsx";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import avatar from "../../assets/avatar.png"; // Asegúrate de que la ruta sea correcta
import "./profile.scss";

const Profile = () => {
    const { user, updateUser } = useContext(GlobalContext); // Asume que existe una función updateUser en el contexto
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para actualizar el usuario
        const updatedUser = {};
        if (username) updatedUser.username = username;
        if (email) updatedUser.email = email;
        if (password) updatedUser.password = password;

        updateUser(updatedUser);
        setIsEditing(false);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUsername(user.username);
        setEmail(user.email);
        setPassword("");
    };

    return (
        <div className="profilePage">
            <ContentWrapper>
                <div className="profile-container">
                    <img src={avatar} alt="Avatar" className="avatar" />
                    <h2 className="profile-title">Profile</h2>
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="profile-form">
                            <div className="profile-input-group">
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div className="profile-input-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required={true}
                                />
                            </div>
                            <div className="profile-input-group">
                                <label htmlFor="password">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <small>Leave blank to keep the current password</small>
                            </div>
                            <button type="submit" className="profile-button">
                                Save Changes
                            </button>
                            <button type="button" className="cancel-button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </form>
                    ) : (
                        <div className="profile-info">
                            <div className="profile-field">
                                <span className="label">Username:</span>
                                <span>{user.username}</span>
                            </div>
                            <div className="profile-field">
                                <span className="label">Email:</span>
                                <span>{user.email}</span>
                            </div>
                            <button className="edit-button" onClick={handleEdit}>
                                Edit Profile
                            </button>
                        </div>
                    )}
                </div>
            </ContentWrapper>
        </div>
    );
};

export default Profile;

