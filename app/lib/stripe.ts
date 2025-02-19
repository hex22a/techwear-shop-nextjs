import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: "2025-01-27.acacia",
  appInfo: {
    name: "techwear-shop-demo",
    url: "https://techwear-shop-nextjs.vercel.app/",
  },
});
