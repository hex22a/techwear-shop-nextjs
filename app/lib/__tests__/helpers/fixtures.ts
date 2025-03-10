import { Category, Color, Photo, ProductFull, Review, ReviewRow, Size, Style, User } from '@/app/lib/definitions';

const expectedUserId = '1d34ef0e-08cd-4439-9017-894d45074c0a';

const expectedUserCreatedAt = new Date("2025-09-29T09:52:52.000Z");
const expectedReviewCreatedAt = new Date("2025-10-20T09:52:52.000Z");
const expectedUserUsername = 'crash';

export const expectedUser: User = {
  id: expectedUserId,
  username: expectedUserUsername,
  created_at: expectedUserCreatedAt,
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
const expectedColorRed: Color = {
  id: 2,
  hex_value: 'F50606',
  human_readable_value: 'Red',
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
const expectedSizeM: Size = {
  id: 4,
  size: 'Medium',
  value: 'm',
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
const expectedPhotoMastrumBomber1: Photo = {
  id: 4,
  url: '/items/mastrum.jpg',
};
const expectedPhotoMastrumBomber2: Photo = {
  id: 5,
  url: '/items/mastrum.jpg',
};
const expectedPhotoMastrumBomber3: Photo = {
  id: 6,
  url: '/items/mastrum.jpg',
};

export const expectedProductIdNapapijri = 1;

export const expectedProductNapapijri: ProductFull = {
  id: expectedProductIdNapapijri,
  colors: new Map([expectedColorRed, expectedColorBlue, expectedColorPurple].map((color) => [color.id, color])),
  description: 'A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made in stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian flag patch, and the iconic front flap pocket complete with our signature Napapijri Geographic graphic.',
  details: 'A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made in stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian flag patch, and the iconic front flap pocket complete with our signature Napapijri Geographic graphic.',
  discount: { newPrice: 450, percent: 10 },
  photos: new Map([expectedPhotoNapapijri1, expectedPhotoNapapijri2, expectedPhotoNapapijri3].map((photo) => [photo.id, photo])),
  reviews: new Map(),
  sizes: new Map([expectedSizeXs, expectedSizeM, expectedSizeL].map((size) => [size.id, size])),
  average_rating: 0,
  name: 'Skidoo 2.0 Anorak Jacket',
  photo_url: '/items/napa-anor.webp',
  price: 500,
  category: expectedCategoryJackets,
  style: expectedStyleCasual,
};

export const expectedProductMastrumBomber: ProductFull = {
  id: 2,
  colors: new Map([expectedColorRed, expectedColorPurple].map((color) => [color.id, color])),
  description: 'MA.STRUM Bomber Jacket',
  details: 'MA.STRUM Bomber Jacket',
  photos: new Map([expectedPhotoMastrumBomber1, expectedPhotoMastrumBomber2, expectedPhotoMastrumBomber3].map((photo) => [photo.id, photo])),
  reviews: new Map(),
  sizes: new Map([expectedSizeXs, expectedSizeS].map((size) => [size.id, size])),
  average_rating: 0,
  name: 'MA.STRUM Bomber Jacket',
  photo_url: '/items/mastrum.jpg',
  price: 150,
  category: expectedCategoryJackets,
  style: expectedStyleCasual,
};

export const expectedProducts: ProductFull[] = [
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
const expectedReviewNapapijri1: Review = {
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
const expectedReviewNapapijri2: Review = {
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
const expectedReviewNapapijri3: Review = {
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
const expectedReviewNapapijri4: Review = {
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
const expectedReviewNapapijri5: Review = {
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
const expectedReviewNapapijri6: Review = {
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
const expectedReviewNapapijri7: Review = {
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
const expectedReviewNapapijri8: Review = {
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

export const expectedTopReviews: Review[] = [
  expectedReviewNapapijri2,
  expectedReviewNapapijri3,
  expectedReviewNapapijri4,
  expectedReviewNapapijri5,
  expectedReviewNapapijri6,
  expectedReviewNapapijri7,
  expectedReviewNapapijri8,
];

export const expectedNapapijriReviews: Review[] = [
  expectedReviewNapapijri1,
  expectedReviewNapapijri2,
  expectedReviewNapapijri3,
  expectedReviewNapapijri4,
  expectedReviewNapapijri5,
  expectedReviewNapapijri6,
  expectedReviewNapapijri7,
  expectedReviewNapapijri8,
];

export const expectedProductNapapijriReturned: ProductFull = {
  id: expectedProductIdNapapijri,
  colors: new Map([expectedColorRed, expectedColorBlue, expectedColorPurple].map((color) => [color.id, color])),
  description: 'A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made in stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian flag patch, and the iconic front flap pocket complete with our signature Napapijri Geographic graphic.',
  details: 'A contemporary take on the iconic Skidoo jacket, this is a loose-fit anorak for women made in stretch, water-resistant fabric. It features a faux- fur trim around the hood, Norwegian flag patch, and the iconic front flap pocket complete with our signature Napapijri Geographic graphic.',
  discount: { newPrice: 450, percent: 10 },
  photos: new Map([expectedPhotoNapapijri1, expectedPhotoNapapijri2, expectedPhotoNapapijri3].map((photo) => [photo.id, photo])),
  reviews: new Map(expectedNapapijriReviews.map(review => [review.id, review])),
  sizes: new Map([expectedSizeXs, expectedSizeM, expectedSizeL].map((size) => [size.id, size])),
  average_rating: 4.5,
  name: 'Skidoo 2.0 Anorak Jacket',
  photo_url: '/items/napa-anor.webp',
  price: 500,
};
