import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Item, {ItemProps} from "@/app/ui/item";
import Arrow from "@/app/ui/vector/arrow.svg";

import Filters from "./ui/filters";
import SearchResultsHeader, { SearchResultsHeaderProps } from "@/app/search/ui/search_results_header";
import {fetchAllCategories, fetchAllColors, fetchAllSizes, fetchAllStyles} from "@/app/lib/data";

const sitePath = [
    {
        name: 'Home',
        url: '/',
    },
    {
        name: 'Casual',
        url: '#',
    },
]

const searchResultsHeaderProps: SearchResultsHeaderProps = {
    indexFirst: 1,
    indexLast: 10,
    totalCount: 100
}

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
    },
    {
        id: '5',
        title: "Napapijri Anorak",
        rating: 5,
        price: 2000,
        imageUrl: "/items/napa-anor.webp",
        imageAlt: "anorak",
        discount: {
            newPrice: 800,
            percent: 20
        }
    },
    {
        id: '6',
        title: "Riot Division Pants",
        rating: 4.8,
        price: 500,
        imageUrl: "/items/riot-pants.webp",
        imageAlt: "pants",
    },
    {
        id: '7',
        title: "MA.STRUM Jacket",
        rating: 3.9,
        price: 600,
        imageUrl: "/items/mastrum-jacket.jpg",
        imageAlt: "jacket",
    },
    {
        id: '8',
        title: "MA.STRUM Jacket",
        rating: 4.5,
        price: 2000,
        imageUrl: "/items/mastrum.jpg",
        imageAlt: "mastrum",
    },
    {
        id: '9',
        title: "Riot Division Pants",
        rating: 4.8,
        price: 500,
        imageUrl: "/items/riot-pants.webp",
        imageAlt: "pants",
    },
]

export default async function SearchPage() {
    const [
        colors,
        sizes,
        dressStyles,
        categories,
    ] = await Promise.all([
        fetchAllColors(),
        fetchAllSizes(),
        fetchAllStyles(),
        fetchAllCategories(),
    ])

    return (
      <>
          <Header />
          <div className="max-w-96 md:max-w-[78rem] my-0 mx-auto">
              <div className="py-6">
                  <Breadcrumbs sitePath={sitePath}/>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-start gap-5">
                  <Filters categories={categories} colors={colors} sizes={sizes} dressStyles={dressStyles} />
                  <main className="flex-grow">
                      <div className="hidden md:block md:mb-4">
                          <SearchResultsHeader {...searchResultsHeaderProps} />
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-9">
                          {items.map((item) => (
                              <div key={item.id}>
                                  <Item {...item}/>
                              </div>
                          ))}
                      </div>
                      <hr className="mt-8 mb-5"/>
                      <div className="flex flex-row justify-between items-stretch mb-20 text-sm md:text-base ">
                          <button className="border py-2 px-3 md:px-3.5 rounded-xl">
                              <div className="flex flex-row justify-start items-center gap-0.5 md:gap-2">
                                  <Arrow className="fill-black rotate-180" width={24} height={24}/>
                                  Previous
                              </div>
                          </button>
                          <div className="text-[rgba(0,0,0,.5)] flex flex-row justify-start items-center">
                              <button className="h-8 w-8 md:h-10 md:w-10 rounded-xl">1</button>
                              <button className="h-8 w-8 md:h-10 md:w-10 rounded-xl">2</button>
                              <button className="hidden md:block h-8 w-8 md:h-10 md:w-10 rounded-xl">3</button>
                              <button className="h-8 w-8 md:h-10 md:w-10 rounded-xl">...</button>
                              <button className="hidden md:block h-8 w-8 md:h-10 md:w-10 rounded-xl">8</button>
                              <button className="h-8 w-8 md:h-10 md:w-10 rounded-xl">9</button>
                              <button className="h-8 w-8 md:h-10 md:w-10 rounded-xl">10</button>
                          </div>
                          <button className="border py-2 px-3 md:px-3.5 rounded-xl">
                              <div className="flex flex-row justify-start items-center gap-2">
                                  Next
                                  <Arrow className="fill-black" width={24} height={24}/>
                              </div>
                          </button>
                      </div>
                  </main>
              </div>
          </div>
          <Footer/>
      </>
    );
}
