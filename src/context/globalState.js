// initial state
import {createContext} from "react";

const intialState = {
    watchList: [],
    watched: []
}

export const GlobalContext = createContext(intialState)

export const GlobalProvider = props => {
    
}

