import { FetchProductRow, Product, ProductComplete, ProductRow } from '@/app/lib/definitions';
import { db } from '@/app/lib/model/db';

const MAIN_PAGE_PRODUCTS = 4;
const SEARCH_RESULTS_PER_PAGE = 10;
const TRIGRAM_THRESHOLD = 0.3;

const offset = 0;

export async function fetchNewArrivals(): Promise<Product[]> {
  try {
    const queryResult = await db.query<ProductRow>`
      SELECT
          product.id as id,
          product.name as name,
          product.price as price,
          product.discount as discount_percent,
          product.details as details,
          product.photo_url as photo_url,
          COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS average_rating
      FROM product
               LEFT JOIN public.review r on product.id = r.product_id
      GROUP BY
          product.id,
          product.name,
          product.price,
          product.discount,
          product.details,
          product.photo_url,
          product.created_at
      ORDER BY product.created_at DESC
      LIMIT ${MAIN_PAGE_PRODUCTS}
      `;
    return queryResult.rows.map(
      (row: ProductRow): Product => ({
        ...row,
        discount: row.discount_percent
          ? {
              percent: parseInt(row.discount_percent, 10),
              newPrice: (row.price * (100 - parseInt(row.discount_percent, 10))) / 100,
            }
          : undefined,
      }),
    );
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch new arrivals.');
  }
}

export async function fetchTopSelling(): Promise<Product[]> {
  try {
    const queryResult = await db.query<ProductRow>`
      SELECT
          product.id as id,
          product.name as name,
          product.price as price,
          product.discount as discount_percent,
          product.details as details,
          product.photo_url as photo_url,
          COALESCE(ROUND(AVG(r.rating)::numeric, 1), 0) AS average_rating
      FROM product
               LEFT JOIN public.review r on product.id = r.product_id
      GROUP BY
          product.id,
          product.name,
          product.price,
          product.discount,
          product.details,
          product.photo_url,
          product.created_at
      ORDER BY average_rating DESC
      LIMIT ${MAIN_PAGE_PRODUCTS}
    `;
    return queryResult.rows.map(
      (row: ProductRow): Product => ({
        ...row,
        discount: row.discount_percent
          ? {
              percent: parseInt(row.discount_percent, 10),
              newPrice: (row.price * (100 - parseInt(row.discount_percent, 10))) / 100,
            }
          : undefined,
      }),
    );
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch new arrivals.');
  }
}

export function filterToProductFullProperties<T extends Record<string, unknown>>(obj: T): ProductComplete {
  const productFullInstance: ProductComplete = {
    average_rating: 0,
    category: {
      id: 0,
      name: '',
    },
    colors: new Map(),
    description: '',
    details: '',
    discount: { newPrice: 0, percent: 0 },
    id: 0,
    name: '',
    photo_url: '',
    photos: new Map(),
    price: 0,
    reviews: new Map(),
    sizes: new Map(),
    style: {
      id: 0,
      name: '',
    },
  };
  const result: Partial<ProductComplete> = {};

  for (const key of Object.keys(obj) as Array<keyof T>) {
    if (key in productFullInstance || key === 'id') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      result[key] = obj[key];
    }
  }

  return result as ProductComplete;
}

export function filterToProductThumbnailProperties<T extends Record<string, unknown>>(obj: T): Product {
  const productThumbnailInstance: Product = {
    average_rating: 0,
    discount: { newPrice: 0, percent: 0 },
    id: 0,
    name: '',
    photo_url: '',
    price: 0
  };
  const result: Partial<Product> = {};

  for (const key of Object.keys(obj) as Array<keyof T>) {
    if (key in productThumbnailInstance || key === 'id') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      result[key] = obj[key];
    }
  }

  return result as Product;
}

export async function fetchProduct(id: number): Promise<ProductComplete> {
  try {
    const queryResult = await db.query<FetchProductRow>`
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
          c.human_readable_value as color_human_readable_value,
          s.id as size_id,
          s.size as size,
          s.value as size_value,
          r.id as review_id,
          r.title as review_title,
          r.review as review_text,
          r.rating as review_rating,
          r.verified as review_verified,
          r.created_at as review_created_at,
          u.username as review_author,
          COALESCE(ROUND(avg_reviews.average_rating::numeric, 1), 0) AS average_rating
      FROM product
      LEFT JOIN (
        SELECT product_id, AVG(rating) AS average_rating
        FROM public.review
        GROUP BY product_id
      ) avg_reviews ON avg_reviews.product_id = product.id
      LEFT JOIN product_photo ON product.id = product_photo.product_id
      LEFT JOIN product_color pc ON product.id = pc.product_id
      INNER JOIN color c ON c.id = pc.color_id
      LEFT JOIN product_size ps ON product.id = ps.product_id
      INNER JOIN size s ON s.id = ps.size_id
      LEFT JOIN public.review r ON product.id = r.product_id
      LEFT JOIN public.user u ON r.author_id = u.id
      WHERE product.id = ${id}
      ORDER BY c.id, s.id, r.id, product_photo.id
    `;
    const product: ProductComplete = {
      ...filterToProductFullProperties(queryResult.rows[0]),
      photos: new Map(),
      colors: new Map(),
      sizes: new Map(),
      reviews: new Map(),
      average_rating: parseFloat(`${queryResult.rows[0].average_rating}`),
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
          human_readable_value: row.color_human_readable_value,
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
          author: row.review_author,
        });
      }
    });
    const discount = queryResult.rows[0].discount_percent;
    if (queryResult.rows[0].discount_percent) {
      product.discount = {
        newPrice: product.price - (product.price * parseInt(discount, 10)) / 100,
        percent: parseInt(discount, 10),
      };
    }
    return product;
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to fetch product id: ${id}`);
  }
}

export async function findProductsFts(searchText: string): Promise<Product[]> {
  try {
    const queryResult = await db.query<ProductRow>`
      WITH
        q AS (SELECT websearch_to_tsquery('english', ${searchText}) AS tsq),
        reviews AS (
          SELECT
            r.product_id,
            ROUND(AVG(r.rating)::numeric, 1) AS average_rating
          FROM public.review r
          GROUP BY r.product_id
        ),
        s AS (
          SELECT
            p.id,
            p.name,
            p.price,
            p.discount AS discount_percent,
            p.details,
            p.photo_url,
            COALESCE(rv.average_rating, 0) AS average_rating,
            ts_rank_cd(p.fts, q.tsq) AS rank,
            similarity(p.name, ${searchText}) AS sim,
            (0.7 * COALESCE(ts_rank_cd(p.fts, q.tsq), 0) + 0.3 * COALESCE(similarity(p.name, ${searchText}), 0)) AS score
          FROM public.product AS p
                 CROSS JOIN q
                 LEFT JOIN reviews rv ON rv.product_id = p.id
          WHERE (p.fts @@ q.tsq) OR (similarity(p.name, ${searchText}) > ${TRIGRAM_THRESHOLD})
        )
      SELECT
        s.id,
        s.name,
        s.price,
        s.discount_percent,
        s.details,
        s.photo_url,
        s.average_rating
      FROM s
      ORDER BY score DESC
      LIMIT ${SEARCH_RESULTS_PER_PAGE} OFFSET ${offset}
    `;
    return queryResult.rows.map(
      (row: ProductRow): Product => ({
        ...filterToProductThumbnailProperties(row),
        average_rating: parseFloat(`${row.average_rating}`),
        discount: row.discount_percent
          ? {
            percent: parseInt(row.discount_percent, 10),
            newPrice: (row.price * (100 - parseInt(row.discount_percent, 10))) / 100,
          }
          : undefined,
      }),
    );
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to perform full-text search. Query: ${searchText}`);
  }
}
