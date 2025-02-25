'use client';

import { useState } from 'react';
import SignInForm from '@/app/signin/ui/signin_form';
import SignupForm from '@/app/signup/ui/signup_form';

export default function WebauthnForm() {
  const [isSignInVisible, setIsSignInVisible] = useState(true);
  const toggleSignInVisibility = () => setIsSignInVisible(!isSignInVisible);
  return (
    <>
      {isSignInVisible ?
        <>
          <SignInForm/>
          <div className="text-center">Don&#39;t have an account? <button className="underline" onClick={toggleSignInVisibility}>Sign Up</button></div>
        </>
      :
        <>
          <SignupForm />
          <div className="text-center">Already have an account? <button className="underline" onClick={toggleSignInVisibility}>Sign In</button></div>
        </>
      }
    </>
  );
}
