'use server';

import { auth } from '@/auth';

const MAIN_PAGE_REVIEWS = 7;

import { sql } from '@vercel/postgres';
import {
  Category,
  Color,
  PasskeySerialized,
  Product,
  FullProductRaw,
  Size,
  Style,
  User,
  UserWithPasskeyRaw,
  UserWithPasskeysSerialized,
  ReviewRaw,
  Review,
  CartRow,
  Cart,
  FullCartRow,
} from '@/app/lib/definitions';

import { isoBase64URL } from '@simplewebauthn/server/helpers';

export async function fetchAllColors(): Promise<Color[]> {
  try {
    const queryResult = await sql<Color>`SELECT * FROM color LIMIT 10`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch colors.');
  }
}

export async function fetchAllSizes(): Promise<Size[]> {
  try {
    const queryResult = await sql<Size>`SELECT * FROM size LIMIT 9`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch sizes.');
  }
}

export async function fetchAllStyles(): Promise<Style[]> {
  try {
    const queryResult = await sql<Style>`SELECT * FROM style LIMIT 4`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch dress styles.');
  }
}

export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const queryResult = await sql<Style>`SELECT * FROM category LIMIT 10`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch dress categories.');
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  try {
    const queryResult = await sql<FullProductRaw>`
            SELECT
                product.id as id,
                product.name as name,
                product.price as price,
                product.discount as discount_percent,
                product.description as description,
                product.details as details,
                product.photo_url as photo_url,
                product_photo.id as alt_photo_id,
                product_photo.url as alt_photo_url,
                c.id as color_id,
                c.hex_value as color_hex_value,
                s.id as size_id,
                s.size as size,
                s.value as size_value,
                r.id as review_id,
                r.title as review_title,
                r.review as review_text,
                r.rating as review_rating,
                r.verified as review_verified
                        FROM product
                            LEFT JOIN product_photo on product.id = product_photo.product_id
                            LEFT JOIN product_color pc on product.id = pc.product_id
                            INNER JOIN color c on c.id = pc.color_id
                            LEFT JOIN product_size ps on product.id = ps.product_id
                            INNER JOIN size s on s.id = ps.size_id
                            LEFT JOIN public.review r on product.id = r.product_id
                WHERE product.id = ${id}`;
    const product: Product = {
      photos: new Map(),
      colors: new Map(),
      sizes: new Map(),
      reviews: new Map(),
      ...queryResult.rows[0],
    };
    queryResult.rows.forEach((row) => {
      if (row.alt_photo_id !== null) {
        product.photos.set(row.alt_photo_id, {
          id: row.alt_photo_id,
          url: row.alt_photo_url,
        });
      }
      if (row.color_id !== null) {
        product.colors.set(row.color_id, {
          id: row.color_id,
          color: 'TBD SOME COLOR',
          hex_value: row.color_hex_value,
        });
      }
      if (row.size_id !== null) {
        product.sizes.set(row.size_id, {
          id: row.size_id,
          size: row.size,
          value: row.size_value,
        });
      }
      if (row.review_id !== null) {
        product.reviews.set(row.review_id, {
          id: row.review_id,
          product_id: row.id,
          title: row.review_title,
          rating: row.review_rating,
          review_text: row.review_text,
          verified: row.review_verified,
          created_at: row.review_created_at,
          author: row.review_text,
        });
      }
    });
    const discount = queryResult.rows[0].discount_percent;
    if (queryResult.rows[0].discount_percent) {
      product.discount = {
        newPrice: product.price - (product.price * discount) / 100,
        percent: discount,
      };
    }
    return product;
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to fetch product id: ${id}`);
  }
}

export async function findUser(username: string): Promise<User> {
  const queryResult = await sql<User>`SELECT * FROM public.user WHERE username = ${username}`;
  console.log(queryResult.rows);
  return queryResult.rows[0] || null;
}

export async function findUserWithPasskeys(username: string): Promise<UserWithPasskeysSerialized> {
  try {
    const queryResult = await sql<UserWithPasskeyRaw>`
                    SELECT
                        *
                    FROM
                        public.user
                    LEFT JOIN passkey ON public.user.id = passkey.internal_user_id
                    WHERE public.user.username = ${username}`;
    const user: UserWithPasskeysSerialized = { passkeys: new Map(), ...queryResult.rows[0] };
    queryResult.rows.forEach((row) => {
      const passkey: PasskeySerialized = {
        ...row,
        cred_public_key: isoBase64URL.fromBuffer(row.cred_public_key, 'base64url'),
      };
      user.passkeys.set(row.cred_id, passkey);
    });
    console.log(user);
    return user;
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to fetch user: ${username}`);
  }
}

export async function createUser(username: string, passkey: PasskeySerialized): Promise<User> {
  const { cred_id, counter, cred_public_key, backup_eligible, backup_status, webauthn_user_id, transports } = passkey;
  try {
    const queryResult = await sql<User>`
            WITH new_user AS (
                INSERT INTO public.user (username) VALUES (${username}) RETURNING id
            )
            INSERT INTO passkey (
                internal_user_id,
                cred_id,
                counter,
                cred_public_key,
                backup_eligible,
                backup_status,
                webauthn_user_id,
                transports
            )
            VALUES (
                (SELECT id FROM new_user),
                ${cred_id},
                ${counter},
                ${cred_public_key},
                ${backup_eligible},
                ${backup_status},
                ${webauthn_user_id},
                ARRAY[${JSON.stringify(transports)}]
            )
            RETURNING *;
        `;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to create user: ${username}`);
  }
}

export async function getPasskeyWithUserId(cred_id: string, internal_user_id: string): Promise<PasskeySerialized> {
  try {
    const queryResult =
      await sql<PasskeySerialized>`SELECT * FROM passkey WHERE cred_id = ${cred_id} AND internal_user_id = ${internal_user_id}`;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to fetch passkey: ${cred_id}`);
  }
}

export async function addReview(review: ReviewRaw): Promise<Review> {
  const user_session = await auth();
  if (!user_session) {
    throw new Error('User not logged in.');
  }
  const { user } = user_session;
  const { product_id, title, rating, review_text } = review;
  try {
    const queryResult = await sql<Review>`
            INSERT INTO review (
                author_id,
                product_id,
                rating,
                title,
                review
            )
            VALUES (
                ${user?.id},
                ${product_id},
                ${rating},
                ${title},
                ${review_text}
            )
            RETURNING id
        `;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to add review: ${review}`);
  }
}

export async function getTopReviews(): Promise<Review[]> {
  try {
    const queryResult = await sql<Review>`
            SELECT
                r.id as id,
                r.author_id as author_id,
                r.product_id as product_id,
                r.rating as rating,
                r.title as title,
                r.review as review_text,
                u.username as author
            FROM review r
            LEFT JOIN public.user u on r.author_id = u.id
            LIMIT ${MAIN_PAGE_REVIEWS}
        `;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch reviews');
  }
}

export async function createCart(cart: CartRow) {
  const { user_id, product_id, color_id, size_id, quantity } = cart;
  try {
    await sql<CartRow>`
            INSERT INTO cart (
                user_id,
                product_id,
                color_id,
                size_id,
                quantity
            )
            VALUES (
                    ${user_id},
                    ${product_id},
                    ${color_id},
                    ${size_id},
                    ${quantity}
                   )
        `;
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to create cart');
  }
}

export async function getCart(user_id: string): Promise<Cart> {
  try {
    const queryResult = await sql<FullCartRow>`
            SELECT
                user_id,
                product_id,
                color_id,
                size_id,
                quantity,
                p.name as product_name,
                p.price as product_price,
                p.discount as product_discount_percent,
                p.photo_url as product_photo_url,
                s.size as size,
                s.value as size_value,
                hex_value,
                color
            FROM cart
                LEFT JOIN product p on product_id = p.id
                INNER JOIN color on color.id = color_id
                INNER JOIN size s on s.id = size_id
            WHERE cart.user_id = ${user_id}
        `;

    const cart: Cart = {
      summary: { deliveryFee: 0, discount: 0, subtotal: 0, total: 0 },
      user_id: user_id,
      products: []
    }
    queryResult.rows.forEach((row) => {
        if (row.product_id) {
            cart.products.push({
              id: row.product_id,
              name: row.product_name,
              photo_url: row.product_photo_url,
              price: row.product_price,
              discount_percent: row.product_discount_percent,
              color_id: row.color_id,
              color_hex_value: row.hex_value,
              size: row.size,
              size_value: row.size,
              size_id: row.size_id,
              quantity: row.quantity,
            })
        }
    })
    return cart
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch cart');
  }
}
