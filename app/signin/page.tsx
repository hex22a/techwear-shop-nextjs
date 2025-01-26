import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";

export default function SignInPage() {
    return (
        <>
            <Header/>
            <main className="flex-grow flex flex-row justify-center items-center mt-5 mb-20">
                <div className="border rounded-xl p-4 w-96">
                    <form action="">
                        <label className="block text-center" htmlFor="username">Username</label>
                        <input className="block border w-full rounded-full py-3.5 px-14 mb-3" id="username" type="text"/>
                        <label className="block text-center" htmlFor="password">Password</label>
                        <input className="block border w-full rounded-full py-3.5 px-14 mb-3" id="password" type="password"/>
                        <hr className="my-4"/>
                        <button className="block border w-full rounded-full py-3.5 px-14 mb-3 bg-black text-white">Sign In</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    )
}
