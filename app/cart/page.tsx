import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import OrderForm from "@/app/cart/ui/order_form";

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
                    <OrderForm />
                </main>
            </div>
            <Footer />
        </>
    )
}
