import { Product, ProductComplete } from '@/app/lib/definitions';
import { filterToProductFullProperties, filterToProductThumbnailProperties } from '@/app/lib/model/data/product';
import { expectedProductNapapijri, expectedProductNapapijriMin } from '@/app/lib/model/__tests__/helpers/fixtures';

describe('helper functions tests', () => {
  describe('filterToProductFullProperties', () => {
    test('source object has extra fields', () => {
      // Arrange
      const expectedSourceObject = Object.assign({ foo: 'bar' }, expectedProductNapapijri);

      // Act
      const actualProductComplete: ProductComplete = filterToProductFullProperties(expectedSourceObject);

      // Assert
      expect(actualProductComplete).toEqual(expectedProductNapapijri);
    });

    test('source object has missing fields', () => {
      // Arrange
      const { sizes, ...expectedSourceObject } = expectedProductNapapijri;

      // Act
      const actualProductComplete: ProductComplete = filterToProductFullProperties(expectedSourceObject);

      // Assert
      expect(actualProductComplete).toEqual(expectedSourceObject);
    });
  });

  describe('filterToProductThumbnailProperties', () => {
    test('source object has extra fields', () => {
      // Arrange
      const expectedSourceObject = Object.assign({ foo: 'bar' }, expectedProductNapapijriMin);

      // Act
      const actualProduct: Product = filterToProductThumbnailProperties(expectedSourceObject);

      // Assert
      expect(actualProduct).toEqual(expectedProductNapapijriMin);
    });

    test('source object has missing fields', () => {
      // Arrange
      const { photo_url, ...expectedSourceObject } = expectedProductNapapijriMin;

      // Act
      const actualProduct: Product = filterToProductThumbnailProperties(expectedSourceObject);

      // Assert
      expect(actualProduct).toEqual(expectedSourceObject);
    });
  });
});
