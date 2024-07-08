import React, {useContext, useEffect, useState} from "react";
import {HiOutlineSearch} from "react-icons/hi";
import {SlMenu} from "react-icons/sl";
import {VscChromeClose} from "react-icons/vsc";
import {useLocation, useNavigate} from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";
import avatar from "../../assets/avatar.png";
import {GlobalContext} from "../../context/GlobalState";

const Header = () => {
    const { user, logout } = useContext(GlobalContext);
    const [show, setShow] = useState("top");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenu, setMobileMenu] = useState(false);
    const [query, setQuery] = useState("");
    const [showSearch, setShowSearch] = useState("");
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobileMenu) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
    }, [lastScrollY]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`);
            setTimeout(() => {
                setShowSearch(false);
            }, 1000);
        }
    };

    const openSearch = () => {
        setMobileMenu(false);
        setShowSearch(true);
    };

    const openMobileMenu = () => {
        setMobileMenu(true);
        setShowSearch(false);
    };

    const navigationHandler = (type) => {
        if (type === "movie") {
            navigate("/explore/movie");
        }
        if (type === "favorite") {
            navigate("/favorites");
        }
        if (type === "watched") {
            navigate("/watched");
        }
        if (type === "watchlist") {
            navigate("/watchlist");
        }
        if (type === "register") {
            navigate("/auth/register");
        }
        if (type === "signin") {
            navigate("/auth/signin");
        }
        if (type === "profile") {
            navigate("/profile");
        }
        setMobileMenu(false);
    };

    const handleLogout = () => {
        logout();
        navigate("/auth/signin");
    };

    return (
        <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
            <ContentWrapper>
                <div className="logo" onClick={() => navigate("/")}>
                    <img src={logo} alt="" />
                </div>
                <ul className="menuItems">
                    <li className="menuItem" onClick={() => navigationHandler("movie")}>
                        Movies
                    </li>
                    {user ? (
                        <>
                            <li className="menuItem" onClick={() => navigationHandler("watchlist")}>
                                Watch List
                            </li>
                            <li className="menuItem" onClick={() => navigationHandler("favorite")}>
                                Favorites
                            </li>
                            <li className="menuItem" onClick={() => navigationHandler("watched")}>
                                Watched
                            </li>
                            <li className="menuItem" onClick={() => navigationHandler("profile")}>
                                {!mobileMenu && <img src={avatar} alt="Avatar" className="avatar" />}
                                <p style={{
                                    background: 'linear-gradient(98.37deg, #f89e00 0.99%, #da2f68 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    fontWeight:'bold'
                                }}>{user?.username}</p>
                            </li>
                            <li className="menuItem" onClick={handleLogout}>
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="menuItem" onClick={() => navigationHandler("signin")}>
                                Sign In
                            </li>
                            <li className="menuItem" onClick={() => navigationHandler("register")}>
                                Register
                            </li>
                        </>
                    )}
                    <li className="menuItem">
                        <HiOutlineSearch onClick={openSearch} />
                    </li>
                </ul>
                <div className="mobileMenuItems">
                    <HiOutlineSearch onClick={openSearch} />
                    {mobileMenu ? (
                        <VscChromeClose onClick={() => setMobileMenu(false)} />
                    ) : (
                        <SlMenu onClick={openMobileMenu} />
                    )}
                </div>
            </ContentWrapper>
            {showSearch && (
                <div className="searchBar">
                    <ContentWrapper>
                        <div className="searchInput">
                            <input
                                type="text"
                                placeholder="Search for a movie "
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose onClick={() => setShowSearch(false)} />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    );
};

export default Header;