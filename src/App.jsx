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

function App() {
    const dispatch = useDispatch();
    const {url} = useSelector((state) => state.home);
    console.log(url);

    useEffect(() => {
        fetchApiConfig();
        genresCall();
    }, []);

    const fetchApiConfig = () => {
        fetchDataFromApi("/configuration").then((res) => {
            console.log(res);

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

        promises.push(fetchDataFromApi(`/genre/${url}/list`));


        const data = await Promise.all(promises);
        console.log(data);
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
                </Routes>
                <Footer/>
            </BrowserRouter>
        </GlobalProvider>
    );
}

export default App;
