'use client';

import styles from "@/app/product/page.module.css";
import { useState } from "react";

export default function OrderForm() {
    const min = 1;
    const max = 100;

    const [quantity, setQuantity] = useState(1);

    function addQuantity() {
        setQuantity(quantity + 1);
    }

    function subtractQuantity() {
        setQuantity(quantity - 1);
    }

    return (
        <form>
            <fieldset>
                <legend className="mb-4">Select Colors</legend>
                <div className="flex flex-row justify-start items-center gap-3 md:gap-4">
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
                </div>
            </fieldset>
            <hr className="my-6"/>
            <fieldset>
                <legend className="mb-4">Choose size</legend>
                <div
                    className="flex flex-row justify-between text-sm md:text-base md:justify-start gap-2 md:gap-3">
                    <label htmlFor="size-s">
                        <input className="hidden peer" type="radio" name="size" id="size-s"
                               value="s" aria-checked={true}/>
                        <div
                            className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6"
                            tabIndex={0}>
                            Small
                        </div>
                    </label>
                    <label htmlFor="size-m">
                        <input className="hidden peer" type="radio" name="size" id="size-m"
                               value="m" aria-checked={false}/>
                        <div
                            className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6"
                            tabIndex={0}>
                            Medium
                        </div>
                    </label>
                    <label htmlFor="size-l">
                        <input className="hidden peer" type="radio" name="size" id="size-l"
                               value="l" aria-checked={false}/>
                        <div
                            className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6"
                            tabIndex={0}>
                            Large
                        </div>
                    </label>
                    <label htmlFor="size-xl">
                        <input className="hidden peer" type="radio" name="size" id="size-xl"
                               value="xl" aria-checked={false}/>
                        <div
                            className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6"
                            tabIndex={0}>
                            X-Large
                        </div>
                    </label>
                </div>
            </fieldset>
            <hr className="my-6"/>
            <div className="flex flex-row justify-between items-stretch text-sm md:text-base w-full gap-3 md:gap-5">
                <span className="bg-gray-200 rounded-full flex items-center justify-around py-3 md:py-3.5 px-3 w-44">
                    <button
                        type="button"
                        className="text-2xl"
                        onClick={subtractQuantity}
                        disabled={quantity === min}
                    >
                        -
                    </button>
                    <input className="bg-gray-200 text-center"
                           type="number"
                           readOnly={true}
                           value={quantity}
                           min={min}
                           max={max}
                    />
                    <button
                        className="text-2xl"
                        type="button"
                        onClick={addQuantity}
                        disabled={quantity === max}>
                        +
                    </button>
                </span>
                <button className="bg-black text-white rounded-full py-3 md:py-3.5 w-full" type="submit">Add to Cart</button>
            </div>
        </form>
    )
}
