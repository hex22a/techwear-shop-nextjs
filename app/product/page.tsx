import layout from "@/app/ui/layout.module.css"
import styles from "./page.module.css"

import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";
import Featured from "@/app/ui/featured";

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
                                src="/items/napa-anor.webp"
                                alt="Napapijri Anorak"
                                fill
                            />
                        </div>
                        <div className="flex flex-row md:flex-col gap-3.5">
                            <div className="relative w-1/3 md:w-[152px] h-[106px] md:h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    src="/items/NA4I5F176-ALT1.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                            <div className="relative w-[152px] h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
                                    src="/items/NA4I5F176-ALT2.webp"
                                    alt="Napapijri Anorak"
                                    fill
                                />
                            </div>
                            <div className="relative w-[152px] h-[167px] bg-gray-300 rounded-xl overflow-hidden">
                                <Image
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
                        <hr/>
                        <form>
                            <fieldset>
                                <legend>Select Colors</legend>
                                <label htmlFor="color-red">
                                    <input className="hidden peer" type="radio" name="color" id="color-red"
                                           value="red" aria-checked={true}/>
                                    <div
                                        className={`${styles.radio_mark_check} relative inline-block w-9 h-9 bg-red-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-blue">
                                    <input className="hidden peer" type="radio" name="color" id="color-blue"
                                           value="blue" aria-checked={false}/>
                                    <div
                                        className={`${styles.radio_mark_check} relative inline-block w-9 h-9 bg-blue-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-black">
                                    <input className="hidden peer" type="radio" name="color" id="color-black"
                                           value="black" aria-checked={false}/>
                                    <div
                                        className={`${styles.radio_mark_check} relative inline-block w-9 h-9 bg-black rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                            </fieldset>
                            <hr/>
                            <fieldset>
                                <legend>Choose size</legend>
                                <label htmlFor="size-s">
                                    <input className="hidden peer" type="radio" name="size" id="size-s"
                                           value="s" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 md:py-3 md:px-6"
                                        tabIndex={0}>
                                        Small
                                    </div>
                                </label>
                                <label htmlFor="size-m">
                                    <input className="hidden peer" type="radio" name="size" id="size-m"
                                           value="m" aria-checked={false}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 md:py-3 md:px-6"
                                        tabIndex={0}>
                                        Medium
                                    </div>
                                </label>
                                <label htmlFor="size-l">
                                    <input className="hidden peer" type="radio" name="size" id="size-l"
                                           value="l" aria-checked={false}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 md:py-3 md:px-6"
                                        tabIndex={0}>
                                        Large
                                    </div>
                                </label>
                                <label htmlFor="size-xl">
                                    <input className="hidden peer" type="radio" name="size" id="size-xl"
                                           value="xl" aria-checked={false}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 md:py-3 md:px-6"
                                        tabIndex={0}>
                                        X-Large
                                    </div>
                                </label>
                            </fieldset>
                            <hr/>
                            <input type="number" defaultValue={1} min={1} max={100} />
                            <input type="submit"/>
                        </form>
                    </div>
                </div>
            </main>
            <Featured title="You might also like"/>
            <Footer/>
        </>
    )
}
