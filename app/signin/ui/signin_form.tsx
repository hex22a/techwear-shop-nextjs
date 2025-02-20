'use client';

import form_style from "@/app/ui/form.module.css";

import { signIn } from 'next-auth/react';
import { startAuthentication } from '@simplewebauthn/browser';
import {
    generateWebAuthnLoginOptions, WebAuthnResponse,
} from '@/app/lib/webauthn';
import z from 'zod';
import { useState } from 'react';
import ErrorComponent from '@/app/ui/error';



export default function SignInForm() {
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const parsedCredentials = z.object({ username: z.string().nonempty() }).safeParse(Object.fromEntries(formData.entries()));
        if (!parsedCredentials.success) {
            return;
        }

        const response: WebAuthnResponse = await generateWebAuthnLoginOptions(parsedCredentials.data.username);

        if (!response.success || !response.data) {
            setError(response.message ?? 'Something went wrong!');
            return;
        }

        try {
            console.log(response.data);
            const parsedOptions = JSON.parse(response.data);
            console.log(parsedOptions);
            const localResponse = await startAuthentication({ optionsJSON: parsedOptions });
            const result = await signIn('credentials', {
                redirect: false,
                username: parsedCredentials.data.username,
                webauthnResponse: JSON.stringify(localResponse),
            });
            console.log(result);

            if (result?.error) {
                setError('Authentication failed.');
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            }
        }
        // const result = await signIn('credentials', {
        //     redirect: false,
        //     username: parsedCredentials.data.username,
        //     webauthnResponse: JSON.stringify(localResponse),
        // });
        // console.log(result);
        //
        // if (result?.error) {
        //     setError('Authentication failed.');
        // }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className={`${form_style.username} block text-center`} htmlFor="username">Username</label>
            <input className="text-black block border w-full rounded-full py-3.5 px-14 mb-3" id="username" name="username" type="text"/>
            <hr className="my-4"/>
            <button type="submit" className="block border w-full rounded-full py-3.5 px-14 mb-3 bg-black text-white">Sign In</button>
            {error !== '' && <ErrorComponent message={error} onClose={() => setError('')} />}
        </form>

    )
}
