import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";

export type ItemProps = {
    id: string;
    title: string;
    rating: number;
    price: number;
    imageUrl: string;
    imageAlt: string;
    discount?: {
        newPrice: number;
        percent: number;
    };
}

export default function Item(props: ItemProps) {
    const { title, rating, price, imageUrl, imageAlt, discount } = props;

    return (
        <>
            <div className="relative bg-gray-100 rounded-xl h-72 mb-4">
                <Image
                    className="object-contain"
                    src={imageUrl}
                    alt={imageAlt}
                    fill
                />
            </div>
            <h3 className="mb-2">{title}</h3>
            <div className="mb-2">
                <Stars rating={rating}/>
            </div>
            <div>
                <Price price={price} discount={discount}/>
            </div>
        </>
    )
}
