import layout from "@/app/ui/layout.module.css"

import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";
import Featured from "@/app/ui/featured";
import OrderForm from "@/app/product/ui/order_form";

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
            <div className="mt-32 md:mt-40">
                <div className={`${layout.container} py-6`}>
                    <Breadcrumbs sitePath={sitePath}/>
                </div>
            </div>
            <main className={layout.container}>
                <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-5">
                    <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-3.5">
                        <div className="relative w-full md:w-[530px] h-[290px] md:h-full bg-gray-300 rounded-xl overflow-hidden">
                            <Image
                                className="object-cover"
                                src="/items/napa-anor.webp"
                                alt="Napapijri Anorak"
                                fill
                            />
                        </div>
                        <div className="flex flex-row md:flex-col gap-3.5 items-stretch">
                            <div className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    className="object-cover"
                                    src="/items/NA4I5F176-ALT1.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                            <div className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    className="object-cover"
                                    src="/items/NA4I5F176-ALT2.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                            <div className="relative min-w-28 min-h-36 md:w-[152px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
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
                            A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made in
                            stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian
                            flag patch, and the iconic front flap pocket complete with our signature Napapijri
                            Geographic graphic.
                        </p>
                        <hr className="my-6"/>
                        <OrderForm/>
                    </div>
                </div>
            </main>
            <Featured title="You might also like"/>
            <Footer/>
        </>
    )
}
