import React, {createContext, useEffect, useReducer} from "react";
import axiosInstance from "../utils/axiosInstance";
import AppReducer from "./AppReducer";

const initialState = {
    watchList: JSON.parse(localStorage.getItem("watchList")) || [],
    watched: JSON.parse(localStorage.getItem("watched")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    error: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem("watchList", JSON.stringify(state.watchList));
        localStorage.setItem("watched", JSON.stringify(state.watched));
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
        localStorage.setItem("user", JSON.stringify(state.user));
        if (state.token) {
            localStorage.setItem("token", state.token);
        } else {
            localStorage.removeItem("token");
        }
    }, [state.watchList, state.watched, state.favorites, state.user, state.token]);

    const addMovieToWatchList = async (movie) => {
        const userId = state.user.id;
        const { id } = movie;

        const movieDB = await findMovieInDatabase(id);
        if (!movieDB) {
            await addMovieToDatabase(movie);
        }

        const response = await axiosInstance.post(`/watchlist`, {
            userId,
            id,
        });

        if (response.data.success) {
            dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
        }
    };

    const addMovieToWatched = async (movie) => {
        const userId = state.user.id;
        const { id } = movie;

        const movieDB = await findMovieInDatabase(id);
        if (!movieDB) {
            await addMovieToDatabase(movie);
        }

        const response = await axiosInstance.post(`/watched`, {
            userId,
            id,
        });

        if (response.data.success) {
            dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
        }
    };

    const addMovieToFavorites = async (movie) => {
        const userId = state.user.id;
        const { id } = movie;

        const movieDB = await findMovieInDatabase(id);
        if (!movieDB) {
            await addMovieToDatabase(movie);
        }

        const response = await axiosInstance.post(`/favorites`, {
            userId,
            id,
        });

        if (response.data.success) {
            dispatch({ type: "ADD_MOVIE_TO_FAVORITES", payload: movie });
        }
    };

    const removeMovieFromWatchList = async (id) => {
        const userId = state.user.id;

        const response = await axiosInstance.delete(`/watchlist/${userId}/${id}`);
        if (response.data.success) {
            dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
        }
    };

    const removeMovieFromWatched = async (id) => {
        const userId = state.user.id;

        const response = await axiosInstance.delete(`/watched/${userId}/${id}`);
        if (response.data.success) {
            dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: id });
        }
    };

    const removeMovieFromFavorites = async (id) => {
        const userId = state.user.id;

        const response = await axiosInstance.delete(`/favorites/${userId}/${id}`);
        if (response.data.success) {
            dispatch({ type: "REMOVE_MOVIE_FROM_FAVORITES", payload: id });
        }
    };

    const loginUser = async (email, password) => {
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            const { user, token } = response.data;

            dispatch({ type: "LOGIN_SUCCESS", payload: { user, token } });
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE", payload: error.response.data.message });
        }
    };

    const updateUser = async (userData) => {
        const {email} = userData;
        try {
            const response = await axiosInstance.put(`/users/email/${email}`, userData, {
                headers: { Authorization: `Bearer ${state.token}` },
            });
            const updatedUser = response.data.user;
            dispatch({ type: "UPDATE_USER", payload: updatedUser });
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE", payload: error.response.data.message });
        }
    };

    const logoutUser = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <GlobalContext.Provider
            value={{
                watchList: state.watchList,
                watched: state.watched,
                favorites: state.favorites,
                user: state.user,
                token: state.token,
                error: state.error,
                addMovieToWatchList,
                addMovieToWatched,
                addMovieToFavorites,
                removeMovieFromWatchList,
                removeMovieFromWatched,
                removeMovieFromFavorites,
                loginUser,
                updateUser,
                logoutUser,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
