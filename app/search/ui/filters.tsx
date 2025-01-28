'use client';

import FiltersIcon from "@/app/ui/vector/filters.svg";
import CrossIcon from "@/app/ui/vector/cross.svg";
import SlimArrow from "@/app/ui/vector/slim-arrow.svg";
import { useState } from "react";

import styles from "./filters.module.css";
import colors_styles from "@/app/ui/colors.module.css";
import SearchResultsHeader, {SearchResultsHeaderProps} from "@/app/search/ui/search_results_header";
import {Category, Color, Size, Style} from "@/app/lib/definitions";

const PRICE_RANGE_MIN = 100;
const PRICE_RANGE_MAX = 10000;
const PRICE_RANGE_OFFSET = 2000;
const PRICE_RANGE_STEP = 10;


const searchResultsHeaderProps: SearchResultsHeaderProps = {
    indexFirst: 1,
    indexLast: 10,
    totalCount: 100
}

export type FilterProps = {
    categories: Category[],
    colors: Color[],
    sizes: Size[],
    dressStyles: Style[],
}

export default function Filters(props: FilterProps) {
    const { categories, colors, sizes, dressStyles } = props;
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
                        {categories.map(category => (
                            <li key={category.id} className="flex flex-row justify-between items-center">
                                <span>{category.name}</span>
                                <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                            </li>
                        ))}
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
                                {colors.map(color => (
                                    <label key={color.id} htmlFor={`color-${color.hex_value}`}>
                                        <input className="hidden peer" type="radio" name="color" id={`color-${color.hex_value}`}
                                               value="green" aria-checked={true}/>
                                        <div
                                            className={`${colors_styles.radio_mark_check} relative inline-block w-9 h-9 rounded-full`}
                                            style={{backgroundColor: `#${color.hex_value}`}}
                                            tabIndex={0}></div>
                                    </label>
                                ))}
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
                                {sizes.map(size => (
                                    <label key={size.id} htmlFor={`size-${size.value}`}>
                                        <input className="hidden peer" type="radio" name="size" id={`size-${size.value}`}
                                               value={size.value} aria-checked={true}/>
                                        <div
                                            className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6 m-2"
                                            tabIndex={0}>
                                            {size.size}
                                        </div>
                                    </label>
                                ))}
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
                                {dressStyles.map(dressStyle => (
                                    <li key={dressStyle.id} className="flex flex-row justify-between items-center">
                                        <span>{dressStyle.name}</span>
                                        <SlimArrow className="fill-black opacity-60 -rotate-90" width={16} height={16} />
                                    </li>
                                ))}
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
