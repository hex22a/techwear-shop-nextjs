'use client';

import FiltersIcon from "@/app/ui/vector/filters.svg";
import styles from "./search_result_header.module.css";

export type SearchResultsHeaderProps = {
    totalCount: number,
    indexFirst: number,
    indexLast: number,
    onFiltersClick?: () => void,
}

export default function SearchResultsHeader(props: SearchResultsHeaderProps) {
    const { totalCount, indexFirst, indexLast, onFiltersClick } = props;
    const handleFiltersClick = onFiltersClick ?? (() => {});

    return (
        <div className="flex flex-row justify-between items-center">
            <h1 className="text-xl md:text-4xl">Casual</h1>
            <span className="text-[rgba(0,0,0,.6)] text-sm">
                <span className="mr-3">Showing {indexFirst}-{indexLast} of {totalCount} Products</span>
                <form className="hidden md:inline-block">
                    <span>Sort by: </span>
                    <select className={`${styles.sort_by} text-black appearance-none pr-5`} name="sort_by" id="sort_by">
                        <option value="1">Most Popular</option>
                        <option value="2">Latest</option>
                        <option value="3">Oldest</option>
                        <option value="4">Cheapest</option>
                    </select>
                </form>
                <button className="inline-block md:hidden" onClick={handleFiltersClick}>
                    <FiltersIcon className="fill-black opacity-60" width={24} height={24}/>
                </button>
            </span>
        </div>
    );
}
