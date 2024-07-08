import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper.jsx";
import Spinner from "../../components/spinner/Spinner.jsx";
import InfiniteScroll from "react-infinite-scroll-component";
import MovieCard from "../../components/movieCard/MovieCard.jsx";
import {GlobalContext} from "../../context/GlobalState.jsx";


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
    const {mediaType} = useParams();



    const {watched, fetchUserLists} = useContext(GlobalContext);

    useEffect(() => {
        fetchUserLists();
    }, []); // Fetch user lists only once when the component mounts


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
                                            <MovieCard key={movie.id} data={movie} mediaType={mediaType} view="watched" />
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