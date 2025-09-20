/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { FaGlobe } from "react-icons/fa";
import { FcHome } from "react-icons/fc";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
    const pathname = usePathname();
    const links = [
        {
            name: "Homes",
            href: "/",
            icon: (
                <FcHome className="text-3xl mr-1 transition-transform duration-200" />
            ),
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
                    <img
                        src="hot-air-balloon.png"
                        alt=""
                        height="28px"
                        width="32px"
                        className="mr-1"
                    />
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
                    <img
                        src="desk-bell.png"
                        alt=""
                        height="28px"
                        width="32px"
                        className="mr-1"
                    />
                </div>
            ),
        },
    ];

    return (
        <>
            <div className="bg-neutral-100">
                <nav className="flex flex-row  items-stretch justify-evenly py-5 px-1 bg-neutral-100">
                    {/* Logo */}
                    <div className="flex flex-row space-x-1 items-center">
                        <Link href="/" className="flex flex-row space-x-1 items-center">
                            <img src="airbnb.png" alt="" height="38px" width="38px" />
                            <h3 className="text-red-600 text-2xl montserrat">airbnb</h3>
                        </Link>
                    </div>

                    {/* Links */}
                    <ul className="flex flex-row lg:mx-32">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <li key={link.name} className="flex flex-col items-center px-6">
                                    <Link
                                        href={link.href}
                                        className={`flex flex-row items-center py-3 ${isActive ? "font-bold text-black" : "text-neutral-500"
                                            }`}
                                    >
                                        <div
                                            className={`flex flex-row items-center ${isActive ? "" : "hover:scale-110"
                                                } transition-transform duration-200`}
                                        >
                                            {link.icon}
                                        </div>
                                        <span className="ml-1">{link.name}</span>
                                    </Link>
                                    {/* Active underline */}
                                    {isActive && (
                                        <div className="h-[3px] w-full bg-gray-800 rounded-full"></div>
                                    )}
                                </li>
                            );
                        })}
                    </ul>

                    {/* Right buttons */}
                    <div className="flex flex-row space-x-3">
                        <button onClick={() => document.getElementById('my_modal_5').showModal()} className="text-black from-neutral-900 rounded-full border-0 px-3 py-2 hover:bg-gray-200">
                            Become a host
                        </button>
                        <button className="rounded-full p-3 bg-gray-200 hover:bg-gray-300">
                            <FaGlobe className="text-xl" />
                        </button>
                        <button className="rounded-full p-3 bg-gray-200 hover:bg-gray-300">
                            <img src="menu.png" alt="" height="24px" width="24px" />
                        </button>
                    </div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    {/* <button className="btn" onClick={() => document.getElementById('my_modal_5').showModal()}>open modal</button> */}
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
        </>
    );
};

export default Navbar;
