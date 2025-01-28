import Item, {ItemProps} from "@/app/ui/item";

const items: ItemProps[] = [
    {
        id: '1',
        title: "Napapijri Anorak",
        rating: 5,
        price: 1000,
        imageUrl: "/items/napa-anor.webp",
        imageAlt: "anorak",
        discount: {
            newPrice: 800,
            percent: 20
        }
    },
    {
        id: '2',
        title: "Riot Division Pants",
        rating: 4.8,
        price: 500,
        imageUrl: "/items/riot-pants.webp",
        imageAlt: "pants",
    },
    {
        id: '3',
        title: "MA.STRUM Jacket",
        rating: 3.9,
        price: 600,
        imageUrl: "/items/mastrum-jacket.jpg",
        imageAlt: "jacket",
    },
    {
        id: '4',
        title: "MA.STRUM Jacket",
        rating: 4.5,
        price: 2000,
        imageUrl: "/items/mastrum.jpg",
        imageAlt: "mastrum",
    }
]

export default function Featured(props: {title: string}) {
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
