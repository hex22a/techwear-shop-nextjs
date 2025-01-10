import Image from "next/image";
import layout from "@/app/ui/layout.module.css"

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
            <div className="bg-black">
                <div className={`${layout.container} flex flex-row flex-wrap justify-around items-center min-h-32`}>
                    <div className="relative min-h-10 min-w-24 md:min-w-36 my-4 md:my-0">
                        <Image
                            className="object-contain"
                            src="/krakatau.svg"
                            alt="krakatau logo"
                            fill
                        />
                    </div>
                    <div className="relative min-h-10  min-w-24 md:min-w-36 my-4 md:my-0">
                        <Image
                            className="object-contain"
                            src="/arcteryx.svg"
                            alt="arcteryx logo"
                            fill
                        />
                    </div>
                    <div className="relative min-h-10  min-w-24 md:min-w-36 my-4 md:my-0">
                        <Image
                            className="object-contain"
                            src="/acronym.svg"
                            alt="acronym logo"
                            fill
                        />
                    </div>
                    <div className="relative min-h-10  min-w-24 md:min-w-36 my-4 md:my-0">
                        <Image
                            className="object-contain"
                            src="/cp-company.svg"
                            alt="cp company logo"
                            fill
                        />
                    </div>
                    <div className="relative min-h-10 min-w-24 md:min-w-36 my-4 md:my-0">
                        <Image
                            className="object-contain"
                            src="/the-north-face.svg"
                            alt="north face logo"
                            fill
                        />
                    </div>
                </div>
            </div>

        </main>
        <footer className="grid grid-cols-12">footer</footer>
    </>
  );
}
