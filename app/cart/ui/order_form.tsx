'use client';

import Image from "next/image";

import TrashBinIcon from "@/app/ui/vector/trash-bin.svg";
import ArrowIcon from "@/app/ui/vector/arrow.svg";
import styles from "./order_form.module.css";
import Quantity from "@/app/ui/quantity";
import { Cart } from '@/app/lib/definitions';
import { useActionState } from 'react';
import { orderProducts, OrderProductsFormState } from '@/app/lib/actions';

export default function OrderForm(props: Cart) {
    const { products, summary: { deliveryFee, total, subtotal, discount } } = props;

    const initialState: OrderProductsFormState = {
        message: null,
        url: null,
    };

    const [state, formAction] = useActionState(orderProducts, initialState);

    if (state && state.url) {
        window.location.assign(state.url as string);
    }

    return (
        <form action={formAction} className="grid grid-rows-[auto_auto] md:grid-cols-12 gap-5">
            <div className="md:col-start-1 md:col-end-8 p-3.5 md:py-5 md:px-6 border rounded-xl">
                {products.map((product, index) => (
                    <div key={product.id+product.size+product.color_hex_value+product.quantity}>
                        {index !==0 && <hr className="my-6"/>}
                        <input type="hidden" name={`products[${index}][product_id]`} value={product.id}/>
                        <div className="flex flex-row justify-between items-stretch">
                            <div className="flex flex-row justify-start items-stretch gap-3.5">
                                <div className="relative w-full md:w-[124px] md:h-[124px] bg-gray-300 rounded-xl overflow-hidden">
                                    <Image
                                        className="object-cover"
                                        src={product.photo_url}
                                        alt={`${product.name} cart photo`}
                                        fill
                                    />
                                </div>
                                <div className="flex flex-col justify-between">
                                    <div>
                                        <h2>{product.name}</h2>
                                        <div>
                                            <span>Size: </span>
                                            <span className="text-[rgba(0,0,0,.6)]">{product.size}</span>
                                        </div>
                                        <div>
                                            <span>Color: </span>
                                            <span className="text-[rgba(0,0,0,.6)]">{product.color_human_readable_value}</span>
                                        </div>
                                    </div>
                                    <div className="text-lg font-bold">
                                        ${product.price}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between items-end">
                                <button>
                                    <TrashBinIcon />
                                </button>
                                <div className="bg-gray-200 rounded-full py-2 md:py-2.5 px-3 w-32">
                                    <Quantity name={`products[${index}][quantity]`} initialQuantity={product.quantity} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="md:col-start-8 md:col-end-13 self-start p-3.5 md:py-5 md:px-6 border rounded-xl">
                <h2 className="mb-6">Order Summary</h2>
                <div className="flex flex-row justify-between items-center text-xl mb-5">
                    <div className="text-[rgba(0,0,0,.6)]">Subtotal:</div>
                    <div>${subtotal}</div>
                </div>
                <div className="flex flex-row justify-between items-center text-xl mb-5">
                    <div className="text-[rgba(1,0,0,.6)]">Discount: (-20%)</div>
                    <div>-${discount}</div>
                </div>
                <div className="flex flex-row justify-between items-center text-xl">
                    <div className="text-[rgba(0,0,0,.6)]">Delivery Fee</div>
                    <div>${deliveryFee}</div>
                </div>
                <hr className="my-6"/>
                <div className="flex flex-row justify-between items-center text-xl">
                    <div>Total:</div>
                    <div className="font-bold text-2xl">${total}</div>
                </div>
                <div className="relative w-full my-6">
                    <label className={styles.discount} htmlFor="discount"></label>
                    <div className="flex flex-row justify-between items-center gap-3">
                        <input id="discount" type="text" className="bg-[rgba(240,240,240,1)] text-black rounded-full py-3 pl-14 w-full" placeholder="Add promo code"/>
                        <button type="button" className="bg-black text-white rounded-full py-3 px-9">Apply</button>
                    </div>
                </div>
                <input type="hidden" name="total" value={total}/>
                <button className="bg-black text-white rounded-full py-4 w-full">Go to Checkout <ArrowIcon className="fill-white inline-block ml-1" width={24} height={24}/></button>
            </div>
            {state && <div className="text-red-500">{state.message}</div>}
        </form>
    );
}
