import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";
import { Product } from '@/app/lib/definitions';
import Link from 'next/link';

export default function Item(props: Product) {
    const { id, name, average_rating, price, photo_url, discount } = props;

    return (
        <Link href={`/product/${id}`}>
            <div className="relative bg-gray-100 rounded-xl h-72 mb-4">
                <Image
                    className="object-contain"
                    src={photo_url}
                    alt={`${name} photo`}
                    fill
                />
            </div>
            <h3 className="mb-2">{name}</h3>
            <div className="mb-2">
                <Stars rating={average_rating}/>
            </div>
            <div>
                <Price price={price} discount={discount}/>
            </div>
        </Link>
    )
}
