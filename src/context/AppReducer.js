export default (state, action) => {
    switch (action.type) {
        case "ADD_MOVIE_TO_WATCHLIST":
            return {
                ...state,
                watchList: [...state.watchList, action.payload]
            };
        case "REMOVE_MOVIE_FROM_WATCHLIST":
            return {
                ...state,
                watchList: state.watchList.filter(movie => movie.id !== action.payload)
            };
        case "ADD_MOVIE_TO_FAVORITES":
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case "REMOVE_MOVIE_FROM_FAVORITES":
            return {
                ...state,
                favorites: state.favorites.filter(movie => movie.id !== action.payload)
            };
        case "ADD_MOVIE_TO_WATCHED":
            return {
                ...state,
                watched: [...state.watched, action.payload]
            };
        case "REMOVE_MOVIE_FROM_WATCHED":
            return {
                ...state,
                watched: state.watched.filter(movie => movie.id !== action.payload)
            };
        default:
            return state;
    }
};
