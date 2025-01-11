import Image from "next/image";
import layout from "@/app/ui/layout.module.css"
import Brands from "@/app/ui/brands";
import Featured from "@/app/ui/featured";

export default function Home() {
  return (
    <>
        <main>
            <div className={`${layout.container} block md:grid md:grid-cols-2`}>
                <div className="flex flex-col justify-center items-start">
                    <h1>FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
                    <p>Browse through our diverse range of meticulously crafted garments, designed to bring out your
                        individuality and cater to your sense of style.</p>
                    <button>Shop Now</button>
                    <div>
                        <div className="inline-block">
                            <h2>200+</h2>
                            <p>International Brands</p>
                        </div>
                        <div className="inline-block">
                            <h2>2,000+</h2>
                            <p>High-Quality Products</p>
                        </div>
                        <div className="inline-block">
                            <h2>30,000+</h2>
                            <p>Happy Customers</p>
                        </div>
                    </div>
                </div>
                <div>
                    <Image
                        src="/woman.webp"
                        alt="woman in clothes"
                        width={1280}
                        height={1280}
                    />
                </div>
            </div>
            <Brands/>
            <Featured title="New Arrivals"/>
            <hr className={layout.container}/>
            <Featured title="Top Selling"/>
            <div className={`${layout.container} bg-gray-100 rounded-3xl px-6 pb-7 md:px-16 md:pb-20`}>
                <h1 className="text-center text-5xl font-bold pt-16 pb-14">Browse by dress style</h1>
                <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch md:items-center gap-5">
                    <div className="bg-white rounded-3xl md:flex-grow-0 md:basis-[calc(33.33%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
                        <div className="relative top-6 left-9 z-10 font-bold text-3xl">Casual</div>
                        <Image
                            className="absolute bottom-0 right-0"
                            src="/dress-style/casual.webp"
                            alt="casual"
                            width={400}
                            height={400}
                        />
                    </div>
                    <div className="bg-white rounded-3xl md:flex-grow-1 md:basis-[calc(66.66%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
                        <div className="relative top-6 left-9 z-10 font-bold text-3xl">Formal</div>
                        <Image
                            className="absolute bottom-0 right-0"
                            src="/dress-style/formal.webp"
                            alt="formal"
                            width={600}
                            height={600}
                        />
                    </div>
                    <div className="bg-white rounded-3xl md:flex-grow-1 md:basis-[calc(66.66%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
                        <div className="relative top-6 left-9 z-10 font-bold text-3xl">Casual</div>
                        <Image
                            className="absolute bottom-0 right-0"
                            src="/dress-style/outdoor.webp"
                            alt="outdoor"
                            width={600}
                            height={600}
                        />
                    </div>
                    <div className="bg-white rounded-3xl md:flex-grow-0 md:basis-[calc(33.33%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
                        <div className="relative top-6 left-9 z-10 font-bold text-3xl">Party</div>
                        <Image
                            className="absolute bottom-0 right-0"
                            src="/dress-style/party.jpg"
                            alt="party"
                            width={400}
                            height={400}
                        />
                    </div>
                </div>
            </div>
        </main>
        <footer className="grid grid-cols-12">footer</footer>
    </>
  );
}
