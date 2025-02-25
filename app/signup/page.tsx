import Header from "@/app/ui/header/header";
import Footer from "@/app/ui/footer";
import SignupForm from "@/app/signup/ui/signup_form";
import Link from 'next/link';

export default function SignUpPage() {
    return (
        <>
            <Header/>
            <main className="flex-grow flex flex-row justify-center items-center mt-5 mb-20">
                <div className="border rounded-xl p-4 w-96">
                  <SignupForm />
                  <div className="text-center">Already have an account? <Link className="underline" href="/signin">Sign In</Link></div>
                </div>
            </main>
            <Footer />
        </>
    );
}
