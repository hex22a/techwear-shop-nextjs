import { Stripe } from 'stripe';
import {
  GenerateAuthenticationOptionsOpts,
  GenerateRegistrationOptionsOpts, VerifyAuthenticationResponseOpts,
  VerifyRegistrationResponseOpts,
} from '@simplewebauthn/server';
import { ORIGIN, RP_ID, RP_NAME, USER_VERIFICATION_MODE } from '@/app/lib/constants';

export const STRIPE_CONFIG: Stripe.StripeConfig = {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2025-07-30.basil',
  appInfo: {
    name: 'techwear-shop-demo',
    url: 'https://techwear-shop-nextjs.vercel.app/',
  },
};

export const STRIPE_SESSION_CREATE_PARAMS: Stripe.Checkout.SessionCreateParams = {
  mode: "payment",
  submit_type: "pay",
  payment_method_types: ["card"],
  ui_mode: "hosted",
};

export const WEBAUTHN_GENERATE_REGISTRATION_OPTIONS: Omit<GenerateRegistrationOptionsOpts, 'userName' | 'userID'> = {
  rpName: RP_NAME,
  rpID: RP_ID,
  timeout: 60000,
  attestationType: 'none',
  excludeCredentials: [],
  authenticatorSelection: {
    residentKey: 'discouraged',
    authenticatorAttachment: 'platform',
    userVerification: USER_VERIFICATION_MODE
  },
  /**
   * Ed25519, ES256, and RS256
   */
  supportedAlgorithmIDs: [6, -7, -257],
};

export const WEBAUTHN_VERIFY_REGISTRATION_RESPONSE_OPTIONS: Omit<VerifyRegistrationResponseOpts, 'response'| 'expectedChallenge'> = {
  expectedOrigin: ORIGIN,
  expectedRPID: RP_ID,
  requireUserVerification: false,
};

export const WEBAUTHN_GENERATE_AUTHENTICATION_OPTIONS: Omit<GenerateAuthenticationOptionsOpts, 'allowCredentials'> = {
  timeout: 60000,
  rpID: RP_ID,
  userVerification: USER_VERIFICATION_MODE,
};

export const WEBAUTHN_VERIFY_AUTHENTICATION_RESPONSE_OPTIONS: Omit<VerifyAuthenticationResponseOpts, 'response'| 'expectedChallenge'| 'credential'> = {
  expectedOrigin: ORIGIN,
  expectedRPID: RP_ID,
  // requireUserVerification: true,
  requireUserVerification: false,
};
