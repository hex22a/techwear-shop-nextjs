import Image from "next/image";
import Brands from "@/app/ui/brands";
import Link from "next/link";
import Featured from "@/app/ui/featured";
import Carousel from "@/app/ui/carousel";
import Footer from "@/app/ui/footer";
import Header from "@/app/ui/header/header";
import { fetchNewArrivals, fetchTopSelling } from '@/app/lib/model/data/product';
import { getTopReviews } from '@/app/lib/model/data/review';

export default async function Home() {
  const [reviews, newArrivals, topSelling] = await Promise.all([
    getTopReviews(),
    fetchNewArrivals(),
    fetchTopSelling(),
  ]);

  return (
    <>
      <Header />
      <main>
        <div className="bg-[rgba(240,240,240,1)]">
          <div className="block md:grid md:grid-cols-2 max-w-96 md:max-w-[78rem] my-0 mx-auto">
            <div className="flex flex-col justify-center items-start">
              <h1 className="font-bold text-4xl md:text-6xl mb-8">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
              <p className="text-sm md:text-base mb-8">
                Browse through our diverse range of meticulously crafted garments, designed to bring out your
                individuality and cater to your sense of style.
              </p>
              <Link href="/search" className="bg-black text-white w-full md:w-auto rounded-full px-16 py-4 mb-12">
                Shop Now
              </Link>
              <div className="flex flex-row flex-wrap justify-center items-stretch">
                <div className="inline-block border-r pr-4">
                  <h2 className="text-3xl md:text-4xl">200+</h2>
                  <p className="text-sm md:text-base opacity-60">International Brands</p>
                </div>
                <div className="inline-block md:border-r px-4">
                  <h2 className="text-3xl md:text-4xl">2,000+</h2>
                  <p className="text-sm md:text-base opacity-60">High-Quality Products</p>
                </div>
                <div className="inline-block md:pl-4">
                  <h2 className="text-3xl md:text-4xl">30,000+</h2>
                  <p className="text-sm md:text-base opacity-60">Happy Customers</p>
                </div>
              </div>
            </div>
            <div>
              <Image src="/woman.webp" alt="woman in clothes" width={1280} height={1280} />
            </div>
          </div>
        </div>
        <Brands />
        <Featured title="New Arrivals" items={newArrivals} />
        <hr className="max-w-96 md:max-w-[78rem] my-0 mx-auto" />
        <Featured title="Top Selling" items={topSelling} />
        <div className="bg-gray-100 rounded-3xl px-6 pb-7 md:px-16 md:pb-20 max-w-96 md:max-w-[78rem] my-0 mx-auto">
          <h1 className="text-center text-5xl font-bold pt-16 pb-14">Browse by dress style</h1>
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center items-stretch md:items-center gap-5">
            <div className="bg-white rounded-3xl md:flex-grow-0 md:basis-[calc(33.33%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
              <div className="relative top-6 left-9 z-10 font-bold text-3xl">Casual</div>
              <Image className="object-cover" src="/dress-style/casual.webp" alt="casual" fill />
            </div>
            <div className="bg-white rounded-3xl md:flex-grow-1 md:basis-[calc(66.66%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
              <div className="relative top-6 left-9 z-10 font-bold text-3xl">Formal</div>
              <Image className="object-cover" src="/dress-style/formal.webp" alt="formal" fill />
            </div>
            <div className="bg-white rounded-3xl md:flex-grow-1 md:basis-[calc(66.66%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
              <div className="relative top-6 left-9 z-10 font-bold text-3xl">Outdoor</div>
              <Image className="object-cover" src="/dress-style/outdoor.webp" alt="outdoor" fill />
            </div>
            <div className="bg-white rounded-3xl md:flex-grow-0 md:basis-[calc(33.33%-10px)] min-h-48 md:min-h-72 overflow-hidden relative">
              <div className="relative top-6 left-9 z-10 font-bold text-3xl">Party</div>
              <Image className="object-cover" src="/dress-style/party.jpg" alt="party" fill />
            </div>
          </div>
        </div>
        <div className="mb-20">
          <Carousel items={reviews} />
        </div>
      </main>
      <Footer />
    </>
  );
}
