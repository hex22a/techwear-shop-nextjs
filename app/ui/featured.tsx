import Item from "@/app/ui/item";
import { Product } from '@/app/lib/definitions';

export type FeaturedProps = {
    title: string,
    items: Product[]
}

export default function Featured(props: FeaturedProps) {
    const { items } = props;
    return (
        <div className="max-w-96 md:max-w-[78rem] my-0 mx-auto pb-16">
            <h1 className="text-center text-5xl font-bold pt-16 pb-14">{props.title}</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-5">
                {items.map((item, i) => (
                    <div key={item.id} className={i > 1 ? 'hidden md:block' : 'block'}>
                        <Item {...item}/>
                    </div>
                ))}
            </div>
            <div className="text-center mt-10">
                <button className="border border-black rounded-full w-full md:w-auto px-20 py-4">View All</button>
            </div>
        </div>
    );
}
