'use server';

import { auth } from '@/auth';
import { createCart } from './data';
import { stripe } from "./stripe";
import { headers } from 'next/headers';
import {
  USER_NOT_LOGGED_IN_MESSAGE,
  ADD_TO_CART_MISSING_FIELDS_ERROR_MESSAGE,
  ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE,
} from './constants';
import { STRIPE_SESSION_CREATE_PARAMS } from './config';
import { AddToCartFormSchema, OrderProductsFormSchema } from './form_schemas';
import { transformProductsData } from './transformers';

export type AddToCartFormState = {
  errors?: {
    product_id?: string[];
    color_id?: string[];
    size_id?: string[];
    quantity?: string[];
  };
  message?: string | null;
}

export async function addToCart(prevState: AddToCartFormState | undefined, formData: FormData) {
  const user_session = await auth();
  if (!user_session) {
    return {
      message: USER_NOT_LOGGED_IN_MESSAGE,
    };
  }
  const { user } = user_session;
  if (!user || !user.id) {
    return {
      message: USER_NOT_LOGGED_IN_MESSAGE,
    };
  }
  const validated = AddToCartFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: ADD_TO_CART_MISSING_FIELDS_ERROR_MESSAGE,
    };
  }

  try {
    await createCart({ user_id: user.id, ...validated.data });
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    }
  }
}


export type OrderProductsFormState = {
  errors?: {
    products?: string[];
    total?: string[];
  };
  message?: string | null;
  url?: string | null;
}

export async function orderProducts(
  prevState: OrderProductsFormState | undefined,
  formData: FormData,
) {
  const origin: string = (await headers()).get("origin") as string;

  const data = transformProductsData(Object.fromEntries(formData.entries()));
  const validated = OrderProductsFormSchema.safeParse(data);
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE,
    };
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          product_data: {
            name: "Total for clothes: ",
          },
          unit_amount: validated.data.total * 100
        },
      },
    ],
    success_url: `${origin}/cart/result?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/cart`,
    ...STRIPE_SESSION_CREATE_PARAMS,
  });
  return {
    url: checkoutSession.url,
  };
}
