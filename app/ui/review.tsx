import Stars from "@/app/ui/stars";
import Image from "next/image";
import {ReviewRaw} from "@/app/lib/definitions";

export default function Review(props: ReviewRaw) {
    return (
        <div className="border border-gray-500 rounded-xl px-8 py-7">
            <div className="mb-5">
                <Stars rating={props.rating}/>
            </div>
            <article className="leading-6 mb-3">
                <h3 className="inline-block mr-1 align-middle">{props.title}</h3>
                <Image
                    className="inline-block align-middle"
                    src="/verified.svg"
                    alt="verified checkmark"
                    width={24}
                    height={24}
                />
            </article>
            <p className="text-wrap">{props.review_text}</p>
        </div>
    )
}
