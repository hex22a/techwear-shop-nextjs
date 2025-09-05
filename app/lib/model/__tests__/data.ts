import Seed from './helpers/seed';
import {
  fetchAllCategories,
  fetchAllColors,
  fetchAllSizes,
  fetchAllStyles,

} from '../data/common';
import {
  expectedCategories,
  expectedColorHexValueRed,
  expectedColorHumanReadableValueRed,
  expectedColorIdRed,
  expectedColors,
  expectedCredId,
  expectedPasskeySerialized1,
  expectedProductDiscountPercentNapapijri,
  expectedProductIdMastrumBomber,
  expectedProductIdNapapijri,
  expectedProductMastrumBomberReturned,
  expectedProductNameNapapijri, expectedProductNapapijriMin,
  expectedProductNapapijriReturned,
  expectedProductPhotoUrlNapapijri,
  expectedProductPriceNapapijri,
  expectedSizeIdM,
  expectedSizes,
  expectedSizeSizeM,
  expectedSizeValueM,
  expectedStyles,
  expectedTopReviews,
  expectedUser,
  expectedUserCredentials,
  expectedUserId,
  expectedUserUsername,
} from './helpers/fixtures';
import {
  Cart,
  CartSubmission,
  PasskeySerialized,
  ProductComplete,
  ReviewComplete,
  Review,
  Product,
} from '@/app/lib/definitions';

import { auth as mockAuth } from '@/auth';
import { fetchProduct, findProductsFts } from '@/app/lib/model/data/product';
import { createUser, findUser, getAllowCredentials, getPasskeyWithUserId } from '@/app/lib/model/data/user';
import { createCart, getCart } from '@/app/lib/model/data/cart';
import { addReview, getTopReviews } from '@/app/lib/model/data/review';

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
    it('should fetch detailed product with reviews', async () => {
      // Given

      // When
      const actualProduct: ProductComplete = await fetchProduct(expectedProductIdNapapijri);

      // Then
      expect(actualProduct).toEqual(expectedProductNapapijriReturned);
    });

    it('should fetch detailed product w/o reviews', async () => {
      // Given

      // When
      const actualProduct: ProductComplete = await fetchProduct(expectedProductIdMastrumBomber);

      // Then
      expect(actualProduct).toEqual(expectedProductMastrumBomberReturned);
    });
  });

  describe('findProductsFts', () => {
    it('shall fetch Napapijri product when searching for nap', async () => {
      // Given
      const expectedSearchText = 'Napapijri';

      // When
      const actualProducts: Product[] = await findProductsFts(expectedSearchText);

      // Then
      expect(actualProducts).toEqual([expectedProductNapapijriMin]);
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
      const expectedReview: Review = {
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
      const actualReview: ReviewComplete = await addReview(expectedReview);

      // Then
      expect(actualReview).toEqual(expectedAddedReview);
    });
  });

  describe('createCart', () => {
    it('should create cart', async () => {
      // Given
      const expectedCart: CartSubmission = {
        color_id: expectedColorIdRed,
        product_id: expectedProductIdNapapijri,
        quantity: 1,
        size_id: expectedSizeIdM,
        user_id: expectedUserId
      };

      // When
      const actualCart = await createCart(expectedCart);

      // Then
      expect(actualCart).toEqual(expectedCart);
    });
  });

  describe('getCart', () => {
    it('should get cart for user', async () => {
      // Given
      const expectedCart: Cart = {
        products: [{
          id: expectedProductIdNapapijri,
          name: expectedProductNameNapapijri,
          price: expectedProductPriceNapapijri,
          discount_percent: expectedProductDiscountPercentNapapijri,
          photo_url: expectedProductPhotoUrlNapapijri,
          quantity: 1,
          color_id: expectedColorIdRed,
          color_hex_value: expectedColorHexValueRed,
          color_human_readable_value: expectedColorHumanReadableValueRed,
          size: expectedSizeSizeM,
          size_id: expectedSizeIdM,
          size_value: expectedSizeValueM,
        }],
        summary: {
          deliveryFee: 15,
          discount: 0,
          subtotal: 450,
          total: 465,
        },
        user_id: expectedUserId,
      };

      // When
      const actualCart = await getCart(expectedUserId);

      // Then
      expect(actualCart).toEqual(expectedCart);
    });
  });
});
