import Header from "@/app/ui/header/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";
import Featured from "@/app/ui/featured";

import AddToCartForm from "./ui/add_to_cart_form";
import {Color, ProductFull, Size} from "@/app/lib/definitions";
import {fetchProduct} from "@/app/lib/data";
import Tabs from "./ui/tabs";
import {Tab} from "@/app/product/[id]/ui/tabs_header";

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
];

export default async function ProductPage(props: {params: Promise<{id: string}>}) {
    const params = await props.params;
    const product_id = parseInt(params.id, 10);
    const { name, price, description, photo_url, photos, sizes, colors, discount, reviews, details, average_rating }: ProductFull = await fetchProduct(product_id);
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
                            <Stars rating={average_rating}/>
                        </div>
                        <div>
                            <Price price={price} discount={discount}/>
                        </div>
                        <p>{description}</p>
                        <hr className="my-6"/>
                        <AddToCartForm product_id={product_id} sizes={sizesArray} colors={colorsArray}/>
                    </div>
                </main>
                <Tabs defaultTab={Tab.REVIEWS} product_id={product_id} reviews={reviews} details={details}/>
                <Featured title="You might also like" items={[]}/>
            </div>
            <Footer/>
        </>
    );
}
