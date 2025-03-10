import Seed from './helpers/seed';
import { fetchAllCategories, fetchAllColors, fetchAllSizes, fetchAllStyles, getTopReviews } from '../data';
import {
  expectedCategories,
  expectedColors,
  expectedSizes,
  expectedStyles,
  expectedTopReviews,
} from './helpers/fixtures';

jest.mock('@/auth', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('data platform test', () => {
  beforeAll(async () => {
    const seed = new Seed();
    await seed.seedAll();
  });

  describe('fetchAllColors', () => {
    it('should return all colors', async () => {
      // Given

      // When
      const actualColors = await fetchAllColors();

      // Then
      expect(actualColors).toEqual(expectedColors);
    });
  });

  describe('fetchAllSizes', () => {
    it('should return all sizes', async () => {
      // Given
      // When
      const actualSizes = await fetchAllSizes();
      // Then
      expect(actualSizes).toEqual(expectedSizes);
    });
  });

  describe('fetchAllStyles', () => {
    it('should return all sizes', async () => {
      // Given
      // When
      const actualStyles = await fetchAllStyles();
      // Then
      expect(actualStyles).toEqual(expectedStyles);
    });
  });

  describe('fetchAllCategories', () => {
    it('should return all sizes', async () => {
      // Given
      // When
      const actualCategories = await fetchAllCategories();
      // Then
      expect(actualCategories).toEqual(expectedCategories);
    });
  });

  describe('getTopReviews', () => {
    it('should return 7 reviews', async () => {
      // Given
      // When
      const actualTopReviews = await getTopReviews();
      // Then
      expect(actualTopReviews).toEqual(expect.arrayContaining(expectedTopReviews));
    });
  });
});
