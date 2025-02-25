'use server';

import { auth } from '@/auth';
import { createCart } from './data';
import { stripe } from "./stripe";
import { headers } from 'next/headers';
import { USER_NOT_LOGGED_IN_MESSAGE, VALIDATION_FAILED_ERROR_MESSAGE } from './constants';
import { AddToCartFormSchema, OrderProductsFormSchema } from './form_schemas';

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
  const user_session = await auth()
  if (!user_session) {
    return {
      message: USER_NOT_LOGGED_IN_MESSAGE,
    }
  }
  const { user } = user_session;
  if (!user || !user.id) {
    return {
      message: USER_NOT_LOGGED_IN_MESSAGE,
    }
  }
  const validated = AddToCartFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: VALIDATION_FAILED_ERROR_MESSAGE,
    };
  }

  try {
    await createCart({ user_id: user.id, ...validated.data });
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: error.message,
      }
    }
  }
}


function transformProductsData(data: Record<string, unknown>): Record<string, unknown> {
  const products: Record<string, unknown>[] = [];

  Object.keys(data).forEach((key) => {
    const match = key.match(/^products\[(\d+)\]\[(.+)\]$/);
    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      if (!products[index]) {
        products[index] = {};
      }
      products[index][field] = data[key];

      delete data[key];
    }
  });

  if (products.length) {
    data.products = products;
  }
  return data;
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
    console.log(validated.error);
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to order products.',
    };
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    submit_type: "donate",
    payment_method_types: ["card"],
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
    ui_mode: "hosted",
  });
  console.log(validated.data);
  return {
    url: checkoutSession.url,
  }
}
