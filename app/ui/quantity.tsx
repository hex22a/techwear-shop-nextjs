'use client';

import {useState} from "react";

export type QuantityProps = {
  name: string,
  initialQuantity: number,
}

export default function Quantity({ initialQuantity, name }: QuantityProps) {
    const min = 1;
    const max = 100;

    const [quantity, setQuantity] = useState(initialQuantity);

    function addQuantity() {
        setQuantity(quantity + 1);
    }

    function subtractQuantity() {
        setQuantity(quantity - 1);
    }

    return (
        <div className="flex items-center justify-around">
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
                   name={name}
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
        </div>
    );
}
