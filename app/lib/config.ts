import { Stripe } from 'stripe';

export const STRIPE_CONFIG: Stripe.StripeConfig = {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2025-01-27.acacia",
  appInfo: {
    name: "techwear-shop-demo",
    url: "https://techwear-shop-nextjs.vercel.app/",
  },
};

export const STRIPE_SESSION_CREATE_PARAMS: Stripe.Checkout.SessionCreateParams = {
  mode: "payment",
  submit_type: "pay",
  payment_method_types: ["card"],
  ui_mode: "hosted",
};
