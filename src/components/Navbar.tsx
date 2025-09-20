/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaGlobe } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";;
import { useTranslation } from "next-i18next";
import i18n from "../i18n/i18";

const Navbar = () => {
    const pathname = usePathname();
    const { i18n, t } = useTranslation("common"); // load translations

    const [openLang, setOpenLang] = useState(false);

    const links = [
        {
            name: "Homes",
            href: "/",
            icon: <FcHome className="text-3xl mr-1 transition-transform duration-200" />,
        },
        {
            name: "Experiences",
            href: "/experiences",
            icon: (
                <div className="relative flex flex-row items-center transition-transform duration-200">
                    <span
                        style={{
                            backgroundColor: "#363F38",
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: "bold",
                            padding: "2px 6px",
                            borderRadius: "12px 12px 12px 0px",
                            textTransform: "uppercase",
                        }}
                        className="absolute -top-3 left-6"
                    >
                        NEW
                    </span>
                    <img src="hot-air-balloon.png" alt="" height="28px" width="32px" className="mr-1" />
                </div>
            ),
        },
        {
            name: "Services",
            href: "/services",
            icon: (
                <div className="relative flex flex-row items-center transition-transform duration-200">
                    <span
                        style={{
                            backgroundColor: "#363F38",
                            color: "#fff",
                            fontSize: "10px",
                            fontWeight: "bold",
                            padding: "2px 6px",
                            borderRadius: "12px 12px 12px 0px",
                            textTransform: "uppercase",
                        }}
                        className="absolute -top-3 left-6"
                    >
                        NEW
                    </span>
                    <img src="desk-bell.png" alt="" height="28px" width="32px" className="mr-1" />
                </div>
            ),
        },
    ];
    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
        setOpenLang(false);
    };
    const langRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langRef.current && !langRef.current.contains(event.target as Node)) {
                setOpenLang(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="bg-neutral-100">
            <nav className="flex flex-row items-center justify-between py-5 px-4 md:px-10">
                {/* Logo - hidden on mobile */}
                <div className="hidden md:flex items-center space-x-2">
                    <Link href="/" className="flex items-center space-x-2">
                        <img src="airbnb.png" alt="" height="38px" width="38px" />
                        <h3 className="text-red-600 text-2xl montserrat">airbnb</h3>
                    </Link>
                </div>

                {/* Middle links - always visible on mobile */}
                <ul className="flex flex-row space-x-6 justify-center flex-1">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.name} className="flex flex-col items-center">
                                <Link
                                    href={link.href}
                                    className={`flex flex-row items-center py-1 ${isActive ? "font-bold text-black" : "text-neutral-500"}`}
                                >
                                    <div className={`flex items-center ${isActive ? "" : "hover:scale-110"} transition-transform duration-200`}>
                                        {link.icon}
                                    </div>
                                    <span className="ml-1 text-sm md:text-base">{link.name}</span>
                                </Link>
                                {isActive && <div className="h-[3px] w-full bg-gray-800 rounded-full mt-1"></div>}
                            </li>
                        );
                    })}
                </ul>

                {/* Right buttons - hidden on mobile */}
                <div className="hidden md:flex items-center space-x-3">
                    <button onClick={() => document.getElementById('my_modal_5').showModal()} className="text-black from-neutral-900 rounded-full border-0 px-3 py-2 hover:bg-gray-200">
                        Become a host
                    </button>
                    {/* Language Dropdown */}
                    <div className="relative" ref={langRef}>
                        <button
                            className="rounded-full p-3 bg-gray-200 hover:bg-gray-300"
                            onClick={() => setOpenLang(!openLang)}
                        >
                            <FaGlobe className="text-xl" />
                        </button>
                        {openLang && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-20">
                                <button onClick={() => changeLanguage("en")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    English
                                </button>
                                <button onClick={() => changeLanguage("bn")} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                                    বাংলা
                                </button>
                            </div>
                        )}
                    </div>
                    <button className="rounded-full p-3 bg-gray-200 hover:bg-gray-300">
                        <img src="menu.png" alt="" height="24px" width="24px" />
                    </button>
                </div>
                {/* modal */}
                <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                    <div className="  w-[1000px] h-[600px] bg-white px-15 py-20 rounded-3xl ">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-circle btn-ghost absolute left-70 top-20 text-black font-bold">✕</button>
                        </form>
                        {/* <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p> */}
                        <h3 className="text-center text-3xl font-bold pt-6 py-20">What would you like to host?</h3>
                        <div className="grid grid-cols-3 gap-3">
                            {/* Home */}
                            <div className="border-2 p-12 flex flex-col items-center justify-center rounded-xl border-gray-300 gap-5  cursor-pointer">
                                <FcHome className="text-8xl mr-1" />
                                <h3 className="text-center">Home</h3>
                            </div>

                            {/* Experiences */}
                            <div className="border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center gap-5 p-12  cursor-pointer">
                                <img
                                    src="hot-air-balloon.png"
                                    alt=""
                                    className="mr-1 w-20 h-20"
                                />
                                <h3>Experience</h3>
                            </div>

                            {/* Services */}
                            <div className="border-2 border-gray-300 rounded-xl flex flex-col items-center justify-center gap-5 p-12  cursor-pointer">
                                <img
                                    src="desk-bell.png"
                                    alt=""
                                    className="mr-1 w-20 h-20"
                                />
                                <h3>Service</h3>
                            </div>
                        </div>
                        <div className="modal-action pt-8">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn p-8 rounded-2xl text-xl text-white" disabled>Next</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            </nav>
        </div>
    );
};

export default Navbar;
