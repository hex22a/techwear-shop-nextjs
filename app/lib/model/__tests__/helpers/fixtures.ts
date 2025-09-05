import {
  AllowCredentials,
  Category,
  Color,
  PasskeySerialized,
  Photo,
  Product,
  ProductComplete,
  ReviewComplete,
  ReviewRow,
  Size,
  Style,
  User,
  UserCredentials,
} from '@/app/lib/definitions';
import { AuthenticatorTransportFuture } from '@simplewebauthn/server';

export const expectedUserId = '1d34ef0e-08cd-4439-9017-894d45074c0a';

const expectedUserCreatedAt = new Date("2025-09-29T09:52:52.000Z");
const expectedReviewCreatedAt = new Date("2025-10-20T09:52:52.000Z");
const expectedPasskeyCreatedAt = new Date("2025-11-20T09:52:52.000Z");
const expectedPasskeyLastUsed = new Date("2025-12-20T09:52:52.000Z");
export const expectedUserUsername = 'crash';

export const expectedUser: User = {
  id: expectedUserId,
  username: expectedUserUsername,
  created_at: expectedUserCreatedAt,
};

export const expectedCredId = 'some_cred_id';
const expectedCredTransports: AuthenticatorTransportFuture[] = ['hybrid'];

export const expectedPasskeySerialized1: PasskeySerialized = {
  backup_eligible: false,
  backup_status: false,
  counter: 0,
  created_at: expectedPasskeyCreatedAt,
  cred_id: expectedCredId,
  cred_public_key: 'pQECAyYgASFYILX-FokseHU7Xp7e_mQLCLM5I_iTeh7oXXD14yNcJe2oIlgg59FEHfw1aTEwcVPZsu5oSHkodL0s1ZsTUpEJzC3uMN4',
  internal_user_id: expectedUserId,
  last_used: expectedPasskeyLastUsed,
  transports: expectedCredTransports,
  webauthn_user_id: 'some_webauthn_user_id',
};

const expectedAllowCredential1: AllowCredentials = {
  id: expectedCredId,
  transports: expectedCredTransports,
};

export const expectedPasskeys = [expectedPasskeySerialized1];

export const expectedUserCredentials: UserCredentials = {
  passkeys: new Map([expectedAllowCredential1].map((passkey) => [passkey.id, passkey])),
};

export const expectedUsers: User[] = [
  expectedUser,
];

const expectedCategoryJackets: Category = {
  id: 1,
  name: 'Jackets',
};
const expectedCategoryPants: Category = {
  id: 2,
  name: 'Pants',
};
export const expectedCategories: Category[] = [
  expectedCategoryJackets,
  expectedCategoryPants,
];

const expectedColorGreen: Color = {
  id: 1,
  hex_value: '00C12B',
  human_readable_value: 'Green',
};
export const expectedColorIdRed = 2;
export const expectedColorHexValueRed = 'F50606';
export const expectedColorHumanReadableValueRed = 'Red';
const expectedColorRed: Color = {
  id: expectedColorIdRed,
  hex_value: expectedColorHexValueRed,
  human_readable_value: expectedColorHumanReadableValueRed,
};
const expectedColorYellow: Color = {
  id: 3,
  hex_value: 'F5DD06',
  human_readable_value: 'Yellow',
};
const expectedColorOrange: Color = {
  id: 4,
  hex_value: 'F57906',
  human_readable_value: 'Orange',
};
const expectedColorCyan: Color = {
  id: 5,
  hex_value: '06CAF5',
  human_readable_value: 'Cyan',
};
const expectedColorBlue: Color = {
  id: 6,
  hex_value: '063AF5',
  human_readable_value: 'Blue',
};
const expectedColorPurple: Color = {
  id: 7,
  hex_value: '7D06F5',
  human_readable_value: 'Purple',
};
const expectedColorPink: Color = {
  id: 8,
  hex_value: 'F506A4',
  human_readable_value: 'Pink',
};
const expectedColorWhite: Color = {
  id: 9,
  hex_value: 'EEEEEE',
  human_readable_value: 'White',
};
export const expectedProductDiscountPercentNapapijri = 10;
const expectedColorBlack: Color = {
  id: 10,
  hex_value: '000000',
  human_readable_value: 'Black',
};
export const expectedColors: Color[] = [
  expectedColorGreen,
  expectedColorRed,
  expectedColorYellow,
  expectedColorOrange,
  expectedColorCyan,
  expectedColorBlue,
  expectedColorPurple,
  expectedColorPink,
  expectedColorWhite,
  expectedColorBlack,
];

const expectedStyleCasual: Style = {
  id: 1,
  name: 'Casual',
};
const expectedStyleFormal: Style = {
  id: 2,
  name: 'Formal',
};
const expectedStyleOutdoor: Style = {
  id: 3,
  name: 'Outdoor',
};
const expectedStyleParty: Style = {
  id: 4,
  name: 'Party',
};
export const expectedStyles: Style[] = [
  expectedStyleCasual,
  expectedStyleFormal,
  expectedStyleOutdoor,
  expectedStyleParty,
];

const expectedSizeXxs: Size = {
  id: 1,
  size: 'XX-Small',
  value: 'xxs',
};
const expectedSizeXs: Size = {
  id: 2,
  size: 'X-Small',
  value: 'xs',
};
const expectedSizeS: Size = {
  id: 3,
  size: 'Small',
  value: 's',
};
export const expectedSizeIdM = 4;
export const expectedSizeSizeM = 'Medium';
export const expectedSizeValueM = 'm';
const expectedSizeM: Size = {
  id: expectedSizeIdM,
  size: expectedSizeSizeM,
  value: expectedSizeValueM,
};
const expectedSizeL: Size = {
  id: 5,
  size: 'Large',
  value: 'l',
};
const expectedSizeXl: Size = {
  id: 6,
  size: 'X-Large',
  value: 'xl',
};
const expectedSizeXxl: Size = {
  id: 7,
  size: 'XX-Large',
  value: 'xxl',
};
const expectedSize3xl: Size = {
  id: 8,
  size: '3X-Large',
  value: '3xl',
};
const expectedSize4xl: Size = {
  id: 9,
  size: '4X-Large',
  value: '4xl',
};
export const expectedSizes: Size[] = [
  expectedSizeXxs,
  expectedSizeXs,
  expectedSizeS,
  expectedSizeM,
  expectedSizeL,
  expectedSizeXl,
  expectedSizeXxl,
  expectedSize3xl,
  expectedSize4xl,
];

const expectedPhotoNapapijri1: Photo = {
  id: 1,
  url: '/items/NA4I5F176-ALT1.webp',
};
const expectedPhotoNapapijri2: Photo = {
  id: 2,
  url: '/items/NA4I5F176-ALT2.webp',
};
const expectedPhotoNapapijri3: Photo = {
  id: 3,
  url: '/items/NA4I5F176-ALT3.webp',
};
const expectedProductPhotoUrlMastrumBomber = '/items/mastrum.jpg';
const expectedPhotoMastrumBomber1: Photo = {
  id: 4,
  url: expectedProductPhotoUrlMastrumBomber,
};
const expectedPhotoMastrumBomber2: Photo = {
  id: 5,
  url: expectedProductPhotoUrlMastrumBomber,
};
const expectedPhotoMastrumBomber3: Photo = {
  id: 6,
  url: expectedProductPhotoUrlMastrumBomber,
};

export const expectedProductIdNapapijri = 1;

export const expectedProductNameNapapijri = 'Skidoo 2.0 Anorak Jacket';
export const expectedProductPriceNapapijri = 500;
export const expectedProductPhotoUrlNapapijri = '/items/napa-anor.webp';
const expectedProductDescriptionNapapijri = 'A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made in stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian flag patch, and the iconic front flap pocket complete with our signature Napapijri Geographic graphic.';
export const expectedProductNapapijri: ProductComplete = {
  id: expectedProductIdNapapijri,
  colors: new Map([expectedColorRed, expectedColorBlue, expectedColorPurple].map((color) => [color.id, color])),
  description: expectedProductDescriptionNapapijri,
  details: expectedProductDescriptionNapapijri,
  discount: { newPrice: 450, percent: expectedProductDiscountPercentNapapijri },
  photos: new Map([expectedPhotoNapapijri1, expectedPhotoNapapijri2, expectedPhotoNapapijri3].map((photo) => [photo.id, photo])),
  reviews: new Map(),
  sizes: new Map([expectedSizeXs, expectedSizeM, expectedSizeL].map((size) => [size.id, size])),
  average_rating: 0,
  name: expectedProductNameNapapijri,
  photo_url: expectedProductPhotoUrlNapapijri,
  price: expectedProductPriceNapapijri,
  category: expectedCategoryJackets,
  style: expectedStyleCasual,
};
export const expectedProductNapapijriMin: Product = {
  id: expectedProductIdNapapijri,
  name: expectedProductNameNapapijri,
  photo_url: expectedProductPhotoUrlNapapijri,
  price: expectedProductPriceNapapijri,
  average_rating: 4.5,
  discount: { newPrice: 450, percent: expectedProductDiscountPercentNapapijri },
};

export const expectedProductIdMastrumBomber = 2;

const expectedProductDescriptionMastrumBomber = 'MA.STRUM Bomber Jacket';
const expectedProductDetailsMastrumBomber = 'MA.STRUM Bomber Jacket';
const expectedProductNameMastrumBomber = 'MA.STRUM Bomber Jacket';

export const expectedProductMastrumBomber: ProductComplete = {
  id: expectedProductIdMastrumBomber,
  colors: new Map([expectedColorRed, expectedColorPurple].map((color) => [color.id, color])),
  description: expectedProductDescriptionMastrumBomber,
  details: expectedProductDetailsMastrumBomber,
  photos: new Map([expectedPhotoMastrumBomber1, expectedPhotoMastrumBomber2, expectedPhotoMastrumBomber3].map((photo) => [photo.id, photo])),
  reviews: new Map(),
  sizes: new Map([expectedSizeXs, expectedSizeS].map((size) => [size.id, size])),
  average_rating: 0,
  name: expectedProductNameMastrumBomber,
  photo_url: expectedProductPhotoUrlMastrumBomber,
  price: 150,
  category: expectedCategoryJackets,
  style: expectedStyleCasual,
};

export const expectedProducts: ProductComplete[] = [
  expectedProductNapapijri,
  expectedProductMastrumBomber,
];


const expectedNegativeReviewTitle = 'Awful Jacket';
const expectedNegativeReviewText = 'Very bad product. 1/10';

const expectedPositiveReviewTitle = 'Great Jacket';
const expectedPositiveReviewText = 'Great Product! Simply the best jacket I have ever seen. 10/10';

const expectedReviewIdNapapijri1 = 1;
const expectedReviewIdNapapijri2 = 2;
const expectedReviewIdNapapijri3 = 3;
const expectedReviewIdNapapijri4 = 4;
const expectedReviewIdNapapijri5 = 5;
const expectedReviewIdNapapijri6 = 6;
const expectedReviewIdNapapijri7 = 7;
const expectedReviewIdNapapijri8 = 8;

const expectedNegativeRating = 1;
const expectedPositiveRating = 5;

const expectedReviewRowNapapijri1: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: expectedReviewIdNapapijri1,
  product_id: expectedProductIdNapapijri,
  rating: expectedNegativeRating,
  title: expectedNegativeReviewTitle,
  review: expectedNegativeReviewText,
  verified: true,
};
const expectedReviewNapapijri1: ReviewComplete = {
  id: expectedReviewIdNapapijri1,
  product_id: expectedProductIdNapapijri,
  rating: expectedNegativeRating,
  title: expectedNegativeReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedNegativeReviewText
};

const expectedReviewRowNapapijri2: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: expectedReviewIdNapapijri2,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri2: ReviewComplete = {
  id: expectedReviewIdNapapijri2,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};
const expectedReviewRowNapapijri3: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: expectedReviewIdNapapijri3,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri3: ReviewComplete = {
  id: expectedReviewIdNapapijri3,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};
const expectedReviewRowNapapijri4: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: 4,
  product_id: expectedProductIdNapapijri,
  rating: 5,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri4: ReviewComplete = {
  id: expectedReviewIdNapapijri4,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};
const expectedReviewRowNapapijri5: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: 5,
  product_id: expectedProductIdNapapijri,
  rating: 5,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri5: ReviewComplete = {
  id: expectedReviewIdNapapijri5,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};

const expectedReviewRowNapapijri6: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: 6,
  product_id: expectedProductIdNapapijri,
  rating: 5,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri6: ReviewComplete = {
  id: expectedReviewIdNapapijri6,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};
const expectedReviewRowNapapijri7: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: 7,
  product_id: expectedProductIdNapapijri,
  rating: 5,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri7: ReviewComplete = {
  id: expectedReviewIdNapapijri7,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};
const expectedReviewRowNapapijri8: ReviewRow = {
  author_id: expectedUserId,
  created_at: expectedReviewCreatedAt,
  id: 8,
  product_id: expectedProductIdNapapijri,
  rating: 5,
  title: expectedPositiveReviewTitle,
  review: expectedPositiveReviewText,
  verified: true,
};
const expectedReviewNapapijri8: ReviewComplete = {
  id: expectedReviewIdNapapijri8,
  product_id: expectedProductIdNapapijri,
  rating: expectedPositiveRating,
  title: expectedPositiveReviewTitle,
  verified: true,
  created_at: expectedReviewCreatedAt,
  author: expectedUserUsername,
  review_text: expectedPositiveReviewText
};

export const expectedReviews: ReviewRow[] = [
  expectedReviewRowNapapijri1,
  expectedReviewRowNapapijri2,
  expectedReviewRowNapapijri3,
  expectedReviewRowNapapijri4,
  expectedReviewRowNapapijri5,
  expectedReviewRowNapapijri6,
  expectedReviewRowNapapijri7,
  expectedReviewRowNapapijri8,
];

export const expectedTopReviews: ReviewComplete[] = [
  expectedReviewNapapijri2,
  expectedReviewNapapijri3,
  expectedReviewNapapijri4,
  expectedReviewNapapijri5,
  expectedReviewNapapijri6,
  expectedReviewNapapijri7,
  expectedReviewNapapijri8,
];

export const expectedNapapijriReviews: ReviewComplete[] = [
  expectedReviewNapapijri1,
  expectedReviewNapapijri2,
  expectedReviewNapapijri3,
  expectedReviewNapapijri4,
  expectedReviewNapapijri5,
  expectedReviewNapapijri6,
  expectedReviewNapapijri7,
  expectedReviewNapapijri8,
];

export const expectedProductNapapijriReturned: ProductComplete = {
  id: expectedProductIdNapapijri,
  colors: new Map([expectedColorRed, expectedColorBlue, expectedColorPurple].map((color) => [color.id, color])),
  description: expectedProductDescriptionNapapijri,
  details: expectedProductDescriptionNapapijri,
  discount: { newPrice: 450, percent: expectedProductDiscountPercentNapapijri },
  photos: new Map([expectedPhotoNapapijri1, expectedPhotoNapapijri2, expectedPhotoNapapijri3].map((photo) => [photo.id, photo])),
  reviews: new Map(expectedNapapijriReviews.map(review => [review.id, review])),
  sizes: new Map([expectedSizeXs, expectedSizeM, expectedSizeL].map((size) => [size.id, size])),
  average_rating: 4.5,
  name: expectedProductNameNapapijri,
  photo_url: expectedProductPhotoUrlNapapijri,
  price: expectedProductPriceNapapijri,
};

export const expectedProductMastrumBomberReturned: ProductComplete = {
  id: expectedProductIdMastrumBomber,
  colors: new Map([expectedColorRed, expectedColorPurple].map((color) => [color.id, color])),
  description: expectedProductDescriptionMastrumBomber,
  details: expectedProductDetailsMastrumBomber,
  photos: new Map([expectedPhotoMastrumBomber1, expectedPhotoMastrumBomber2, expectedPhotoMastrumBomber3].map((photo) => [photo.id, photo])),
  reviews: new Map(),
  sizes: new Map([expectedSizeXs, expectedSizeS].map((size) => [size.id, size])),
  average_rating: 0,
  name: expectedProductNameMastrumBomber,
  photo_url: expectedProductPhotoUrlMastrumBomber,
  price: 150,
};
