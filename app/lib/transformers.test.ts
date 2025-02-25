import { transformProductsData } from './transfromers';

describe('transformers', () => {
  describe('transformProductsData', () => {
    test('happy path', () => {
      // Arrange
      const expectedData = {
        'products[0][color_id]': '1',
        'products[0][product_id]': '1',
        'products[0][quantity]': '1',
        'products[0][size_id]': '1',
        'products[1][color_id]': '2',
        'products[1][product_id]': '2',
        'products[1][quantity]': '2',
        'products[1][size_id]': '2',
        total: '100',
      };
      const expectedResult = {
        products: [
          { color_id: '1', product_id: '1', quantity: '1', size_id: '1' },
          { color_id: '2', product_id: '2', quantity: '2', size_id: '2' },
        ],
        total: '100',
      };
      // Act
      const actualResult = transformProductsData(expectedData);
      // Assert
      expect(actualResult).toEqual(expectedResult);
    });
  });
});
