import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import SignupForm from "@/app/signup/ui/signup_form";

export default function SignUpPage() {
    return (
        <>
            <Header/>
            <main className="flex-grow flex flex-row justify-center items-center mt-5 mb-20">
                <div className="border rounded-xl p-4 w-96">
                    <SignupForm />
                </div>
            </main>
            <Footer />
        </>
    )
}
