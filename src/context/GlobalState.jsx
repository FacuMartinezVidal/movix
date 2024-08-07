import React, {createContext, useEffect, useReducer} from "react";
import axiosInstance from "../utils/axiosInstance";
import AppReducer from "./AppReducer";
import axios from "axios";

const initialState = {
    watchList: JSON.parse(localStorage.getItem("watchList")) || [],
    watched: JSON.parse(localStorage.getItem("watched")) || [],
    favorites: JSON.parse(localStorage.getItem("favorites")) || [],
    user: JSON.parse(localStorage.getItem("user")) || null,
    error: null,
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        if (state.user && state.user.token) {
            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${state.user.token}`;
            fetchUserLists();
        }
    }, [state.user]);

    const fetchUserLists = async () => {
        if (state.user) {
            const userId = state.user.id;
            try {
                const [watchListResponse, watchedResponse, favoritesResponse] = await Promise.all([
                    axiosInstance.get(`/watchlist/${userId}`),
                    axiosInstance.get(`/watched/${userId}`),
                    axiosInstance.get(`/favorites/${userId}`)
                ]);
                dispatch({ type: "SET_WATCHLIST", payload: watchListResponse.data });
                dispatch({ type: "SET_WATCHED", payload: watchedResponse.data });
                dispatch({ type: "SET_FAVORITES", payload: favoritesResponse.data });
            } catch (error) {
                console.error("Error fetching user lists:", error);
            }
        }
    };

    const findMovieInDatabase = async (id) => {
        try {
            const response = await axiosInstance.get(`/movies/${id}`);
            return response.data.movie;
        } catch (error) {
            return null;
        }
    };

    const addMovieToDatabase = async (movie) => {
        try {
            const response = await axiosInstance.post(`/movies`, movie);
            return response.data.movie;
        } catch (error) {
            return null;
        }
    };

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
            dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: { ...movie, api_id: id } });
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
            dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: { ...movie, api_id: id } });
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
            dispatch({ type: "ADD_MOVIE_TO_FAVORITES", payload: { ...movie, api_id: id } });
        }
    };

    const removeMovieFromWatchList = async (id) => {
        const userId = state.user.id;

        const response = await axiosInstance.delete(`/watchlist/${userId}/${id}`);
        if (response.data.success) {
            dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
            fetchUserLists()
        }
    };

    const removeMovieFromWatched = async (id) => {
        const userId = state.user.id;

        const response = await axiosInstance.delete(`/watched/${userId}/${id}`);
        if (response.data.success) {
            dispatch({ type: "REMOVE_MOVIE_FROM_WATCHED", payload: id });
            fetchUserLists()
        }
    };

    const removeMovieFromFavorites = async (id) => {
        const userId = state.user.id;

        const response = await axiosInstance.delete(`/favorites/${userId}/${id}`);
        if (response.data.success) {
            dispatch({ type: "REMOVE_MOVIE_FROM_FAVORITES", payload: id });
            fetchUserLists()
        }
    };

    const login = async (email, password) => {
        try {
            const response = await axios.post("http://localhost:8000/api/v1/auth/login", { email, password });
            const { data } = response;
            if (data.success) {
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: data.user,
                        token: data.token,
                    },
                });
                axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                return { success: true };
            } else {
                dispatch({ type: "LOGIN_ERROR", payload: data.message });
                return { success: false, message: data.message };
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            dispatch({ type: "LOGIN_ERROR", payload: errorMessage });
            return { success: false, message: errorMessage };
        }
    };

    const register = async (username, email, password) => {
        try {
            console.log("Intentando registrar usuario...");
            const response = await axios.post("http://localhost:8000/api/v1/auth/register", { username, email, password });
            console.log("Respuesta del servidor (registro):", response.data);
            const { data } = response;
            if (data.success) {
                return { success: true };
            } else {
                dispatch({ type: "REGISTER_ERROR", payload: data.message });
                return { success: false, message: data.message };
            }
        } catch (error) {
            console.error("Error durante el registro:", error);
            const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
            dispatch({ type: "REGISTER_ERROR", payload: errorMessage });
            return { success: false, message: errorMessage };
        }
    };

    const updateUser = async (updateUser) => {
        const { email, username } = updateUser;
        try {
            const response = await axiosInstance.put(`/users/email/${email}`, {username});
            const updatedUser = response.data.user;
            const { token } = state.user;
            const payload = { ...updatedUser, token };
            dispatch({ type: "UPDATE_USER", payload: payload });
            localStorage.setItem("user", JSON.stringify(payload));
            return { success: true };
        } catch (error) {
            dispatch({ type: "UPDATE_FAILURE", payload: error.response.data.message });
            return { success: false, message: error.response.data.message };
        }
    };

    const changePassword = async (password, token) => {
        try {
            const response = await axiosInstance.put("http://localhost:8000/api/v1/users/change-password", {token, password});
            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    }

    const sendTokenPassword = async (email, username) => {

        try {
            const response = await axiosInstance.post("http://localhost:8000/api/v1/users/send-token-password", { email, username });
            return { success: true, message: response.data.message };
        } catch (error) {
            return { success: false, message: error.response.data.message };
        }
    }

    const logout = () => {
        console.log("Iniciando proceso de logout...");
        dispatch({ type: "LOGOUT" });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("watchList");
        localStorage.removeItem("watched");
        localStorage.removeItem("favorites");
        delete axiosInstance.defaults.headers.common['Authorization'];
        console.log("Logout completado. Estado y localStorage limpiados.");
    };

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                dispatch,
                addMovieToWatchList,
                addMovieToWatched,
                addMovieToFavorites,
                removeMovieFromWatchList,
                removeMovieFromWatched,
                removeMovieFromFavorites,
                login,
                register,
                updateUser,
                logout,
                fetchUserLists,
                sendTokenPassword,
                changePassword,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};
