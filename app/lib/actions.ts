'use server';

import { z } from 'zod';
import { auth } from '@/auth';
import { createCart } from '@/app/lib/data';

const AddToCartFormSchema = z.object({
  product_id: z.coerce.number().nonnegative({ message: 'Product ID is required you filthy hacker 👺'}),
  color_id: z.coerce.number({ message: 'Please select a color'}).nonnegative(),
  size_id: z.coerce.number({ message: 'Please select a size' }).nonnegative(),
  quantity: z.coerce.number().min(1).max(100),
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
  console.log(validated);
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
