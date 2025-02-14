import Header from "@/app/ui/header/header";
import Footer from "@/app/ui/footer";
import SignInForm from "@/app/signin/ui/signin_form";

export default function SignInPage() {
    return (
        <>
            <Header/>
            <main className="flex-grow flex flex-row justify-center items-center mt-5 mb-20">
                <div className="border rounded-xl p-4 w-96">
                    <SignInForm />
                </div>
            </main>
            <Footer />
        </>
    )
}
