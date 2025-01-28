import styles from "@/app/product/page.module.css"

import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";
import Featured from "@/app/ui/featured";
import OrderForm from "@/app/product/ui/order_form";
import Tabs, {Tab} from "@/app/product/ui/tabs";

import Filters from "@/app/ui/vector/filters.svg";
import Review from "@/app/ui/review";

const sitePath = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'Shop',
        url: '#',
    },
    {
        name: 'Men',
        url: '#',
    },
    {
        name: 'T-Shirts',
        url: '#',
    },
]

export default function ProductPage () {
    return (
        <>
            <Header />
            <div className="max-w-96 md:max-w-[78rem] my-0 mx-auto">
                <div className="py-6">
                    <Breadcrumbs sitePath={sitePath}/>
                </div>
                <main className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
                    <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-3.5">
                        <div
                            className="relative w-full md:w-[530px] h-[290px] md:h-full bg-gray-300 rounded-xl overflow-hidden">
                            <Image
                                className="object-cover"
                                src="/items/napa-anor.webp"
                                alt="Napapijri Anorak"
                                fill
                            />
                        </div>
                        <div className="flex flex-row md:flex-col gap-3.5 items-stretch">
                            <div
                                className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    className="object-cover"
                                    src="/items/NA4I5F176-ALT1.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                            <div
                                className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    className="object-cover"
                                    src="/items/NA4I5F176-ALT2.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                            <div
                                className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    className="object-cover"
                                    src="/items/NA4I5F176-ALT3.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl">Skidoo 2.0 Anorak Jacket</h1>
                        <div>
                            <Stars rating={4.5}/>
                        </div>
                        <div>
                            <Price price="$1000" discount={{newPrice: "$600", percent: "-40%"}}/>
                        </div>
                        <p>
                            A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made
                            in
                            stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian
                            flag patch, and the iconic front flap pocket complete with our signature Napapijri
                            Geographic graphic.
                        </p>
                        <hr className="my-6"/>
                        <OrderForm/>
                    </div>
                </main>
                <div className="mt-20 mb-6">
                    <Tabs activeTab={Tab.REVIEWS}/>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <span className="font-bold mr-2">All reviews</span><span className="opacity-60">(451)</span>
                    </div>
                    <div className="flex flex-row items-center gap-2.5">
                        <button className="bg-[rgba(240,240,240,1)] rounded-full md:p-3 p-2">
                            <Filters className="fill-black" width={24} height={24}/>
                        </button>
                        <form className="hidden md:block">
                            <select className={`${styles.order_select} rounded-full appearance-none md:p-3 md:px-5 p-2`} name="order" id="order">
                                <option value="1">Latest</option>
                                <option value="2">Oldest</option>
                                <option value="3">Worst to best</option>
                                <option value="4">Best to worst</option>
                            </select>
                        </form>
                        <button className="bg-black text-white text-sm md:text-base rounded-full py-3 md:py-3.5 px-3 md:px-5" type="button">Write a review</button>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-10">
                    <Review id={1} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={2} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={3} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={4} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={5} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={6} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={7} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                    <Review id={8} title="Great product" rating={4.5} comment="I love this product. It is very comfortable and durable."/>
                </div>
                <div className="text-center mt-5 md:mt-9">
                    <button className="border border-gray-500 rounded-full px-16 py-4">Load More Reviews</button>
                </div>
                <Featured title="You might also like"/>
            </div>
            <Footer/>
        </>
    )
}
