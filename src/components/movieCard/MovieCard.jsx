import React, { useContext } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faHeart, faEye, faHeartBroken, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import { GlobalContext } from "../../context/GlobalState.jsx";

const MovieCard = ({ data, fromSearch }) => {
    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    const {
        addMovieToWatchList,
        removeMovieFromWatchList,
        addMovieToFavorites,
        removeMovieFromFavorites,
        addMovieToWatched,
        removeMovieFromWatched,
        watchList,
        favorites,
        watched
    } = useContext(GlobalContext);

    let storedMovie = watchList.find((o) => o.id === data.id);
    let storedFavorite = favorites.find((o) => o.id === data.id);
    let storedWatched = watched.find((o) => o.id === data.id);

    const isMovieInWatchList = !!storedMovie;
    const isMovieInFavorites = !!storedFavorite;
    const isMovieInWatched = !!storedWatched;

    return (
        <div className="movieCard">
            <div className="posterBlock" onClick={() => navigate(`/movie/${data.id}`)}>
                <Img className="posterImg" src={posterUrl} />
                {!fromSearch && (
                    <>
                        <div className="overlay">
                            <CircleRating rating={data.vote_average.toFixed(1)} />
                            <button
                                className={`iconButton ${isMovieInWatchList ? "active" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    isMovieInWatchList ? removeMovieFromWatchList(data.id) : addMovieToWatchList(data);
                                }}
                            >
                                <FontAwesomeIcon icon={isMovieInWatchList ? faMinus : faPlus} />
                            </button>
                            <button
                                className={`iconButton ${isMovieInFavorites ? "active" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    isMovieInFavorites ? removeMovieFromFavorites(data.id) : addMovieToFavorites(data);
                                }}
                            >
                                <FontAwesomeIcon icon={isMovieInFavorites ? faHeartBroken : faHeart} />
                            </button>
                            <button
                                className={`iconButton ${isMovieInWatched ? "active" : ""}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    isMovieInWatched ? removeMovieFromWatched(data.id) : addMovieToWatched(data);
                                }}
                            >
                                <FontAwesomeIcon icon={isMovieInWatched ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <Genres data={data.genre_ids.slice(0, 2)} />
                    </>
                )}
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </div>
    );
};

export default MovieCard;
