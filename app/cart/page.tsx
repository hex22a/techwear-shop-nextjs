import Header from "@/app/ui/header/header";
import Footer from "@/app/ui/footer";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import OrderForm from "@/app/cart/ui/order_form";
import { Cart } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { getCart } from '@/app/lib/data';

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

export default async function CartPage() {
    const user_session = await auth();
    if (!user_session || !user_session.user || !user_session.user.id) {
        throw new Error('User not logged in');
    }

    const cart: Cart = await getCart(user_session.user.id);

    return (
        <>
            <Header/>
            <div className="w-96 md:w-[78rem] mt-0 mb-20 mx-auto">
                <div className="py-6">
                    <Breadcrumbs sitePath={sitePath} />
                </div>
                <main>
                    <h1 className="text-4xl mb-14 md:mb-6">Your cart</h1>
                    <OrderForm {...cart} />
                </main>
            </div>
            <Footer />
        </>
    )
}
