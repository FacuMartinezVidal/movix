import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const TMDB_TOKEN = import.meta.env.VITE_APP_TMDB_TOKEN;

const headers = {
    Authorization: "bearer " + TMDB_TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
    try {
        const {data} = await axios.get(BASE_URL + url, {
            headers,
            params,
        });
        return data;
    } catch (err) {
        return err;
    }
};


const API_URL = "http://localhost:8000/api/v1";

export const addMovieToDatabase = async (movie) => {
    const response = await axios.post(`${API_URL}/movies`, movie);
    return response.data;
};


export const addToWatchlist = async (userId, movie) => {
    const response = await axios.post(`${API_URL}/watchlist`, {
        userId,
        movie,
    });
    return response.data;
};

export const removeFromWatchlist = async (userId, movieId) => {
    const response = await axios.delete(`${API_URL}/watchlist/${userId}/${movieId}`);
    return response.data;
};

export const addToWatched = async (userId, movie) => {
    const response = await axios.post(`${API_URL}/watched`, {
        userId,
        movie,
    });
    return response.data;
};

export const removeFromWatched = async (userId, movieId) => {
    const response = await axios.delete(`${API_URL}/watched/${userId}/${movieId}`);
    return response.data;
};

export const addToFavorites = async (userId, movie) => {
    const response = await axios.post(`${API_URL}/favorites`, {
        userId,
        movie,
    });
    return response.data;
};

export const removeFromFavorites = async (userId, movieId) => {
    const response = await axios.delete(`${API_URL}/favorites/${userId}/${movieId}`);
    return response.data;
};