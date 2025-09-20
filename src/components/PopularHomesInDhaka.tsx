"use client"
import React, { useEffect, useState } from "react";
import CarouselSection from "./CarouselSection";
import { getPlacesinDhaka, getPlacesinBusan, getPlacesinKualalampur } from "../services/getApis";


// const demoData = [
//   {
//     id: 1,
//     title: "Apartment in Busan",
//     available: "26-28 Sept",
//     price: "$500 for 2 nights",
//     rating: 5.00,
//     speciality: "Guest Favourite",
//     img: "https://i.ibb.co.com/DjpMrM9/busan1.jpg",
//   },
//   {
//     id: 2,
//     title: "Apartment in Busan",
//     available: "17–19 Oct",
//     price: "$200 for 2 nights",
//     rating: 4.88,
//     speciality: "",
//     img: "https://i.ibb.co.com/VGkrj3P/busan2.jpg",
//   },
//   {
//     id: 3,
//     title: "Apartment in Busan",
//     available: "10–12 Oct",
//     price: "$200 for 2 nights",
//     rating: 4.96,
//     speciality: "Guest Favourite",
//     img: "https://i.ibb.co.com/PdBvGw6/busan3.jpg",
//   },
//   {
//     id: 4,
//     title: "Apartment in Busan",
//     available: "17–19 Oct",
//     price: "$90 for 2 nights",
//     rating: 4.83,
//     speciality: "",
//     img: "https://i.ibb.co.com/1fP5ShZB/busan4.jpg",
//   },
//   {
//     id: 5,
//     title: "Apartment in Busan",
//     available: "17–19 Oct",
//     price: "$320 for 2 nights",
//     rating: 4.95,
//     speciality: "Guest Favourite",
//     img: "https://i.ibb.co.com/jZyYxyhP/busan5.jpg",
//   },
//   {
//     id: 6,
//     title: "Apartment in Busan",
//     available: "17–19 Oct",
//     price: "$200 for 2 nights",
//     rating: 4.98,
//     speciality: "Guest Favourite",
//     img: "https://i.ibb.co.com/DfKqTHKj/busan6.jpg",
//   },
//   {
//     id: 7,
//     title: "Apartment in Busan",
//     available: "31 Oct – 2 Nov",
//     price: "$150 for 2 nights",
//     rating: 4.86,
//     speciality: "Guest Favourite",
//     img: "https://i.ibb.co.com/Jwy7f3pj/busan7.jpg",
//   },
//   {
//     id: 8,
//     title: "Apartment in Busan",
//     available: "25–27 Oct",
//     price: "$200 for 2 nights",
//     rating: 4.92,
//     speciality: "",
//     img: "https://i.ibb.co.com/wNqkx3qy/busan8.jpg",
//   },
// ];


const PopularHomesInDhaka = () => {
    const [dhakaData, setDhakaData] = useState([]);
    const [busanData, setBusanData] = useState([]);
    const [kuaData, setKuaData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPlacesinDhaka();
            setDhakaData(data);
            const data1= await getPlacesinBusan();
            setBusanData(data1);
            const data2= await getPlacesinKualalampur();
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
