import React, {useContext} from "react";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import PosterFallback from "../../assets/no-poster.png";
import {GlobalContext} from "../../context/GlobalState.jsx";

const MovieCard = ({data, fromSearch}) => {
    const {url} = useSelector((state) => state.home);
    const navigate = useNavigate();
    const posterUrl = data.poster_path
        ? url.poster + data.poster_path
        : PosterFallback;

    const {addMovieToWatchList, watchList} = useContext(GlobalContext);

    let storedMovie = watchList.find((o) => o.id === data.id);
    const isMovieInWatchList = !!storedMovie;

    return (
        <div className="movieCard">
            <div className="posterBlock" onClick={() => navigate(`/movie/${data.id}`)}>
                <Img className="posterImg" src={posterUrl}/>
                {!fromSearch && (
                    <>
                        <div className="overlay">
                            <CircleRating rating={data.vote_average.toFixed(1)}/>
                            <button
                                className="addButton"
                                disabled={isMovieInWatchList}
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevents navigation click
                                    addMovieToWatchList(data);
                                }}
                            >
                                Add to Watchlist
                            </button>
                        </div>
                        <Genres data={data.genre_ids.slice(0, 2)}/>
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
