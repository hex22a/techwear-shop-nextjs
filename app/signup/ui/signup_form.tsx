'use client';

import { startRegistration } from '@simplewebauthn/browser';
import {
    generateWebAuthnRegistrationOptions,
    verifyWebAuthnRegistration,
} from '@/app/lib/webauthn';
import Link from "next/link";

export default function SignupForm() {
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        console.log('submitting');
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username')?.toString();

        if (!username) {
            return;
        }

        const response = await generateWebAuthnRegistrationOptions(username);

        if (!response.success || !response.data) {
            alert(response.message ?? 'Something went wrong!');
            return;
        }


        const localResponse = await startRegistration({ optionsJSON: response.data });
        const verifyResponse = await verifyWebAuthnRegistration(localResponse);

        if (!verifyResponse.success) {
            alert(verifyResponse.message ?? 'Something went wrong!');
            return;
        }

        alert('Registration successful!');

    }

    return (
        <form onSubmit={handleSubmit}>
            <label className="block text-center" htmlFor="username">Username</label>
            <input className="block border w-full rounded-full py-3.5 px-14 mb-3" name="username" id="username" type="text"/>
            <hr className="my-4"/>
            <button type="submit" className="block border w-full rounded-full py-3.5 px-14 mb-3 bg-black text-white">Sign Up</button>
            <div className="text-center">Already have an account? <Link className="underline" href="/signin">Sign In</Link></div>
        </form>
    )
}
