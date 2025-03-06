"use client";
import Link from "next/link";
import navItems from "./navitems";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <nav className="block w-full max-w-screen px-4 py-4 mx-auto bg-gradient-to-r from-blue-400 to-blue-900 sticky top-3 shadow-lg lg:px-8 backdrop-blur-lg backdrop-saturate-150 z-[9999]">
                <div className="container flex flex-wrap items-center justify-between mx-auto font-poppins">

                    <a
                        className="mr-4 block cursor-pointer py-1.5 text-transparent font-black text-3xl lg:text-3xl bg-gradient-to-r from-red-900 to-orange-900 bg-clip-text" style={{ fontSize: '34px' }}
                    >
                        ProjectName
                    </a>

                    <div className="lg:hidden">
                        <button
                            className="text-black"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </button>
                    </div>

                    <div className="hidden lg:block">
                        <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                            {navItems.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex items-center text-lg gap-x-2 text-white font-bold hover:bg-purple-300 hover:text-black rounded-md transition-all px-4 py-2 h-8"

                                >
                                    <Link href={item.href} className="flex items-center">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {isMenuOpen && (
                        <div className="lg:hidden absolute top-16 left-0 w-full bg-gradient-to-r from-blue-400 to-blue-900 text-white p-4">
                            <ul className="flex flex-col gap-4">
                                {navItems.map((item, index) => (
                                    <li
                                        key={index}
                                        className="flex items-center text-lg gap-x-2 text-white font-bold hover:bg-purple-300 hover:text-black rounded-md transition-all px-4 py-2 h-8"

                                    >
                                        <Link href={item.href} className="flex items-center">
                                            {item.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
}
