'use client';

import FiltersIcon from "@/app/ui/vector/filters.svg";
import SlimArrow from "@/app/ui/vector/slim-arrow.svg";
import { useState } from "react";

import styles from "./filters.module.css";

const PRICE_RANGE_MIN = 1000;
const PRICE_RANGE_MAX = 100000;
const PRICE_RANGE_OFFSET = 2000;
const PRICE_RANGE_STEP = 100;


export default function Filters() {
    const [isPriceVisible, setIsPriceVisible] = useState(true);
    const [minValue, setMinValue] = useState(PRICE_RANGE_MIN + PRICE_RANGE_OFFSET); // Initial value for min slider
    const [maxValue, setMaxValue] = useState(PRICE_RANGE_MAX - PRICE_RANGE_OFFSET); // Initial value for max slider

    const togglePrice = () => {
        setIsPriceVisible(!isPriceVisible);
    };

    const handleMinValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), maxValue - 1); // Ensure minValue stays below maxValue
        setMinValue(value);
    };

    const handleMaxValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(event.target.value), minValue + 1); // Ensure maxValue stays above minValue
        setMaxValue(value);
    };

    return (
        <>
            <div className="flex flex-row justify-between items-center">
                <span className="font-bold">Filters</span>
                <FiltersIcon className="fill-black opacity-60" width={24} height={24} />
            </div>
            <hr className="my-6" />
            <ul>
                <li className="flex flex-row justify-between items-center">
                    <span>Jackets</span>
                    <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                </li>
                <li className="flex flex-row justify-between items-center">
                    <span>Pants</span>
                    <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                </li>
            </ul>
            <hr className="my-6" />
            <button type="button" className="w-full" onClick={togglePrice}>
                <div className="flex flex-row justify-between items-center">
                    <span className="font-bold">Price</span>
                    <SlimArrow
                        className={`fill-black opacity-60 ${
                            !isPriceVisible ? "-rotate-90" : ""
                        } transition-all duration-500`}
                        width={16} height={16}
                    />
                </div>
            </button>
            {isPriceVisible && (
                <div className="mt-4">
                    <div className="relative h-8 flex items-center">
                        {/* The Track */}
                        <div className="absolute left-0 right-0 h-1 bg-gray-300 rounded-full"></div>

                        {/* Highlighted active range */}
                        <div
                            className="absolute h-1 bg-black rounded-full pointer-events-none"
                            style={{
                                left: `${(minValue - PRICE_RANGE_MIN)/(PRICE_RANGE_MAX - PRICE_RANGE_MIN) * 100}%`,
                                width: `${(maxValue - minValue)/(PRICE_RANGE_MAX - PRICE_RANGE_MIN) * 100}%`,
                            }}
                        ></div>

                        {/* Min Slider */}
                        <input
                            type="range"
                            min={PRICE_RANGE_MIN}
                            max={PRICE_RANGE_MAX}
                            step={PRICE_RANGE_STEP}
                            value={minValue}
                            onChange={handleMinValueChange}
                            className={`${styles.min_input} absolute w-full h-0.5 appearance-none bg-transparent pointer-events-none z-10`}
                        />

                        {/* Max Slider */}
                        <input
                            type="range"
                            min={PRICE_RANGE_MIN}
                            max={PRICE_RANGE_MAX}
                            step={PRICE_RANGE_STEP}
                            value={maxValue}
                            onChange={handleMaxValueChange}
                            className="absolute w-full h-0 appearance-none bg-transparent pointer-events-auto"
                        />
                    </div>
                    <div className="relative h-4">
                        <span
                            className="absolute -translate-x-1/2"
                            style={{
                                left: `${(minValue - PRICE_RANGE_MIN)/(PRICE_RANGE_MAX - PRICE_RANGE_MIN) * 100}%`,
                            }}
                        >
                            ${minValue}
                        </span>
                        <span
                            className="absolute -translate-x-1/2"
                            style={{
                                left: `${(maxValue - PRICE_RANGE_MIN)/(PRICE_RANGE_MAX-PRICE_RANGE_MIN) * 100}%`,
                            }}
                        >
                            ${maxValue}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
