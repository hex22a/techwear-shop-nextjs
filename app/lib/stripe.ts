import Stripe from "stripe";
import { STRIPE_CONFIG } from './config';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, STRIPE_CONFIG);
