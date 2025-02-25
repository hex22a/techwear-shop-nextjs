'use client';

import UserPic from '@/app/ui/vector/userpic.svg';
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from "next-auth/react";
import WebauthnForm from './webauthn_form';
import { signOut } from "next-auth/react";

export default function UserButton() {
  const [isMiniSignInVisible, setIsMiniSignInVisible] = useState(false);
  const toggleMiniSignIn = () => setIsMiniSignInVisible(!isMiniSignInVisible);
  const { data: session } = useSession();
  return (
    <div className="relative">
      <Link className="block md:hidden" href="/signin">
        <UserPic />
      </Link>
      <button onClick={toggleMiniSignIn} className="hidden md:block">
        <UserPic />
      </button>
      {isMiniSignInVisible &&
        <div className="absolute top-10 right-0 w-72 bg-black text-white rounded-xl shadow-lg p-4">
          {session ?
            <button onClick={() => signOut()} className="w-full border border-white rounded-full text-white">Sign Out</button>
            :
            <WebauthnForm />
          }
        </div>
      }
    </div>
  );
}
