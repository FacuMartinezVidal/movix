import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import useFetch from "../../hooks/useFetch.jsx";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard.jsx";
import {GlobalContext} from "../../context/GlobalState.jsx";

let filters = {};

const sortbyData = [
    {value: "popularity.desc", label: "Popularity Descending"},
    {value: "popularity.asc", label: "Popularity Ascending"},
    {value: "vote_average.desc", label: "Rating Descending"},
    {value: "vote_average.asc", label: "Rating Ascending"},
    {
        value: "primary_release_date.desc",
        label: "Release Date Descending",
    },
    {value: "primary_release_date.asc", label: "Release Date Ascending"},
    {value: "original_title.asc", label: "Title (A-Z)"},
];

const Watched = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [genre, setGenre] = useState(null);
    const [sortby, setSortby] = useState(null);
    const {mediaType} = useParams();

    const {data: genresData} = useFetch(`/genre/movie/list`);

    const {watched, fetchUserLists} = useContext(GlobalContext);
    useEffect(() => {
        filters = {};
        setData(null);

        setSortby(null);
        setGenre(null);
    }, [mediaType]);
    useEffect(() => {
        fetchUserLists();
    }, []); // Fetch user lists only once when the component mounts

    const onChange = (selectedItems, action) => {
        if (action.name === "sortby") {
            setSortby(selectedItems);
            if (action.action !== "clear") {
                filters.sort_by = selectedItems.value;
            } else {
                delete filters.sort_by;
            }
        }

        if (action.name === "genres") {
            setGenre(selectedItems);
            if (action.action !== "clear") {
                let genreId = selectedItems.map((g) => g.id);
                genreId = JSON.stringify(genreId).slice(1, -1);
                filters.with_genres = genreId;
            } else {
                delete filters.with_genres;
            }
        }

    };

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        Already seen Movies!
                    </div>
                </div>
                {loading && <Spinner initial={true}/>}
                {!loading && (
                    <>
                        {watched.length > 0 ? (
                            <InfiniteScroll
                                className="content"
                                dataLength={data?.results?.length || []}
                                next={null}
                                hasMore={null}
                                loader={<Spinner/>}
                            >
                                {watched.map((item) => {
                                    const movie = item.movie;
                                    return (
                                        movie && (
                                            <MovieCard key={movie.id} data={movie} mediaType={mediaType} />
                                        )
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
}

export default Watched;