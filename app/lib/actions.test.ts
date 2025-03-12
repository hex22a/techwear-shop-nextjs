import {
  addToCart,
  AddToCartFormState,
  orderProducts,
  OrderProductsFormState,
  submitReview,
  SubmitReviewFormState,
} from './actions';
import { typeToFlattenedError, ZodError } from 'zod';
import {
  USER_NOT_LOGGED_IN_MESSAGE,
  ADD_TO_CART_MISSING_FIELDS_ERROR_MESSAGE,
  ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE,
  ADD_REVIEW_MISSING_FIELDS_ERROR_MESSAGE,
  FAILED_TO_ADD_REVIEW_ERROR_MESSAGE,
} from './constants';

import { auth as mockAuth } from '@/auth';
import {
  AddToCartFormSchema as MockAddToCartFormSchema,
  OrderProductsFormSchema as MockOrderProductsFormSchema,
  ReviewFormSchema as MockReviewFormSchema,
} from './form_schemas';
import {
  createCart as mockCreateCart,
  addReview as mockAddReview,
} from './data';
import { transformProductsData as mockTransformProductsData } from './transformers';
import { stripe as mockStripe } from './stripe';
import { headers as mockHeaders } from 'next/headers';
import { STRIPE_SESSION_CREATE_PARAMS } from '@/app/lib/config';
import { Cart } from '@/app/lib/definitions';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));
jest.mock('./data', () => ({
  createCart: jest.fn(),
  addReview: jest.fn(),
}));
jest.mock('./stripe', () => ({
  stripe: {
    checkout: {
      sessions: {
        create: jest.fn(),
      },
    },
  }
}));
jest.mock('next/headers', () => ({
  headers: jest.fn(),
}));
jest.mock('./form_schemas', () => ({
  AddToCartFormSchema: {
    safeParse: jest.fn(),
  },
  OrderProductsFormSchema: {
    safeParse: jest.fn(),
  },
  ReviewFormSchema: {
    safeParse: jest.fn(),
  }
}));
jest.mock('./transformers');

describe('actions', () => {
  const expectedPrevState = undefined;

  describe('addToCart', () => {
    describe('user not logged in', () => {
      const expectedFormData = new FormData();

      test('user_session is not present', async () => {
        // Arrange
        const expectedUserSession = undefined;
        const expectedNewState: AddToCartFormState = {
          message: USER_NOT_LOGGED_IN_MESSAGE,
        };
        (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);

        // Act
        const actualNewState: AddToCartFormState | undefined = await addToCart(expectedPrevState, expectedFormData);

        // Assert
        expect(actualNewState).toEqual(expectedNewState);
      });

      test('user is not logged in', async () => {
        // Arrange
        const expectedUserSession = {};
        const expectedNewState: AddToCartFormState = {
          message: USER_NOT_LOGGED_IN_MESSAGE,
        };
        (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);

        // Act
        const actualNewState: AddToCartFormState | undefined = await addToCart(expectedPrevState, expectedFormData);

        // Assert
        expect(actualNewState).toEqual(expectedNewState);
      });

      test('user id is not presented', async () => {
        // Arrange
        const expectedUserSession = { user: {} };
        const expectedNewState: AddToCartFormState = {
          message: USER_NOT_LOGGED_IN_MESSAGE,
        };
        (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);

        // Act
        const actualNewState: AddToCartFormState | undefined = await addToCart(expectedPrevState, expectedFormData);

        // Assert
        expect(actualNewState).toEqual(expectedNewState);
      });
    });

    describe('user logged in', () => {
      const expectedUserId = 'uuid-uuid-uuid';
      const expectedUserSession = { user: { id: expectedUserId } };

      test('form data validation failed', async () => {
        // Arrange
        const expectedFormData = new FormData();
        const expectedProductId = '-1';
        expectedFormData.append('product_id', expectedProductId);
        const expectedData = {
          product_id: expectedProductId,
        };
        const expectedFieldErrors = { product_id: ['Wrong product id'] };
        const expectedValidationErrors: Partial<ZodError> = {
          flatten<U>(): typeToFlattenedError<U> {
            return { fieldErrors: expectedFieldErrors } as unknown as typeToFlattenedError<U>;
          },
        };
        const expectedNewState: AddToCartFormState = {
          errors: expectedFieldErrors,
          message: ADD_TO_CART_MISSING_FIELDS_ERROR_MESSAGE,
        };
        (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
        (MockAddToCartFormSchema.safeParse as jest.Mock).mockReturnValue({
          success: false,
          error: expectedValidationErrors,
        });

        // Act
        const actualNewState: AddToCartFormState | undefined = await addToCart(expectedPrevState, expectedFormData);

        // Assert
        expect(actualNewState).toEqual(expectedNewState);
        expect(MockAddToCartFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
      });

      describe('form validated successfully', () => {
        const expectedFormData = new FormData();
        const expectedProductId = '1';
        const expectedData = {
          product_id: expectedProductId,
        };
        const expectedParsedData = {
          product_id: expectedProductId,
        };

        beforeAll(() => {
          expectedFormData.append('product_id', expectedProductId);
        });

        test('error creating cart', async () => {
          // Arrange
          const expectedDbErrorMessage = 'Failed to create cart';
          const expectedNewState: AddToCartFormState = {
            message: expectedDbErrorMessage,
          };
          (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
          (MockAddToCartFormSchema.safeParse as jest.Mock).mockReturnValue({
            success: true,
            data: expectedParsedData,
          });
          (mockCreateCart as jest.Mock).mockImplementation(() => {
            throw new Error(expectedDbErrorMessage); });

          // Act
          const actualNewState: AddToCartFormState | undefined = await addToCart(expectedPrevState, expectedFormData);

          // Assert
          expect(actualNewState).toEqual(expectedNewState);
          expect(MockAddToCartFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
          expect(mockCreateCart).toHaveBeenCalledWith({ user_id: expectedUserId, ...expectedParsedData });
        });

        test('create cart', async () => {
          // Arrange
          const expectedNewState = undefined;
          (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
          (MockAddToCartFormSchema.safeParse as jest.Mock).mockReturnValue({
            success: true,
            data: expectedParsedData,
          });
          const expectedCart: Cart = {
            products: [],
            summary: { deliveryFee: 0, discount: 0, subtotal: 0, total: 0 },
            user_id: ''
          };
          (mockCreateCart as jest.Mock).mockResolvedValue(expectedCart);

          // Act
          const actualNewState: AddToCartFormState | undefined = await addToCart(expectedPrevState, expectedFormData);

          // Assert
          expect(actualNewState).toEqual(expectedNewState);
          expect(MockAddToCartFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
          expect(mockCreateCart).toHaveBeenCalledWith({ user_id: expectedUserId, ...expectedParsedData });
        });
      });
    });
  });

  describe('orderProducts', () => {
    const expectedFormData = new FormData();
    const expectedOrigin = 'https://techwear-shop-nextjs.vercel.app/';
    const expected_product_0_color_id = '1';
    const expected_product_0_product_id = '1';
    const expected_product_0_quantity = '1';
    const expected_product_0_size_id = '1';
    const expected_product_0_color_id_key = 'products[0][color_id]';
    const expected_product_0_product_id_key = 'products[0][product_id]';
    const expected_product_0_quantity_key = 'products[0][quantity]';
    const expected_product_0_size_id_key = 'products[0][size_id]';
    const expected_product_1_color_id = '2';
    const expected_product_1_product_id = '2';
    const expected_product_1_quantity = '2';
    const expected_product_1_size_id = '2';
    const expected_product_1_color_id_key = 'products[1][color_id]';
    const expected_product_1_product_id_key = 'products[1][product_id]';
    const expected_product_1_quantity_key = 'products[1][quantity]';
    const expected_product_1_size_id_key = 'products[1][size_id]';
    const expectedTotal = '100';
    const expectedData = {
      [expected_product_0_color_id_key]: expected_product_0_color_id,
      [expected_product_0_product_id_key]: expected_product_0_product_id,
      [expected_product_0_quantity_key]: expected_product_0_quantity,
      [expected_product_0_size_id_key]: expected_product_0_size_id,
      [expected_product_1_color_id_key]: expected_product_1_color_id,
      [expected_product_1_product_id_key]: expected_product_1_product_id,
      [expected_product_1_quantity_key]: expected_product_1_quantity,
      [expected_product_1_size_id_key]: expected_product_1_size_id,
      total: expectedTotal,
    };


    beforeAll(() => {
      expectedFormData.append(expected_product_0_color_id_key, expected_product_0_color_id);
      expectedFormData.append(expected_product_0_product_id_key, expected_product_0_product_id);
      expectedFormData.append(expected_product_0_quantity_key, expected_product_0_quantity);
      expectedFormData.append(expected_product_0_size_id_key, expected_product_0_size_id);
      expectedFormData.append(expected_product_1_color_id_key, expected_product_1_color_id);
      expectedFormData.append(expected_product_1_product_id_key, expected_product_1_product_id);
      expectedFormData.append(expected_product_1_quantity_key, expected_product_1_quantity);
      expectedFormData.append(expected_product_1_size_id_key, expected_product_1_size_id);
      expectedFormData.append('total', expectedTotal);
    });

    test('form data validation failed', async () => {
      // Arrange
      const expectedTransformedData = {
        products: [
          { color_id: expected_product_0_color_id, product_id: expected_product_0_product_id, quantity: expected_product_0_quantity, size_id: expected_product_0_size_id },
          { color_id: expected_product_1_color_id, product_id: expected_product_1_product_id, quantity: expected_product_1_quantity, size_id: expected_product_1_size_id },
        ],
        total: expectedTotal,
      };
      const expectedFieldErrors = { total: ['Expected numeric total'] };
      const expectedValidationErrors: Partial<ZodError> = {
        flatten<U>(): typeToFlattenedError<U> {
          return { fieldErrors: expectedFieldErrors } as unknown as typeToFlattenedError<U>;
        },
      };
      const expectedNewState: OrderProductsFormState = {
        errors: expectedFieldErrors,
        message: ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE,
      };
      (mockHeaders as jest.Mock).mockReturnValue(Promise.resolve({
        get: jest.fn().mockReturnValue(expectedOrigin),
      }));
      (MockOrderProductsFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: expectedValidationErrors,
      });
      (mockTransformProductsData as jest.Mock).mockReturnValue(expectedTransformedData);

      // Act
      const actualNewState = await orderProducts(expectedPrevState, expectedFormData);

      // Assert
      expect(actualNewState).toEqual(expectedNewState);
      expect(mockTransformProductsData).toHaveBeenCalledWith(expectedData);
      expect(MockOrderProductsFormSchema.safeParse).toHaveBeenCalledWith(expectedTransformedData);
    });

    test('redirect to stripe', async () => {
      // Arrange
      const expectedCheckoutSessionUrl = 'https://stripe.com/checkout/session/123456789';
      const expectedNumericTotal = 100;
      const expectedTransformedData = {
        products: [
          { color_id: expected_product_0_color_id, product_id: expected_product_0_product_id, quantity: expected_product_0_quantity, size_id: expected_product_0_size_id },
          { color_id: expected_product_1_color_id, product_id: expected_product_1_product_id, quantity: expected_product_1_quantity, size_id: expected_product_1_size_id },
        ],
        total: expectedNumericTotal,
      };
      const expectedStripeSessionConfiguration = {
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: 'usd',
              product_data: {
                name: "Total for clothes: ",
              },
              unit_amount: expectedNumericTotal * 100
            },
          },
        ],
        success_url: `${expectedOrigin}/cart/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${expectedOrigin}/cart`,
        ...STRIPE_SESSION_CREATE_PARAMS,
      };
      (mockHeaders as jest.Mock).mockReturnValue(Promise.resolve({
        get: jest.fn().mockReturnValue(expectedOrigin),
      }));
      const expectedNewState: OrderProductsFormState = {
        url: expectedCheckoutSessionUrl,
      };
      (MockOrderProductsFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: expectedTransformedData,
      });
      (mockTransformProductsData as jest.Mock).mockReturnValue(expectedTransformedData);
      (mockStripe.checkout.sessions.create as jest.Mock).mockReturnValue(({
        url: expectedCheckoutSessionUrl,
      }));

      // Act
      const actualNewState = await orderProducts(expectedPrevState, expectedFormData);

      // Assert
      expect(actualNewState).toEqual(expectedNewState);
      expect(mockTransformProductsData).toHaveBeenCalledWith(expectedData);
      expect(MockOrderProductsFormSchema.safeParse).toHaveBeenCalledWith(expectedTransformedData);
      expect(mockStripe.checkout.sessions.create).toHaveBeenCalledWith(expectedStripeSessionConfiguration);
    });
  });

  describe('submitReview', () => {
    test('validation failed', async () => {
      // Arrange
      const expectedData = {};
      const expectedFormData = new FormData();
      const expectedFieldErrors = { review_title: ['Missing review title'], review_text: ['Missing review text'], rating: ['Missing rating'] };
      const expectedValidationErrors: Partial<ZodError> = {
        flatten<U>(): typeToFlattenedError<U> {
          return { fieldErrors: expectedFieldErrors } as unknown as typeToFlattenedError<U>;
        },
      };
      const expectedNewState: SubmitReviewFormState = {
        errors: expectedFieldErrors,
        message: ADD_REVIEW_MISSING_FIELDS_ERROR_MESSAGE,
      };
      (MockReviewFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: false,
        error: expectedValidationErrors,
      });

      // Act
      const actualNewState = await submitReview(expectedPrevState, expectedFormData);

      // Assert
      expect(actualNewState).toEqual(expectedNewState);
      expect(MockReviewFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
    });

    describe('form validated successfully', () => {
      const expectedReviewTitle = 'title';
      const expectedReviewText = 'text';
      const expectedReviewRating = '5';
      const expectedProductId = '1';
      const expectedData = {
        product_id: expectedProductId,
        review_title: expectedReviewTitle,
        review_text: expectedReviewText,
        rating: expectedReviewRating,
      };
      const expectedFormData = new FormData();
      const expectedReview = {
        product_id: expectedProductId,
        rating: expectedReviewRating,
        review_text: expectedReviewText,
        title: expectedReviewTitle,
      };

      beforeAll(() => {
        expectedFormData.append('product_id', expectedProductId);
        expectedFormData.append('review_title', expectedReviewTitle);
        expectedFormData.append('review_text', expectedReviewText);
        expectedFormData.append('rating', expectedReviewRating);
      });


      test('database error', async () => {
        // Arrange
        const expectedNewState: SubmitReviewFormState = {
          message: FAILED_TO_ADD_REVIEW_ERROR_MESSAGE,
        };
        (MockReviewFormSchema.safeParse as jest.Mock).mockReturnValue({
          success: true,
          data: expectedData,
        });
        (mockAddReview as jest.Mock).mockImplementation(() => {
          throw new Error('Failed to add review');
        });

        // Act
        const actualNewState = await submitReview(expectedPrevState, expectedFormData);

        // Assert
        expect(actualNewState).toEqual(expectedNewState);
        expect(MockReviewFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
        expect(mockAddReview).toHaveBeenCalledWith(expectedReview);
      });

      test('review added', async () => {
        // Arrange
        const expectedNewState = undefined;
        const expectedReview = {
          product_id: expectedProductId,
          rating: expectedReviewRating,
          review_text: expectedReviewText,
          title: expectedReviewTitle,
        };
        (MockReviewFormSchema.safeParse as jest.Mock).mockReturnValue({
          success: true,
          data: expectedData,
        });
        (mockAddReview as jest.Mock).mockResolvedValue(expectedReview);

        // Act
        const actualNewState = await submitReview(expectedPrevState, expectedFormData);

        // Assert
        expect(actualNewState).toEqual(expectedNewState);
        expect(MockReviewFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
        expect(mockAddReview).toHaveBeenCalledWith(expectedReview);
      });
    });
  });
});
