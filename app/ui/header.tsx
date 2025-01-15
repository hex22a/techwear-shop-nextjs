import layout from "@/app/ui/layout.module.css";
import styles from "@/app/ui/header.module.css";
import Cross from "@/app/ui/vector/cross.svg";
import Dropdown from "@/app/ui/vector/dropdown.svg";
import Cart from "@/app/ui/vector/cart.svg";
import Userpic from "@/app/ui/vector/userpic.svg";
import Burger from "@/app/ui/vector/burger.svg";
import Search from "@/app/ui/vector/search.svg";

export default function Header() {
    return (
        <header>
            <div className="fixed top-0 left-0 right-0 bg-black text-white text-xs md:text-base text-center w-full py-2.5 z-50">
                <div className={`${layout.container} relative`}>
                    Sign up and get 20% off to your first order. <a className="underline" href="#">Sign Up Now</a>
                    <button className="hidden md:block absolute top-0.5 right-0">
                        <Cross height={20} width={20} fill="#fff"/>
                    </button>
                </div>
            </div>
            <nav className="fixed w-full top-9 bg-white py-6 md:py-9 z-40">
                <div className={`${layout.container} flex flex-row justify-between items-center gap-10`}>
                    <button className="md:hidden">
                        <Burger height={24} width={24}/>
                    </button>
                    <h1 className="text-xl md:text-3xl">Tech Shop</h1>
                    <ul className="bg-white fixed bottom-0 left-0 w-full md:w-auto rounded-t-3xl md:static md:flex md:flex-row md:justify-start md:items-center md:gap-6">
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
                    <form className="w-0 md:w-auto md:flex-grow">
                        <label className="relative" htmlFor="nav-search">
                            <Search className="md:absolute top-3.5 left-4 fill-black opacity-100 md:opacity-40" height={24} width={24}/>
                        </label>
                        <input id="nav-search" type="text" className="bg-[rgba(240,240,240,1)] hidden md:block w-full rounded-full pl-14 py-3.5" placeholder="Search for products..."/>
                    </form>
                    <div>
                        <a href="#">
                            <Cart className="inline-block mr-3"/>
                        </a>
                        <a href="#">
                            <Userpic className="inline-block mr-3"/>
                        </a>
                    </div>
                </div>
            </nav>
        </header>
    )
}
