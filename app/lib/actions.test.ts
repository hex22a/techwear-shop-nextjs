// import { describe, expect, jest, test } from '@jest/globals';
import { addToCart, AddToCartFormState } from './actions';
import { USER_NOT_LOGGED_IN_MESSAGE } from './constants';

import { auth as mockAuth } from '@/auth';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
}));
jest.mock('./data', () => ({}));
jest.mock('./stripe', () => ({}));
jest.mock('next/headers')

describe('actions', () => {
  describe('addToCart', () => {
    test('when user is not logged in', async () => {
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
  });
});
