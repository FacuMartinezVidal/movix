import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer.js";

const initialState = {
    watchList: [],
    favorites: [],
    watched: []
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // actions
    const addMovieToWatchList = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
    };

    const removeMovieFromWatchList = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
    };

    const addMovieToFavorites = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_FAVORITES", payload: movie });
    };

    const removeMovieFromFavorites = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_FAVORITES", payload: id });
    };

    const addMovieToWatched = (movie) => {
        dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
    };

    const removeMovieFromWatched = (id) => {
        dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: id });
    };

    return (
        <GlobalContext.Provider
            value={{
                watchList: state.watchList,
                favorites: state.favorites,
                watched: state.watched,
                addMovieToWatchList,
                removeMovieFromWatchList,
                addMovieToFavorites,
                removeMovieFromFavorites,
                addMovieToWatched,
                removeMovieFromWatched
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    );
};
