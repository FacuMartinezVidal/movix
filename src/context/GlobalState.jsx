// initial state
import {createContext, useReducer} from "react";
import AppReducer from "./AppReducer.js";

const initialState = {
    watchList: [],
    watched: []
}

export const GlobalContext = createContext(initialState)

export const GlobalProvider = props => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    //actions
    const addMovieToWatchList = (movie) => {
        dispatch({type: "ADD_MOVIE_TO_WATCHLIST", payload: movie});
    }

    return (
        <GlobalContext.Provider value={{watchList: state.watchList, watched: state.watched, addMovieToWatchList}}>
            {props.children}
        </GlobalContext.Provider>
    )
}

