'use client';

import { useActionState, useState } from 'react';
import Filters from "@/app/ui/vector/filters.svg";
import styles from "@/app/product/[id]/page.module.css";
import ReviewComponent from "@/app/ui/review";
import InteractiveStars from "./interactive_stars";
import {Review} from "@/app/lib/definitions";
import { submitReview } from '@/app/lib/actions';


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

    const [formState, addReviewAction] = useActionState(submitReview, undefined);

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
                <form action={addReviewAction} className="w-full">
                    <input type="hidden" name="product_id" value={props.product_id}/>
                    <input type="hidden" name="rating" value={rating}/>
                    <fieldset>
                        <legend className="sr-only">Review</legend>
                        <label htmlFor="review_title">Title:</label>
                        <input type="text" id="review_title" name="review_title" placeholder="Great product"
                               className="block w-full p-2 my-3 border rounded-xl"/>
                        <div className="text-red-500 text-sm md:text-base">
                            {formState?.errors?.review_title &&
                              formState.errors.review_title.map((error) => (
                                <p key={error}>{error}</p>
                              ))
                            }
                        </div>
                        <label className="block" htmlFor="review_text">White your review:</label>
                        <textarea className="block w-full p-2 my-3 border rounded-xl" name="review_text" id="review_text"
                                  rows={10}/>
                        <div className="text-red-500 text-sm md:text-base">
                            {formState?.errors?.review_text &&
                              formState.errors.review_text.map((error) => (
                                <p key={error}>{error}</p>
                              ))
                            }
                        </div>
                        <label className="block" htmlFor="rating">Rating:</label>
                        <InteractiveStars rating={rating} onChange={setRating} />
                        <div className="text-red-500 text-sm md:text-base">
                            {formState?.errors?.rating &&
                              formState.errors.rating.map((error) => (
                                <p key={error}>{error}</p>
                              ))
                            }
                        </div>
                    </fieldset>
                    <button onClick={closeReviewForm}
                            className="inline-block bg-gray-300 text-black text-sm md:text-base rounded-full mr-1 py-3 md:py-3.5 px-3 md:px-5"
                            type="submit">Cancel
                    </button>
                    <button
                        className="inline-block bg-black text-white text-sm md:text-base rounded-full py-3 md:py-3.5 px-3 md:px-5"
                        type="submit">Submit a review
                    </button>
                    {formState?.message && (
                      <div className="text-red-500 text-sm md:text-base">
                          {formState.message}
                      </div>
                    )}
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
