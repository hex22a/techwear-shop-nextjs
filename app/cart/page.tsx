import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import OrderForm, {OrderFormProps} from "@/app/cart/ui/order_form";

const sitePath = [
    {
        name: "Home",
        url: "/"
    },
    {
        name: "Cart",
        url: "/cart"
    }
]

const orderFormProps: OrderFormProps = {
    products: [
        {
            id: 1,
            name: 'MA.STRUM Skido Anorak 2.0',
            color_id: 1,
            color_hex_value: '#000',
            price: 400,
            discount_percent: 20,
            photo_url: '/items/NA4I5F176-ALT1.webp',
            size_id: 1,
            size: 'Large',
            size_value: 'l',
        },
        {
            id: 2,
            name: 'MA.STRUM Skido Anorak 2.0',
            color_id: 1,
            color_hex_value: '#000',
            price: 400,
            discount_percent: 20,
            photo_url: '/items/NA4I5F176-ALT1.webp',
            size_id: 1,
            size: 'Large',
            size_value: 'l',
        },
        {
            id: 3,
            name: 'MA.STRUM Skido Anorak 2.0',
            color_id: 1,
            color_hex_value: '#000',
            price: 400,
            discount_percent: 20,
            photo_url: '/items/NA4I5F176-ALT1.webp',
            size_id: 1,
            size: 'Large',
            size_value: 'l',
        },
    ],
    summary: {
        subtotal: 1000,
        discount: 200,
        deliveryFee: 20,
        total: 820,
    }
}

export default function CartPage() {
    return (
        <>
            <Header/>
            <div className="w-96 md:w-[78rem] mt-0 mb-20 mx-auto">
                <div className="py-6">
                    <Breadcrumbs sitePath={sitePath} />
                </div>
                <main>
                    <h1 className="text-4xl mb-14 md:mb-6">Your cart</h1>
                    <OrderForm {...orderFormProps} />
                </main>
            </div>
            <Footer />
        </>
    )
}
