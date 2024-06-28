export default (state, action) => {
    switch (action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchList: [action.payload, ...state.watchList],
            };
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchList: state.watchList.filter(
                    (movie) => movie.id !== action.payload
                ),
            };
        case "ADD_MOVIE_TO_WATCHED":
            return {
                ...state,
                watched: [action.payload, ...state.watched],
            };
        case "REMOVE_MOVIE_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(
                    (movie) => movie.id !== action.payload
                ),
            };
        case "ADD_MOVIE_TO_FAVORITES":
            return {
                ...state,
                favorites: [action.payload, ...state.favorites],
            };
        case "REMOVE_MOVIE_FROM_FAVORITES":
            return {
                ...state,
                favorites: state.favorites.filter(
                    (movie) => movie.id !== action.payload
                ),
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                error: null,
            };
        case "REGISTER_SUCCESS":
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                error: null,
            };
        case "LOGIN_ERROR":
            return {
                ...state,
                error: action.payload,
            };
        case "REGISTER_ERROR":
            return {
                ...state,
                error: action.payload,
            };

        case "UPDATE_USER":
            return {
                ...state,
                user: { ...state.user, ...action.payload },
                error: null,
            };
        case "UPDATE_FAILURE":
            return {
                ...state,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                token: null,
                watchList: [],
                watched: [],
                favorites: [],
                error: null,
            };
        default:
            return state;
    }
};
