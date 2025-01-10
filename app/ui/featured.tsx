import layout from "@/app/ui/layout.module.css";
import Image from "next/image";
import Stars from "@/app/ui/stars";
import Price from "@/app/ui/price";

export default function Featured(props: {title: string}) {
    return (
        <div className={layout.container}>
            <h1 className="text-center text-5xl font-bold pt-16 pb-14">{props.title}</h1>
            <div className="grid grid-cols-4 gap-x-5">
                <div>
                    <div className="relative bg-gray-100 rounded-xl h-72 mb-4">
                        <Image
                            className="object-contain"
                            src="/items/napa-anor.webp"
                            alt="anorak"
                            fill
                        />
                    </div>
                    <h3 className="mb-2">Napapijri Anorak</h3>
                    <div className="mb-2">
                        <Stars rating={5}/>
                    </div>
                    <div>
                        <Price price="$1000" discount={{newPrice: "$800", percent: "-20%"}}/>
                    </div>
                </div>
                <div>
                    <div className="relative bg-gray-100 rounded-xl h-72 mb-4">
                        <Image
                            className="object-contain"
                            src="/items/riot-pants.webp"
                            alt="pants"
                            fill
                        />
                    </div>
                    <h3 className="mb-2">Riot Division Pants</h3>
                    <div className="mb-2">
                        <Stars rating={4.8}/>
                    </div>
                    <div><Price price="$500"/></div>
                </div>
                <div>
                    <div className="relative bg-gray-100 rounded-xl h-72 mb-4">
                        <Image
                            className="object-contain"
                            src="/items/mastrum-jacket.jpg"
                            alt="jacket"
                            fill
                        />
                    </div>
                    <h3 className="mb-2">MA.STRUM Jacket</h3>
                    <div className="mb-2">
                        <Stars rating={3.9}/>
                    </div>
                    <div><Price price="$600"/></div>
                </div>
                <div>
                    <div className="relative bg-gray-100 rounded-xl h-72 mb-4">
                        <Image
                            className="object-contain"
                            src="/items/mastrum.jpg"
                            alt="mastrum"
                            fill
                        />
                    </div>
                    <h3 className="mb-2">MA.STRUM Jacket</h3>
                    <div className="mb-2">
                        <Stars rating={4.5}/>
                    </div>
                    <div><Price price="$2000"/></div>
                </div>
            </div>
            <div className="text-center mt-10">
                <button>View All</button>
            </div>
        </div>
    );
}
