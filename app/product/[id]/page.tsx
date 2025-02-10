import styles from "@/app/product/[id]/page.module.css"

import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";
import Featured from "@/app/ui/featured";
import Filters from "@/app/ui/vector/filters.svg";
import Review from "@/app/ui/review";

import Tabs, {Tab} from "./ui/tabs";
import AddToCartForm from "./ui/add_to_cart_form";
import {Color, Product, Size} from "@/app/lib/definitions";
import {fetchProduct} from "@/app/lib/data";

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
        name: 'Wemen',
        url: '#',
    },
    {
        name: 'Jackets',
        url: '#',
    },
]

export default async function ProductPage (props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const id = params.id;
    const { name, price, description, photo_url, photos, sizes, colors, discount }: Product = await fetchProduct(id);
    const sizesArray: Size[] = Array.from(sizes.entries()).map(([, value]) => ({...value}));
    const colorsArray: Color[] = Array.from(colors.entries()).map(([, value]) => ({...value}));

    return (
        <>
            <Header />
            <div className="w-96 md:w-[78rem] mt-0 mb-20 mx-auto">
                <div className="py-6">
                    <Breadcrumbs sitePath={sitePath}/>
                </div>
                <main className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
                    <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-3.5">
                        <div
                            className="relative w-full md:w-[530px] h-[290px] md:h-full bg-gray-300 rounded-xl overflow-hidden">
                            {photo_url &&
                                <Image
                                    className="object-cover"
                                    src={photo_url}
                                    alt={`${name} photo`}
                                    fill
                                />
                            }
                        </div>
                        <div className="flex flex-row justify-between md:flex-col gap-3.5 items-stretch">
                            {Array.from(photos.entries()).map(([key, value]) => (
                                <div key={key}
                                    className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                    <Image
                                        className="object-cover"
                                        src={value.url}
                                        alt={`${name} alt photo ${key}`}
                                        fill
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h1 className="text-4xl">{name}</h1>
                        <div>
                            <Stars rating={4.5}/>
                        </div>
                        <div>
                            <Price price={price} discount={discount}/>
                        </div>
                        <p>{description}</p>
                        <hr className="my-6"/>
                        <AddToCartForm sizes={sizesArray} colors={colorsArray}/>
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
