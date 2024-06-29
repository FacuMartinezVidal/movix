import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

import Img from "../../../components/lazyLoadImage/Img";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

const HeroBanner = () => {
    const [background, setBackground] = useState("");
    const [query, setQuery] = useState("");
    const navigate = useNavigate();
    const { url } = useSelector((state) => state.home);
    const { data, loading } = useFetch("/movie/upcoming");

    useEffect(() => {
        if (data && data.results && data.results.length > 0) {
            const bg = url.backdrop + data.results[Math.floor(Math.random() * data.results.length)].backdrop_path;
            setBackground(bg);
        }
    }, [data, url.backdrop]);

    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.trim().length > 0) {
            navigate(`/search/${query}`);
        }
    };

    const handleSearchClick = () => {
        if (query.trim().length > 0) {
            navigate(`/search/${query}`);
        }
    };

    return (
        <div className="heroBanner">
            {!loading && background && (
                <div className="backdrop-img">
                    <Img src={background} />
                </div>
            )}
            <div className="opacity-layer"></div>
            <ContentWrapper>
                <div className="heroBannerContent">
                    <span className="title">Welcome !</span>
                    <span className="subTitle">
                        Millions of movies to discover. Explore now.
                    </span>
                    <div className="searchInput">
                        <input
                            type="text"
                            placeholder="Search for a movie...."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyUp={searchQueryHandler}
                        />
                        <button onClick={handleSearchClick}>Search</button>
                    </div>
                </div>
            </ContentWrapper>
        </div>
    );
};

export default HeroBanner;
