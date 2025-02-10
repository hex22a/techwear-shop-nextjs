'use client';

import {useState} from "react";

const ACTIVE_COLOR = "#ff8c00";
const DEFAULT_COLOR = "#eee";

export type InteractiveStarsProps = {
    rating: number,
    onChange: (rating: number) => void,
}

export default function InteractiveStars(props: InteractiveStarsProps) {
    const { rating, onChange } = props;
    const [hoverRating, setHoverRating] = useState<number>(1);

    const getColor = (value: number) => {
        if (hoverRating !== -1) {
            return value <= hoverRating ? ACTIVE_COLOR : DEFAULT_COLOR;
        }
        return value <= rating ? ACTIVE_COLOR : DEFAULT_COLOR;
    };


    return (
        <>
            {[1, 2, 3, 4, 5].map((value) => (
                <span
                    key={value}
                    onClick={() => onChange(value)}
                    onMouseEnter={() => setHoverRating(value)}
                    onMouseLeave={() => setHoverRating(-1)}
                    style={{ cursor: "pointer", color: getColor(value) }}
                    aria-label={`${value} Star${value > 1 ? "s" : ""}`}
                >
                  ★
                </span>
            ))}
            <span>{rating}/5</span>
        </>
    )
}
