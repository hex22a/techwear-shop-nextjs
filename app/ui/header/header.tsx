'use client';

import Cross from "@/app/ui/vector/cross.svg";
import SlimArrow from "@/app/ui/vector/slim-arrow.svg";
import Cart from "@/app/ui/vector/cart.svg";
import Burger from "@/app/ui/vector/burger.svg";
import Search from "@/app/ui/vector/search.svg";
import { useState } from "react";
import Link from "next/link";
import UserButton from '@/app/ui/header/user_button';
import { SessionProvider } from 'next-auth/react';

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
                    <div className="relative max-w-96 md:max-w-[78rem] my-0 mx-auto">
                        Sign up and get 20% off to your first order. <Link className="underline" href="/signup">Sign Up Now</Link>
                        <button onClick={closeDiscount} className="hidden md:block absolute top-0.5 right-0">
                            <Cross height={20} width={20} fill="#fff"/>
                        </button>
                    </div>
                </div>
            }
            <nav className="bg-white py-6 md:py-9 z-40">
                <div className="flex flex-row justify-between items-center md:gap-10 max-w-96 md:max-w-[78rem] my-0 mx-auto">
                    <button onClick={toggleLinkGroup} className="md:hidden">
                        <Burger height={24} width={24}/>
                    </button>
                    <Link href="/">
                        <h1 className={`${isSearchExpanded ? 'hidden' : 'block'} text-nowrap md:block text-xl md:text-3xl`}>Tech Shop</h1>
                    </Link>
                    <ul className={`${isLinkGroupVisible ? 'bottom-0' : '-bottom-full' } bg-white fixed  left-0 w-full md:w-auto rounded-t-3xl md:static flex flex-col md:flex-row md:justify-start items-center gap-6 py-6 md:py-0 transition-all ease-in-out duration-200`}
                        role="menu">
                        <li className="group relative" role="menuitem">
                            <input type="checkbox" id="submenu-toggle" className="hidden peer"/>
                            <label
                                className="cursor-pointer"
                                htmlFor="submenu-toggle"
                                aria-controls="submenu"
                                tabIndex={0}
                                role="button"
                            >
                                Shop <SlimArrow className="inline fill-black" width={16} height={16}/>
                            </label>
                            <ul className="hidden group-hover:block peer-checked:block peer-focus-within:block group-focus-within:block focus-within:block absolute top-6 left-0 bg-white w-28 p-1.5 rounded-xl shadow-lg">
                                <li role="menuitem"><a href="#">SS2025</a></li>
                                <li role="menuitem"><a href="#">FW2024</a></li>
                                <li role="menuitem"><a href="#">Men</a></li>
                                <li role="menuitem"><a href="#">Women</a></li>
                                <li role="menuitem"><a href="#">Kids</a></li>
                            </ul>
                        </li>
                        <li><a role="menuitem" href="#">On Sale</a></li>
                        <li><a role="menuitem" href="#">New Arrivals</a></li>
                        <li><a role="menuitem" href="#">Brands</a></li>
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
                        <Link href="/cart">
                            <Cart />
                        </Link>
                        <SessionProvider>
                            <UserButton />
                        </SessionProvider>
                    </div>
                </div>
            </nav>
        </header>
    )
}
