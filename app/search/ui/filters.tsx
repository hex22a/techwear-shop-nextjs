'use client';

import FiltersIcon from "@/app/ui/vector/filters.svg";
import CrossIcon from "@/app/ui/vector/cross.svg";
import SlimArrow from "@/app/ui/vector/slim-arrow.svg";
import { useState } from "react";

import styles from "./filters.module.css";
import colors from "@/app/ui/colors.module.css";
import SearchResultsHeader, {SearchResultsHeaderProps} from "@/app/search/ui/search_results_header";

const PRICE_RANGE_MIN = 1000;
const PRICE_RANGE_MAX = 100000;
const PRICE_RANGE_OFFSET = 2000;
const PRICE_RANGE_STEP = 100;


const searchResultsHeaderProps: SearchResultsHeaderProps = {
    indexFirst: 1,
    indexLast: 10,
    totalCount: 100
}

export default function Filters() {
    const [isFiltersVisible, setIsFiltersVisible] = useState(false);
    const [isPriceVisible, setIsPriceVisible] = useState(true);
    const [isColorVisible, setIsColorVisible] = useState(true);
    const [isSizeVisible, setIsSizeVisible] = useState(true);
    const [isDressStyleVisible, setIsDressStyleVisible] = useState(true);
    const [minValue, setMinValue] = useState(PRICE_RANGE_MIN + PRICE_RANGE_OFFSET);
    const [maxValue, setMaxValue] = useState(PRICE_RANGE_MAX - PRICE_RANGE_OFFSET);

    const togglePrice = () => {
        setIsPriceVisible(!isPriceVisible);
    };

    const toggleColor = () => {
        setIsColorVisible(!isColorVisible);
    };

    const toggleSize = () => {
        setIsSizeVisible(!isSizeVisible);
    };

    const toggleDressStyle = () => {
        setIsDressStyleVisible(!isDressStyleVisible);
    };

    const openFilters = () => {
        setIsFiltersVisible(true);
    }

    const closeFilters = () => {
        setIsFiltersVisible(false);
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
            <aside className={`${isFiltersVisible ? 'bottom-0' : '-bottom-full' } fixed left-0 md:static border border-gray-300 bg-white rounded-2xl py-5 px-6 w-full md:w-1/4 z-10`}>
                <form>
                    <div className="flex flex-row justify-between items-center">
                        <span className="font-bold">Filters</span>
                        <FiltersIcon className="hidden md:block fill-black opacity-60" width={24} height={24} />
                        <button type="button" className="block md:hidden" onClick={closeFilters}>
                            <CrossIcon className="fill-black opacity-60" width={24} height={24} />
                        </button>
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
                    <hr className="my-6" />
                    <fieldset>
                        <button type="button" className="w-full" onClick={toggleColor}>
                            <div className="flex flex-row justify-between items-center">
                                <legend className="font-bold">Color</legend>
                                <SlimArrow
                                    className={`fill-black opacity-60 ${
                                        !isColorVisible ? "-rotate-90" : ""
                                    } transition-all duration-500`}
                                    width={16} height={16}
                                />
                            </div>
                        </button>
                        {isColorVisible && (
                            <div className="mt-4 grid grid-cols-5 gap-2">
                                <label htmlFor="color-green">
                                    <input className="hidden peer" type="radio" name="color" id="color-green"
                                           value="green" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-green-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-red">
                                    <input className="hidden peer" type="radio" name="color" id="color-red"
                                           value="red" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-red-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-yellow">
                                    <input className="hidden peer" type="radio" name="color" id="color-yellow"
                                           value="yellow" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-yellow-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-orange">
                                    <input className="hidden peer" type="radio" name="color" id="color-orange"
                                           value="orange" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-orange-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-cyan">
                                    <input className="hidden peer" type="radio" name="color" id="color-cyan"
                                           value="cyan" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-cyan-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-blue">
                                    <input className="hidden peer" type="radio" name="color" id="color-blue"
                                           value="blue" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-blue-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-purple">
                                    <input className="hidden peer" type="radio" name="color" id="color-purple"
                                           value="purple" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-purple-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-pink">
                                    <input className="hidden peer" type="radio" name="color" id="color-pink"
                                           value="pink" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-pink-500 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-white">
                                    <input className="hidden peer" type="radio" name="color" id="color-white"
                                           value="white" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-gray-200 rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                                <label htmlFor="color-black">
                                    <input className="hidden peer" type="radio" name="color" id="color-black"
                                           value="black" aria-checked={true}/>
                                    <div
                                        className={`${colors.radio_mark_check} relative inline-block w-9 h-9 bg-black rounded-full`}
                                        tabIndex={0}></div>
                                </label>
                            </div>
                        )}
                    </fieldset>
                    <hr className="my-6" />
                    <fieldset>
                        <button type="button" className="w-full" onClick={toggleSize}>
                            <div className="flex flex-row justify-between items-center">
                                <legend className="font-bold">Size</legend>
                                <SlimArrow
                                    className={`fill-black opacity-60 ${
                                        !isSizeVisible ? "-rotate-90" : ""
                                    } transition-all duration-500`}
                                    width={16} height={16}
                                />
                            </div>
                        </button>
                        {isSizeVisible && (
                            <div className="mt-4">
                                <label htmlFor="size-xxs">
                                    <input className="hidden peer" type="radio" name="size" id="size-xxs"
                                           value="xxs" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        XX-Small
                                    </div>
                                </label>
                                <label htmlFor="size-xs">
                                    <input className="hidden peer" type="radio" name="size" id="size-xs"
                                           value="xs" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        X-Small
                                    </div>
                                </label>
                                <label htmlFor="size-s">
                                    <input className="hidden peer" type="radio" name="size" id="size-s"
                                           value="s" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        Small
                                    </div>
                                </label>
                                <label htmlFor="size-m">
                                    <input className="hidden peer" type="radio" name="size" id="size-m"
                                           value="m" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        Medium
                                    </div>
                                </label>
                                <label htmlFor="size-l">
                                    <input className="hidden peer" type="radio" name="size" id="size-l"
                                           value="l" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        Large
                                    </div>
                                </label>
                                <label htmlFor="size-xl">
                                    <input className="hidden peer" type="radio" name="size" id="size-xl"
                                           value="xl" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        X-Large
                                    </div>
                                </label>
                                <label htmlFor="size-xxl">
                                    <input className="hidden peer" type="radio" name="size" id="size-xxl"
                                           value="xxl" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        XX-Large
                                    </div>
                                </label>
                                <label htmlFor="size-3xl">
                                    <input className="hidden peer" type="radio" name="size" id="size-3xl"
                                           value="3xl" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        3X-Large
                                    </div>
                                </label>
                                <label htmlFor="size-4xl">
                                    <input className="hidden peer" type="radio" name="size" id="size-4xl"
                                           value="4xl" aria-checked={true}/>
                                    <div
                                        className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                        tabIndex={0}>
                                        4X-Large
                                    </div>
                                </label>
                            </div>
                        )}
                    </fieldset>
                    <hr className="my-6" />
                    <fieldset>
                        <button type="button" className="w-full" onClick={toggleDressStyle}>
                            <div className="flex flex-row justify-between items-center">
                                <legend className="font-bold">Dress Style</legend>
                                <SlimArrow
                                    className={`fill-black opacity-60 ${
                                        !isDressStyleVisible ? "-rotate-90" : ""
                                    } transition-all duration-500`}
                                    width={16} height={16}
                                />
                            </div>
                        </button>
                        {isDressStyleVisible && (
                            <ul>
                                <li className="flex flex-row justify-between items-center">
                                    <span>Casual</span>
                                    <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                                </li>
                                <li className="flex flex-row justify-between items-center">
                                    <span>Formal</span>
                                    <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                                </li>
                                <li className="flex flex-row justify-between items-center">
                                    <span>Outdoor</span>
                                    <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                                </li>
                                <li className="flex flex-row justify-between items-center">
                                    <span>Party</span>
                                    <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                                </li>
                            </ul>
                        )}
                    </fieldset>
                    <button type="submit" className="bg-black text-white rounded-full w-full mt-6 py-3.5">Apply Filters</button>
                </form>
            </aside>
            <div className="block md:hidden w-full">
                <SearchResultsHeader onFiltersClick={openFilters} {...searchResultsHeaderProps}/>
            </div>
        </>
    );
}
