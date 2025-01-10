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
            <div className={`${layout.container} bg-gray-100 rounded-3xl`}>
                <h1 className="text-center text-5xl font-bold pt-16 pb-14">Browse by dress style</h1>
                <div className="flex flex-row flex-wrap justify-center items-center">
                    <div className="bg-white flex-grow-0 basis-1/3">Casual</div>
                    <div className="bg-white flex-grow-1 basis-2/3">Formal</div>
                    <div className="bg-white flex-grow-1 basis-2/3">Party</div>
                    <div className="bg-white flex-grow-0 basis-1/3">Gym</div>
                </div>
            </div>
        </main>
        <footer className="grid grid-cols-12">footer</footer>
    </>
  );
}
