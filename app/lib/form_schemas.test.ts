import {
  AddToCartFormSchema,
  EMPTY_PRODUCTS_ARRAY_ERROR_MESSAGE, MAX_QUANTITY, MIN_QUANTITY, MIN_TOTAL,
  MISSING_COLOR_ID_ERROR_MESSAGE,
  MISSING_SIZE_ID_ERROR_MESSAGE,
  NEGATIVE_PRODUCT_ID_ERROR_MESSAGE,
  OrderProductsFormSchema,
} from './form_schemas';

describe('form schemas', () => {
  const expectedNotANumberErrorMessage = 'Invalid input: expected number, received NaN';
  const expectedGtErrorMessage = 'Too small: expected number to be >=';
  const expectedLtErrorMessage = 'Too big: expected number to be <=';

  describe('AddToCartFormSchema', () => {

    test('empty form data', () => {
      // Arrange
      const expectedValidationErrors = {
        color_id: [MISSING_COLOR_ID_ERROR_MESSAGE],
        product_id: [expectedNotANumberErrorMessage],
        quantity: [expectedNotANumberErrorMessage],
        size_id: [MISSING_SIZE_ID_ERROR_MESSAGE],
      };
      const expectedData = {};
      // Act
      const actualValidationResult = AddToCartFormSchema.safeParse(expectedData);
      // Assert
      expect(actualValidationResult.success).toBe(false);
      expect(actualValidationResult.error?.flatten().fieldErrors).toEqual(expectedValidationErrors);
    });

    test('negative product_id', () => {
      // Arrange
      const expectedValidationErrors = {
        color_id: [MISSING_COLOR_ID_ERROR_MESSAGE],
        product_id: [NEGATIVE_PRODUCT_ID_ERROR_MESSAGE],
        quantity: [expectedNotANumberErrorMessage],
        size_id: [MISSING_SIZE_ID_ERROR_MESSAGE],
      };
      const expectedData = {
        product_id: '-1',
      };
      // Act
      const actualValidationResult = AddToCartFormSchema.safeParse(expectedData);
      // Assert
      expect(actualValidationResult.success).toBe(false);
      expect(actualValidationResult.error?.flatten().fieldErrors).toEqual(expectedValidationErrors);
    });

    test('zero quantity', () => {
      // Arrange
      const expectedQuantityValidationErrorMessage = expectedGtErrorMessage + MIN_QUANTITY;
      const expectedValidationErrors = {
        color_id: [MISSING_COLOR_ID_ERROR_MESSAGE],
        product_id: [expectedNotANumberErrorMessage],
        quantity: [expectedQuantityValidationErrorMessage],
        size_id: [MISSING_SIZE_ID_ERROR_MESSAGE],
      };
      const expectedData = {
        quantity: '0',
      };
      // Act
      const actualValidationResult = AddToCartFormSchema.safeParse(expectedData);
      // Assert
      expect(actualValidationResult.success).toBe(false);
      expect(actualValidationResult.error?.flatten().fieldErrors).toEqual(expectedValidationErrors);
    });


    test('quantity 101', () => {
      // Arrange
      const expectedQuantityValidationErrorMessage = expectedLtErrorMessage + MAX_QUANTITY;
      const expectedValidationErrors = {
        color_id: [MISSING_COLOR_ID_ERROR_MESSAGE],
        product_id: [expectedNotANumberErrorMessage],
        quantity: [expectedQuantityValidationErrorMessage],
        size_id: [MISSING_SIZE_ID_ERROR_MESSAGE],
      };
      const expectedData = {
        quantity: '101',
      };
      // Act
      const actualValidationResult = AddToCartFormSchema.safeParse(expectedData);
      // Assert
      expect(actualValidationResult.success).toBe(false);
      expect(actualValidationResult.error?.flatten().fieldErrors).toEqual(expectedValidationErrors);
    });
  });

  describe('OrderProductsFormSchema', () => {
    test('empty form data', () => {
      // Arrange
      const expectedValidationErrors = {
        products: [EMPTY_PRODUCTS_ARRAY_ERROR_MESSAGE],
        total: [expectedNotANumberErrorMessage],
      };
      const expectedData = {};
      // Act
      const actualValidationResult = OrderProductsFormSchema.safeParse(expectedData);
      // Assert
      expect(actualValidationResult.success).toBe(false);
      expect(actualValidationResult.error?.flatten().fieldErrors).toEqual(expectedValidationErrors);
    });
    test('negative total', () => {
      // Arrange
      const expectedTotalValidationErrorMessage = expectedGtErrorMessage + MIN_TOTAL;
      const expectedValidationErrors = {
        products: [EMPTY_PRODUCTS_ARRAY_ERROR_MESSAGE],
        total: [expectedTotalValidationErrorMessage],
      };
      const expectedData = {
        total: '-1',
      };
      // Act
      const actualValidationResult = OrderProductsFormSchema.safeParse(expectedData);
      // Assert
      expect(actualValidationResult.success).toBe(false);
      expect(actualValidationResult.error?.flatten().fieldErrors).toEqual(expectedValidationErrors);
    });
  });
});
