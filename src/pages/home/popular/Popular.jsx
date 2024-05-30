import React, {useState} from "react";

import Carousel from "../../../components/carousel/Carousel";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";

import useFetch from "../../../hooks/useFetch";

const Popular = () => {
    const [endpoint, setEndpoint] = useState("movie");
    const {data, loading} = useFetch(`/${endpoint}/popular`);
    return (
        <div className="carouselSection">
            <ContentWrapper>
                <span className="carouselTitle">What's Popular</span>
            </ContentWrapper>
            <Carousel
                data={data?.results}
                loading={loading}
                endpoint={"movie"}
            />
        </div>
    );
};

export default Popular;
