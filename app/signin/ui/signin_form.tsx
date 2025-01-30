'use client';

import { startAuthentication } from '@simplewebauthn/browser';
import {
    generateWebAuthnLoginOptions,
    verifyWebAuthnLogin,
} from '@/app/lib/webauthn';

export default function SignInForm() {
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const username = formData.get('username')?.toString();

        if (!username) {
            return;
        }

        const response = await generateWebAuthnLoginOptions(username);

        if (!response.success || !response.data) {
            alert(response.message ?? 'Something went wrong!');
            return;
        }

        const localResponse = await startAuthentication({ optionsJSON: response.data });
        const verifyResponse = await verifyWebAuthnLogin(localResponse);

        if (!verifyResponse.success) {
            alert(verifyResponse.message ?? 'Something went wrong!');
            return;
        }

        alert('Login successful!');

    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="block text-center" htmlFor="username">Username</label>
            <input className="block border w-full rounded-full py-3.5 px-14 mb-3" id="username" name="username" type="text"/>
            <hr className="my-4"/>
            <button type="submit" className="block border w-full rounded-full py-3.5 px-14 mb-3 bg-black text-white">Sign In</button>
        </form>

    )
}
