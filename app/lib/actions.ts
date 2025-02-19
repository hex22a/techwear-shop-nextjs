'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { createCart } from '@/app/lib/data';
import { stripe } from "./stripe";
import { headers } from 'next/headers';

const AddToCartFormSchema = z.object({
  product_id: z.coerce.number().nonnegative({ message: 'Product ID is required you filthy hacker 👺'}),
  color_id: z.coerce.number({ message: 'Please select a color'}).nonnegative(),
  size_id: z.coerce.number({ message: 'Please select a size' }).nonnegative(),
  quantity: z.coerce.number().min(1).max(100),
});

const OrderProductsFormSchema = z.object({
  products: z.array(z.object({
    product_id: z.coerce.number(),
    quantity: z.coerce.number(),
  })),
  total: z.coerce.number().min(0),
});

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
      message: 'User not logged in.',
    }
  }
  console.log(formData);
  const { user } = user_session;
  if (!user || !user.id) {
    return {
      message: 'User not logged in.',
    }
  }
  const validated = AddToCartFormSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validated.success) {
    return {
      errors: validated.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
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
