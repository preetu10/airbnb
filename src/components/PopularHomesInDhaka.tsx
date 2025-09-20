"use client"
import React, { useEffect, useState } from "react";
import CarouselSection from "./CarouselSection";
import { getPlacesinDhaka, getPlacesinBusan, getPlacesinKualalampur } from "../services/getApis";

const PopularHomesInDhaka = () => {
    const [dhakaData, setDhakaData] = useState([]);
    const [busanData, setBusanData] = useState([]);
    const [kuaData, setKuaData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPlacesinDhaka();
            setDhakaData(data);
            const data1 = await getPlacesinBusan();
            setBusanData(data1);
            const data2 = await getPlacesinKualalampur();
            setKuaData(data2);
        };
        fetchData();
    }, []);
    return (
        <div>
            <CarouselSection title="Popular Homes in Dhaka District" data={dhakaData} />
            <CarouselSection title="Avalilable Next Month in Kualalampur" data={kuaData} />
            <CarouselSection title="Stay in Bangkok" data={dhakaData} />
            <CarouselSection title="Avalilable Next Month in London" data={busanData} />
            <CarouselSection title="Homes in Toronto" data={busanData} />
            <CarouselSection title="Avalilable Next Month in Seoul" data={busanData} />
            <CarouselSection title="Places to stay in Osaka" data={dhakaData} />
            <CarouselSection title="Checkout Homes in Tokyo" data={kuaData} />
            <CarouselSection title="Popular Homes in Melbourne" data={dhakaData} />
            <CarouselSection title="Stay in Busan" data={busanData} />
        </div>
    );
};

export default PopularHomesInDhaka;
