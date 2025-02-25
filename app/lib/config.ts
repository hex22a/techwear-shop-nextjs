import { Stripe } from 'stripe';

export const STRIPE_SESSION_CREATE_PARAMS: Stripe.Checkout.SessionCreateParams = {
  mode: "payment",
  submit_type: "pay",
  payment_method_types: ["card"],
  ui_mode: "hosted",
};
