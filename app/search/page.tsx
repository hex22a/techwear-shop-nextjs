import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import layout from "@/app/ui/layout.module.css";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import Item, {ItemProps} from "@/app/ui/item";

import Filters from "./ui/filters";

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

const items: ItemProps[] = [
    {
        id: '1',
        title: "Napapijri Anorak",
        rating: 5,
        price: "$1000",
        imageUrl: "/items/napa-anor.webp",
        imageAlt: "anorak",
        discount: {
            newPrice: "$800",
            percent: "-20%"
        }
    },
    {
        id: '2',
        title: "Riot Division Pants",
        rating: 4.8,
        price: "$500",
        imageUrl: "/items/riot-pants.webp",
        imageAlt: "pants",
    },
    {
        id: '3',
        title: "MA.STRUM Jacket",
        rating: 3.9,
        price: "$600",
        imageUrl: "/items/mastrum-jacket.jpg",
        imageAlt: "jacket",
    },
    {
        id: '4',
        title: "MA.STRUM Jacket",
        rating: 4.5,
        price: "$2000",
        imageUrl: "/items/mastrum.jpg",
        imageAlt: "mastrum",
    },
    {
        id: '5',
        title: "Napapijri Anorak",
        rating: 5,
        price: "$1000",
        imageUrl: "/items/napa-anor.webp",
        imageAlt: "anorak",
        discount: {
            newPrice: "$800",
            percent: "-20%"
        }
    },
    {
        id: '6',
        title: "Riot Division Pants",
        rating: 4.8,
        price: "$500",
        imageUrl: "/items/riot-pants.webp",
        imageAlt: "pants",
    },
    {
        id: '7',
        title: "MA.STRUM Jacket",
        rating: 3.9,
        price: "$600",
        imageUrl: "/items/mastrum-jacket.jpg",
        imageAlt: "jacket",
    },
    {
        id: '8',
        title: "MA.STRUM Jacket",
        rating: 4.5,
        price: "$2000",
        imageUrl: "/items/mastrum.jpg",
        imageAlt: "mastrum",
    },
    {
        id: '9',
        title: "Riot Division Pants",
        rating: 4.8,
        price: "$500",
        imageUrl: "/items/riot-pants.webp",
        imageAlt: "pants",
    },
]

export default function SearchPage() {
  return (
      <>
          <Header />
          <div className="mt-32 md:mt-40">
              <div className={`${layout.container} py-6`}>
                  <Breadcrumbs sitePath={sitePath}/>
              </div>
          </div>
          <div className={layout.container}>
              <div className="flex flex-row justify-between items-start gap-5">
                  <aside className="border border-gray-300 rounded-2xl py-5 px-6 w-1/4">
                      <Filters />
                  </aside>
                  <main className="flex-grow">
                      <div className="flex flex-row justify-between items-center">
                          <h1 className="text-4xl">Casual</h1>
                          <span>
                              <span className="text-sm">Showing 1-10 of 100 Products</span>
                              <span>Sort by: Most Popular</span>
                          </span>
                      </div>
                      <div className="grid grid-cols-3 gap-x-5 gap-y-9">
                          {items.map((item) => (
                              <div key={item.id}>
                                  <Item {...item}/>
                              </div>
                          ))}
                      </div>
                  </main>
              </div>
          </div>

          <Footer/>
      </>
  );
}
