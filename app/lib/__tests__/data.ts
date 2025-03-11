import Seed from './helpers/seed';
import {
  addReview,
  createUser,
  fetchAllCategories,
  fetchAllColors,
  fetchAllSizes,
  fetchAllStyles,
  fetchProduct, findUser, getAllowCredentials, getPasskeyWithUserId,
  getTopReviews,
} from '../data';
import {
  expectedCategories,
  expectedColors,
  expectedCredId,
  expectedPasskeySerialized1,
  expectedProductIdNapapijri,
  expectedProductNapapijriReturned,
  expectedSizes,
  expectedStyles,
  expectedTopReviews,
  expectedUser,
  expectedUserCredentials,
  expectedUserId,
  expectedUserUsername,
} from './helpers/fixtures';
import { PasskeySerialized, ProductFull, Review, ReviewRaw } from '@/app/lib/definitions';

import { auth as mockAuth } from '@/auth';

jest.mock('@/auth', () => ({
  auth: jest.fn(),
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

  describe('fetchProduct', () => {
    it('should fetch detailed product', async () => {
      // Given

      // When
      const actualProduct: ProductFull = await fetchProduct(expectedProductIdNapapijri);

      // Then
      expect(actualProduct).toEqual(expectedProductNapapijriReturned);
    });
  });

  describe('findUser', () => {
    it('should find user', async () => {
      // Given

      // When
      const actualUser = await findUser(expectedUserUsername);

      // Then
      expect(actualUser).toEqual(expectedUser);
    });
  });

  describe('getAllowCredentials', () => {
    it('should find user along with passkeys', async () => {
      // Given

      // When
      const actualUserWithPasskeys = await getAllowCredentials(expectedUserUsername);

      // Then
      expect(actualUserWithPasskeys).toEqual(expectedUserCredentials);
    });
  });

  describe('createUser', () => {
    it('should create user', async () => {
      // Give
      const expectedUsername = 'test';
      const expectedPasskey: PasskeySerialized = {
        backup_eligible: false,
        backup_status: false,
        counter: 0,
        cred_id: 'some_unique_cred_id',
        cred_public_key: 'pQECAyYgASFYILX-FokseHU7Xp7e_mQLCLM5I_iTeh7oXXD14yNcJe2oIlgg59FEHfw1aTEwcVPZsu5oSHkodL0s1ZsTUpEJzC3uMN4',
        transports: ['internal', 'hybrid']
      };
      const expectedNewUser = expect.objectContaining({
        id: expect.any(String),
        username: expectedUsername,
        created_at: expect.any(Date),
      });

      // When
      const actualUser = await createUser(expectedUsername, expectedPasskey);

      // Then
      expect(actualUser).toEqual(expectedNewUser);
    });
  });

  describe('getPasskeyWithUserId', () => {
    it('should find passkey with user id', async () => {
      // Given

      // When
      const actualPasskey = await getPasskeyWithUserId(expectedCredId, expectedUserId);

      // Then
      expect(actualPasskey).toEqual(expectedPasskeySerialized1);
    });
  });

  describe('addReview', () => {
    it('should add review', async () => {
      // Given
      const expectedReviewText = 'This is a review';
      const expectedReviewTitle = 'Nice product';
      const expectedRating = 5;
      const expectedReview: ReviewRaw = {
        product_id: expectedProductIdNapapijri,
        rating: expectedRating,
        review_text: expectedReviewText,
        title: expectedReviewTitle,
      };
      const expectedAddedReview = expect.objectContaining({
        id: expect.any(Number),
        product_id: expectedProductIdNapapijri,
        rating: expectedRating,
        review_text: expectedReviewText,
        title: expectedReviewTitle,
        created_at: expect.any(Date),
      });
      (mockAuth as jest.Mock).mockResolvedValue({ user: { id: expectedUserId } });

      // When
      const actualReview: Review = await addReview(expectedReview);

      // Then
      expect(actualReview).toEqual(expectedAddedReview);
    });
  });
});
