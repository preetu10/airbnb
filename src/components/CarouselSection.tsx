/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useRef } from "react";
import { FaChevronLeft, FaChevronRight, FaHeart, FaStar } from "react-icons/fa";

interface Home {
    id: number;
    title: string;
    available: string;
    price: string;
    rating: number;
    speciality: string,
    img: string;
}

interface CarouselSectionProps {
    title: string;
    data: Home[];
}

const CarouselSection: React.FC<CarouselSectionProps> = ({ title, data }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (containerRef.current) {
            const { scrollLeft, clientWidth } = containerRef.current;
            const scrollTo =
                direction === "left"
                    ? scrollLeft - clientWidth
                    : scrollLeft + clientWidth;
            containerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <div className="relative w-full px-8 py-5">
            {/* Section Header with Arrows */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-xl text-black">{title} &gt;</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll("left")}
                        className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
                    >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div
                ref={containerRef}
                className="flex overflow-x-auto gap-4 scroll-smooth no-scrollbar"
            >
                {data?.map((home) => (
                    <div
                        key={home.img}
                        className="min-w-[225px] max-w-[225px] bg-white border-0 rounded-xl shadow-sm overflow-hidden relative"
                    >
                        {/* Image */}
                        <div className="relative">
                            <img
                                src={home.img}
                                alt={home.title}
                                className="w-full h-40 object-cover"
                            />
                            {
                                home.speciality!=="" ?<span className="absolute top-2 left-2 bg-white text-xs font-semibold px-2 py-1 rounded-lg">
                                {home.speciality}
                            </span>: ""
                            }
                            <button className="absolute top-2 right-2  p-2 rounded-full shadow">
                                <FaHeart className="text-gray-800 hover:text-xl" />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="p-3">
                            <h4 className="font-semibold text-black">{home.title}</h4>
                            <p className="text-sm text-neutral-500">{home.available}</p>
                            <div className="flex flex-row gap-5 items-center justify-between"><p className="text-sm text-neutral-500 mt-1">{home.price}</p>
                            <div className="flex flex-row gap-1 text-sm text-neutral-500"><FaStar></FaStar> {home.rating}</div></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarouselSection;
