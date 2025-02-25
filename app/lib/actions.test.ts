import { addToCart, AddToCartFormState } from './actions';
import { typeToFlattenedError, ZodError } from 'zod';
import { USER_NOT_LOGGED_IN_MESSAGE, VALIDATION_FAILED_ERROR_MESSAGE } from './constants';

import { auth as mockAuth } from '@/auth';
import { AddToCartFormSchema as MockAddToCartFormSchema } from './form_schemas';
import { createCart as mockCreateCart } from './data';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));
jest.mock('./data', () => ({
  createCart: jest.fn(),
}));
jest.mock('./stripe', () => ({}));
jest.mock('next/headers');
jest.mock('./form_schemas', () => ({
  AddToCartFormSchema: {
    safeParse: jest.fn(),
  },
}))

describe('actions', () => {
  describe('addToCart', () => {
    test('user_session is not present', async () => {
      // Arrange
      const expectedUserSession = undefined
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedNewState: AddToCartFormState = {
        message: USER_NOT_LOGGED_IN_MESSAGE,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession)
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
    });
    test('user is not logged in', async () => {
      // Arrange
      const expectedUserSession = {}
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedNewState: AddToCartFormState = {
        message: USER_NOT_LOGGED_IN_MESSAGE,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession)
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
    });
    test('user id is not presented', async () => {
      // Arrange
      const expectedUserSession = { user: {} }
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedNewState: AddToCartFormState = {
        message: USER_NOT_LOGGED_IN_MESSAGE,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession)
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
    });
    test('form data validation failed', async () => {
      // Arrange
      const expectedUserId = 'uuid-uuid-uuid';
      const expectedUserSession = { user: { id: expectedUserId } }
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedProductId = '-1';
      expectedFormData.append('product_id', expectedProductId);
      const expectedData = {
        product_id: expectedProductId,
      }
      const expectedFieldErrors = { product_id: ['Wrong product id'] };
      const expectedValidationErrors: Partial<ZodError> = {
        flatten<U>(): typeToFlattenedError<U> {
          return { fieldErrors: expectedFieldErrors } as unknown as typeToFlattenedError<U>;
        },
      };
      const expectedNewState: AddToCartFormState = {
        errors: expectedFieldErrors,
        message: VALIDATION_FAILED_ERROR_MESSAGE,
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
      const expectedUserSession = { user: { id: expectedUserId } }
      const expectedPrevState = undefined;
      const expectedFormData = new FormData();
      const expectedProductId = '1';
      const expectedDbErrorMessage = 'Failed to create cart';
      expectedFormData.append('product_id', expectedProductId);
      const expectedData = {
        product_id: expectedProductId,
      }
      const expectedParsedData = {
        product_id: expectedProductId,
      }
      const expectedNewState: AddToCartFormState = {
        message: expectedDbErrorMessage,
      };
      (mockAuth as jest.Mock).mockReturnValue(expectedUserSession);
      (MockAddToCartFormSchema.safeParse as jest.Mock).mockReturnValue({
        success: true,
        data: expectedParsedData,
      });
      (mockCreateCart as jest.Mock).mockImplementation(() => {
        throw new Error(expectedDbErrorMessage) })
      // Act
      const actualNewState = await addToCart(expectedPrevState, expectedFormData);
      // Assert
      expect(actualNewState).toEqual(expectedNewState);
      expect(MockAddToCartFormSchema.safeParse).toHaveBeenCalledWith(expectedData);
      expect(mockCreateCart).toHaveBeenCalledWith({ user_id: expectedUserId, ...expectedParsedData });
    })
  });
});
