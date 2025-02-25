'use client';

import {useState} from "react";
import z from 'zod';
import Filters from "@/app/ui/vector/filters.svg";
import styles from "@/app/product/[id]/page.module.css";
import ReviewComponent from "@/app/ui/review";
import InteractiveStars from "./interactive_stars";
import {addReview} from "@/app/lib/data";
import {Review} from "@/app/lib/definitions";

const ReviewFormSchema = z.object({
    review_title: z.string().nonempty(),
    review_text: z.string().nonempty(),
    rating: z.number(),
});

export type ReviewProps = {
    product_id: number,
    reviews: Map<number, Review>,
}

export default function Reviews(props: ReviewProps) {
    const { reviews } = props;
    const [isReviewFormVisible, setIsReviewFormVisible] = useState(false);
    const [rating, setRating] = useState(1);

    const openReviewForm = () => setIsReviewFormVisible(true);
    const closeReviewForm = () => setIsReviewFormVisible(false);

    const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const validationResult = ReviewFormSchema.safeParse({ rating, ...Object.fromEntries(formData.entries())});
        if (validationResult.success) {
            await addReview({ product_id: props.product_id, title: validationResult.data.review_title, review_text: validationResult.data.review_text, rating: validationResult.data.rating });
        }
    };

    return (
        <>
            <div className="flex justify-between items-center">
                <div>
                    <span className="font-bold mr-2">All reviews</span><span className="opacity-60">(451)</span>
                </div>
                <div className="flex flex-row items-center gap-2.5">
                    <button className="bg-[rgba(240,240,240,1)] rounded-full md:p-3 p-2">
                        <Filters className="fill-black" width={24} height={24}/>
                    </button>
                    <form className="hidden md:block">
                        <select className={`${styles.order_select} rounded-full appearance-none md:p-3 md:px-5 p-2`} name="order" id="order">
                            <option value="1">Latest</option>
                            <option value="2">Oldest</option>
                            <option value="3">Worst to best</option>
                            <option value="4">Best to worst</option>
                        </select>
                    </form>
                    <button onClick={openReviewForm} className="bg-black text-white text-sm md:text-base rounded-full py-3 md:py-3.5 px-3 md:px-5" type="button">Write a review</button>
                </div>
            </div>
            {isReviewFormVisible &&
                <form onSubmit={handleReviewSubmit} className="w-full">
                    <fieldset>
                        <legend className="sr-only">Review</legend>
                        <label htmlFor="review_title">Title:</label>
                        <input type="text" id="review_title" name="review_title" placeholder="Great product"
                               className="block w-full p-2 my-3 border rounded-xl"/>
                        <label className="block" htmlFor="review_text">White your review:</label>
                        <textarea className="block w-full p-2 my-3 border rounded-xl" name="review_text" id="review_text"
                                  rows={10}/>
                        <label className="block" htmlFor="rating">Rating:</label>
                        <InteractiveStars rating={rating} onChange={setRating} />
                    </fieldset>
                    <button onClick={closeReviewForm}
                            className="inline-block bg-gray-300 text-black text-sm md:text-base rounded-full mr-1 py-3 md:py-3.5 px-3 md:px-5"
                            type="submit">Cancel
                    </button>
                    <button
                        className="inline-block bg-black text-white text-sm md:text-base rounded-full py-3 md:py-3.5 px-3 md:px-5"
                        type="submit">Submit a review
                    </button>
                </form>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-10">
                {Array.from(reviews.values()).map((review) => <ReviewComponent key={review.id} {...review}/>)}
            </div>
            <div className="text-center mt-5 md:mt-9">
                <button className="border border-gray-500 rounded-full px-16 py-4">Load More Reviews</button>
            </div>
        </>
    );
}
