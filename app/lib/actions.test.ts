import { addToCart, AddToCartFormState, orderProducts, OrderProductsFormState } from './actions';
import { typeToFlattenedError, ZodError } from 'zod';
import {
  USER_NOT_LOGGED_IN_MESSAGE,
  ADD_TO_CART_MISSING_FIELDS_ERROR_MESSAGE,
  ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE,
} from './constants';

import { auth as mockAuth } from '@/auth';
import {
  AddToCartFormSchema as MockAddToCartFormSchema,
  OrderProductsFormSchema as MockOrderProductsFormSchema,
} from './form_schemas';
import { createCart as mockCreateCart } from './data';
import { transformProductsData as mockTransformProductsData } from './transformers';
import { headers as mockHeaders } from 'next/headers';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));
jest.mock('./data', () => ({
  createCart: jest.fn(),
}));
jest.mock('./stripe', () => ({}));
jest.mock('next/headers', () => ({
  headers: jest.fn(() => Promise.resolve({
    get: jest.fn(),
  })),
}));
jest.mock('./form_schemas', () => ({
  AddToCartFormSchema: {
    safeParse: jest.fn(),
  },
  OrderProductsFormSchema: {
    safeParse: jest.fn(),
  }
}));
jest.mock('./transformers');

describe('actions', () => {
  describe('addToCart', () => {
    test('user_session is not present', async () => {
      // Arrange
      const expectedUserSession = undefined;
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedNewState: AddToCartFormState = {
        message: USER_NOT_LOGGED_IN_MESSAGE,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
    });
    test('user is not logged in', async () => {
      // Arrange
      const expectedUserSession = {};
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedNewState: AddToCartFormState = {
        message: USER_NOT_LOGGED_IN_MESSAGE,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
    });
    test('user id is not presented', async () => {
      // Arrange
      const expectedUserSession = { user: {} };
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedNewState: AddToCartFormState = {
        message: USER_NOT_LOGGED_IN_MESSAGE,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
    });
    test('form data validation failed', async () => {
      // Arrange
      const expectedUserId = 'uuid-uuid-uuid';
      const expectedUserSession = { user: { id: expectedUserId } };
      const expectedPrevState = undefined;
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
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
      expect(MockAddToCartFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
    });

    test('error creating cart', async () => {
      // Arrange
      const expectedUserId = 'uuid-uuid-uuid';
      const expectedUserSession = { user: { id: expectedUserId } };
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedProductId = '1';
      const expectedDbErrorMessage = 'Failed to create cart';
      expectedFormData.append('product_id', expectedProductId);
      const expectedData = {
        product_id: expectedProductId,
      };
      const expectedParsedData = {
        product_id: expectedProductId,
      };
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
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
      expect(MockAddToCartFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
      expect(mockCreateCart).toHaveBeenCalledWith({ user_id: expectedUserId, ...expectedParsedData });
    });
  });

  describe('orderProducts', () => {
    test('form data validation failed', async () => {
      // Arrange
      const expectedOrigin = 'https://techwear-shop-nextjs.vercel.app/';
      const expectedPrevState = undefined;
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
      const expectedTransformedData = {
        products: [
          { color_id: expected_product_0_color_id, product_id: expected_product_0_product_id, quantity: expected_product_0_quantity, size_id: expected_product_0_size_id },
          { color_id: expected_product_1_color_id, product_id: expected_product_1_product_id, quantity: expected_product_1_quantity, size_id: expected_product_1_size_id },
        ],
        total: expectedTotal,
      };
      const expectedFormData = new FormData();
      expectedFormData.append(expected_product_0_color_id_key, expected_product_0_color_id);
      expectedFormData.append(expected_product_0_product_id_key, expected_product_0_product_id);
      expectedFormData.append(expected_product_0_quantity_key, expected_product_0_quantity);
      expectedFormData.append(expected_product_0_size_id_key, expected_product_0_size_id);
      expectedFormData.append(expected_product_1_color_id_key, expected_product_1_color_id);
      expectedFormData.append(expected_product_1_product_id_key, expected_product_1_product_id);
      expectedFormData.append(expected_product_1_quantity_key, expected_product_1_quantity);
      expectedFormData.append(expected_product_1_size_id_key, expected_product_1_size_id);
      expectedFormData.append('total', expectedTotal);
      const expectedFieldErrors = { products: ['Missing products'], total: ['Missing total'] };
      const expectedValidationErrors: Partial<ZodError> = {
        flatten<U>(): typeToFlattenedError<U> {
          return { fieldErrors: expectedFieldErrors } as unknown as typeToFlattenedError<U>;
        },
      };
      const expectedNewState: OrderProductsFormState = {
        errors: {
          products: ['Missing products'],
          total: ['Missing total'],
        },
        message: ORDER_PRODUCTS_MISSING_FIELDS_ERROR_MESSAGE,
      };
      ((await mockHeaders()).get as jest.Mock).mockReturnValue(expectedOrigin);
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
  });
});
