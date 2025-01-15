'use client';

import layout from "@/app/ui/layout.module.css";
import Cross from "@/app/ui/vector/cross.svg";
import Dropdown from "@/app/ui/vector/dropdown.svg";
import Cart from "@/app/ui/vector/cart.svg";
import Userpic from "@/app/ui/vector/userpic.svg";
import Burger from "@/app/ui/vector/burger.svg";
import Search from "@/app/ui/vector/search.svg";
import { useState } from "react";

export default function Header() {
    const [isDiscountVisible, setIsDiscountVisible] = useState(true);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);
    const [isLinkGroupVisible, setIsLinkGroupVisible] = useState(false);

    function closeDiscount() {
        setIsDiscountVisible(false);
    }

    function toggleSearch() {
        setIsSearchExpanded(!isSearchExpanded);
    }

    function toggleLinkGroup() {
        setIsLinkGroupVisible(!isLinkGroupVisible);
    }

    return (
        <header className="fixed w-full top-0 left-0 right-0 z-50">
            {isDiscountVisible &&
                <div
                    className="bg-black text-white text-xs md:text-base text-center py-2.5 z-50">
                    <div className={`${layout.container} relative`}>
                        Sign up and get 20% off to your first order. <a className="underline" href="#">Sign Up Now</a>
                        <button onClick={closeDiscount} className="hidden md:block absolute top-0.5 right-0">
                            <Cross height={20} width={20} fill="#fff"/>
                        </button>
                    </div>
                </div>
            }
            <nav className="bg-white py-6 md:py-9 z-40">
                <div className={`${layout.container} flex flex-row justify-between items-center md:gap-10`}>
                    <button onClick={toggleLinkGroup} className="md:hidden">
                        <Burger height={24} width={24}/>
                    </button>
                    <h1 className={`${isSearchExpanded ? 'hidden' : 'block'} text-nowrap md:block text-xl md:text-3xl`}>Tech Shop</h1>
                    <ul className={`${isLinkGroupVisible ? 'block' : 'hidden' } bg-white fixed bottom-0 left-0 w-full md:w-auto rounded-t-3xl md:static md:flex md:flex-row md:justify-start md:items-center md:gap-6`}>
                        <li className="group relative">
                            <a href="#">Shop <Dropdown className="inline"/></a>
                            <ul className="hidden group-hover:block absolute top-10 left-0 bg-white w-48">
                                <li><a href="#">SS2025</a></li>
                                <li><a href="#">FW2024</a></li>
                                <li><a href="#">Men</a></li>
                                <li><a href="#">Women</a></li>
                                <li><a href="#">Kids</a></li>
                            </ul>
                        </li>
                        <li><a href="#">On Sale</a></li>
                        <li><a href="#">New Arrivals</a></li>
                        <li><a href="#">Brands</a></li>
                    </ul>
                    <div className="flex flex-row flex-nowrap justify-between items-center md:flex-grow gap-3">
                        <form className="md:flex-grow">
                            <label onClick={toggleSearch} className="relative" htmlFor="nav-search">
                                <Search
                                    className={`${isSearchExpanded ? 'opacity-40 top-1.5 left-4' : 'opacity-100 top-0 right-0'} absolute transition-opacity duration-500 ease-in-out fill-black md:absolute md:opacity-40 md:top-3.5 md:left-4`}
                                    height={24} width={24}/>
                            </label>
                            <input id="nav-search" type="text"
                                   className={`bg-[rgba(240,240,240,1)] md:block ${isSearchExpanded ? 'block max-w-xl pl-11 py-1.5' : 'max-w-0'} transition-all duration-500 ease-in-out md:w-full rounded-full md:max-w-xl md:pl-14 md:py-3.5`}
                                   placeholder="Search for products..."
                            />
                        </form>
                        <a href="#">
                            <Cart />
                        </a>
                        <a href="#">
                            <Userpic />
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}
