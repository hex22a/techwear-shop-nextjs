'use client';

import layout from "@/app/ui/layout.module.css";
import styles from "@/app/ui/reviews.module.css";
import Arrow from "@/app/ui/vector/arrow.svg";
import Stars from "@/app/ui/stars";
import { useState } from "react";
import Image from "next/image";

export type CarouselItem = {
    id: number;
    title: string;
    rating: number;
    comment: string;
}

const carouselItems: CarouselItem[] = [
    {
        id: 1,
        title: "Tim S.",
        rating: 1,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 2,
        title: "Vald T.",
        rating: 2,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 3,
        title: "Raush A.",
        rating: 3,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 4,
        title: "Pavel S.",
        rating: 4,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 5,
        title: "Alex K.",
        rating: 5,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 6,
        title: "Gosha A.",
        rating: 5,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
    {
        id: 7,
        title: "Daniel N.",
        rating: 5,
        comment: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations."
    },
];

export default function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items] = useState(carouselItems);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [direction, setDirection] = useState(-1);
    const [orderMap, setOrderMap] = useState(new Array(items.length).fill(0).map((_, i) => i + 1));

    function next() {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setDirection(1);

        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }

    function prev() {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setDirection(-1);

        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? items.length - 1 : prevIndex - 1
        );
    }

    const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
        setIsTransitioning(false);
        setOrderMap((prevOrderMap) => {
            console.log(prevOrderMap, currentIndex);
            const newOrder = [...prevOrderMap];
            if (direction === -1) {
                newOrder.unshift(newOrder.pop()!);
            } else if (direction === 1) {
                newOrder.push(newOrder.shift()!);
            }
            console.log(newOrder);
            return newOrder;
        });
        console.log(`Transition ended for: ${e.propertyName}`);
    };

    return (
        <div>
            <div className={`${layout.container} relative pt-16 pb-9`}>
                <h1 className="inline-block text-left text-5xl font-bold">Our happy customers</h1>
                <div className={`${styles.arrows} inline-block`}>
                    <button onClick={prev}>
                        <Arrow className="inline-block rotate-180"/>
                    </button>
                    <button onClick={next}>
                        <Arrow className="inline-block"/>
                    </button>
                </div>
            </div>
            <div
                className={`${layout.container} py-5 relative before:absolute before:top-0 before:-left-full before:w-full before:h-full before:z-10 before:backdrop-blur-sm after:absolute after:top-0 after:-right-full after:w-full after:h-full after:z-10 after:backdrop-blur-sm`}>
                <div className="w-[300%] -translate-x-[22.22%]">
                    <div
                        className="flex flex-row flex-nowrap justify-start gap-5 items-stretch transition-transform ease-in-out duration-500"
                        style={{
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                            transform: isTransitioning ? `translateX(${direction * 11.11}%)` : 'translateX(0)',
                        }}
                        onTransitionEnd={handleTransitionEnd}>
                        {items.map((item, i) =>
                            <div key={item.id}
                                 className={` border border-gray-500 rounded-xl px-8 py-7 w-[calc(11.11%-1rem)]`}
                                 style={{
                                     order: orderMap[i],
                                 }}
                            >
                                <div className="mb-5">
                                    <Stars rating={item.rating}/>
                                </div>
                                <div className="leading-6 mb-3">
                                    <h3 className="inline-block mr-1 align-middle">{item.title}</h3>
                                    <Image
                                        className="inline-block align-middle"
                                        src="/verified.svg"
                                        alt="verified checkmark"
                                        width={24}
                                        height={24}
                                    />
                                </div>
                                <p className="text-wrap">{item.comment}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
