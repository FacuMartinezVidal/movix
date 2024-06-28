import {useEffect} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {fetchDataFromApi} from "./utils/api";

import {useDispatch, useSelector} from "react-redux";
import {getApiConfiguration, getGenres} from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";
import WatchList from "./pages/watchList/WatchList.jsx";
import {GlobalProvider} from "./context/GlobalState.jsx";
import Favorites from "./pages/favorites/Favorites.jsx";
import Watched from "./pages/watched/Watched.jsx";
import Register from "./pages/auth/Register.jsx";
import SignIn from "./pages/auth/SignIn.jsx";
import Profile from "./pages/profile/Profile.jsx";

function App() {
    const dispatch = useDispatch();
    const {url} = useSelector((state) => state.home);
    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {

            const url = {
                backdrop: res.images.secure_base_url + "original",
                poster: res.images.secure_base_url + "original",
                profile: res.images.secure_base_url + "original",
            };

            dispatch(getApiConfiguration(url));
        });
    };

    const genresCall = async () => {
        let promises = [];
        let allGenres = {};

        promises.push(fetchDataFromApi(`/genre/movie/list`));


        const data = await Promise.all(promises);
        data.map(({genres}) => {
            return genres.map((item) => (allGenres[item.id] = item));
        });

        dispatch(getGenres(allGenres));
    };

    return (
        <GlobalProvider>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/:mediaType/:id" element={<Details/>}/>
                    <Route path="/search/:query" element={<SearchResult/>}/>
                    <Route path="/explore/:mediaType" element={<Explore/>}/>
                    <Route path="*" element={<PageNotFound/>}/>
                    <Route path="/watchlist" element={<WatchList/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/watched" element={<Watched/>}/>
                    <Route path="/auth/register" element={<Register/>}/>
                    <Route path="auth/signin" element={<SignIn/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;
