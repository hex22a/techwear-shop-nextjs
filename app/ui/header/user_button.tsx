'use client';

import UserPic from '@/app/ui/vector/userpic.svg';
import Link from 'next/link';
import { useState } from 'react';
import WebauthnForm from '@/app/ui/header/webauthn_form';

export default function User_button() {
  const [isMiniSignInVisible, setIsMiniSignInVisible] = useState(false);
  const toggleMiniSignIn = () => setIsMiniSignInVisible(!isMiniSignInVisible);

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
          <WebauthnForm />
        </div>
      }
    </div>
  );
}
