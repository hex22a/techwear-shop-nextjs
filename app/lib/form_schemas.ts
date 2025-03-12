import { z } from 'zod';

export const NEGATIVE_PRODUCT_ID_ERROR_MESSAGE = 'Product ID is required you filthy hacker 👺';
export const MISSING_COLOR_ID_ERROR_MESSAGE = 'Please select a color';
export const MISSING_SIZE_ID_ERROR_MESSAGE = 'Please select a size';

export const EMPTY_PRODUCTS_ARRAY_ERROR_MESSAGE = 'Please select at least one product';

export const MIN_QUANTITY = 1;
export const MAX_QUANTITY = 100;

export const MIN_TOTAL = 0;

export const AddToCartFormSchema = z.object({
  product_id: z.coerce.number().nonnegative({ message: NEGATIVE_PRODUCT_ID_ERROR_MESSAGE}),
  color_id: z.coerce.number({ message: MISSING_COLOR_ID_ERROR_MESSAGE}).nonnegative(),
  size_id: z.coerce.number({ message: MISSING_SIZE_ID_ERROR_MESSAGE }).nonnegative(),
  quantity: z.coerce.number().min(MIN_QUANTITY).max(MAX_QUANTITY),
});

export const OrderProductsFormSchema = z.object({
  products: z.array(z.object({
    product_id: z.coerce.number(),
    quantity: z.coerce.number(),
  }), { message: EMPTY_PRODUCTS_ARRAY_ERROR_MESSAGE }),
  total: z.coerce.number().min(MIN_TOTAL),
});

export const ReviewFormSchema = z.object({
  product_id: z.coerce.number(),
  review_title: z.string().nonempty(),
  review_text: z.string().nonempty(),
  rating: z.coerce.number(),
});
