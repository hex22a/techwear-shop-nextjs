import { transformProductsData } from './transformers';

describe('transformers', () => {
  describe('transformProductsData', () => {
    test('happy path', () => {
      // Arrange
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
      // Act
      const actualTransformedData = transformProductsData(expectedData);
      // Assert
      expect(actualTransformedData).toEqual(expectedTransformedData);
    });
  });
});
