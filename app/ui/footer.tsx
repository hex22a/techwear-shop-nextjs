import layout from "@/app/ui/layout.module.css";
import styles from "./footer.module.css";
import Facebook from "@/app/ui/vector/facebook.svg"
import Twitter from "@/app/ui/vector/twitter.svg"
import Instagram from "@/app/ui/vector/instagram.svg"
import Github from "@/app/ui/vector/github.svg"
import Image from "next/image";

export default function Footer() {
    return (
        <div className="relative">
            <div className={layout.container}>
                <div
                    className="bg-black rounded-3xl flex flex-col md:flex-row justify-between items-center px-6 py-8 md:px-16 md:py-11 mb-14">
                    <h1 className="text-white text-4xl w-full mb-8 md:w-1/2">STAY UPTO DATE ABOUT OUR LATEST OFFERS</h1>
                    <form className="w-full md:w-1/3">
                        <label className={`${styles.email} relative block`} htmlFor="email_footer"></label>
                        <input id="email_footer" className="bg-white text-black rounded-full w-full py-3 pl-14 mb-3"
                               type="text"
                               placeholder="Enter your email address"/>
                        <button className="bg-white text-black rounded-full w-full py-3">Subscribe to Newsletter
                        </button>
                    </form>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div className="w-full md:w-1/4 mb-6">
                        <h1 className="text-4xl mb-6">TECH SHOP</h1>
                        <p className="text-lg mb-9">We have clothes that suits your style and which you’re proud to
                            wear. From women to men.</p>
                        <div>
                            <a className="inline-block mr-3" href="#">
                                <Twitter/>
                            </a>
                            <a className="inline-block mr-3" href="#">
                                <Facebook/>
                            </a>
                            <a className="inline-block mr-3" href="#">
                                <Instagram/>
                            </a>
                            <a className="inline-block" href="#">
                                <Github/>
                            </a>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-10">
                        <div>
                            <h3 className="mb-7">Company</h3>
                            <a className="block mb-5" href="#">About</a>
                            <a className="block mb-5" href="#">Features</a>
                            <a className="block mb-5" href="#">Works</a>
                            <a className="block mb-5" href="#">Career</a>
                        </div>
                        <div>
                            <h3 className="mb-7">Help</h3>
                            <a className="block mb-5" href="#">Customers Support</a>
                            <a className="block mb-5" href="#">Delivery Details</a>
                            <a className="block mb-5" href="#">Terms & Conditions</a>
                            <a className="block mb-5" href="#">Privacy Policy</a>
                        </div>
                        <div>
                            <h3 className="mb-7">FAQ</h3>
                            <a className="block mb-5" href="#">Account</a>
                            <a className="block mb-5" href="#">Manage Deliveries</a>
                            <a className="block mb-5" href="#">Orders</a>
                            <a className="block mb-5" href="#">Payments</a>
                        </div>
                        <div>
                            <h3 className="mb-7">Resources</h3>
                            <a className="block mb-5" href="#">Free eBooks</a>
                            <a className="block mb-5" href="#">Development Tutorial</a>
                            <a className="block mb-5" href="#">How to - Blog</a>
                            <a className="block mb-5" href="#">Youtube playlist</a>
                        </div>
                    </div>
                </div>
                <hr className="mt-12 mb-6"/>
                <div className="flex flex-col md:flex-row justify-between items-center pb-20">
                    <div className="mb-4 md:mb-0">
                        Tech Shop © 2025, All Rights Reserved
                    </div>
                    <div>
                        <Image
                            className="inline-block"
                            src="/visa.svg"
                            alt="visa logo"
                            width={66}
                            height={49}
                        />
                        <Image
                            className="inline-block"
                            src="/mc.svg"
                            alt="mastercard logo"
                            width={66}
                            height={49}
                        />
                        <Image
                            className="inline-block"
                            src="/paypal.svg"
                            alt="paypal logo"
                            width={66}
                            height={49}
                        />
                        <Image
                            className="inline-block"
                            src="/apple-pay.svg"
                            alt="apple pay logo"
                            width={66}
                            height={49}
                        />
                        <Image
                            className="inline-block"
                            src="/google-pay.svg"
                            alt="google pay logo"
                            width={66}
                            height={49}
                        />
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gray-100 -z-10 h-5/6"></div>
            </div>
        </div>
    )
}
