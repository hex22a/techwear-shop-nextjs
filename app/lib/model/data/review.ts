import { Review, ReviewComplete } from '@/app/lib/definitions';
import { auth } from '@/auth';
import { db } from '@/app/lib/model/db';

const MAIN_PAGE_REVIEWS = 7;

export async function addReview(review: Review): Promise<ReviewComplete> {
  const user_session = await auth();
  if (!user_session) {
    throw new Error('User not logged in.');
  }
  const { user } = user_session;
  const { product_id, title, rating, review_text } = review;
  try {
    const queryResult = await db.query<ReviewComplete>`
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
            RETURNING id, product_id, rating, title, review as review_text, created_at
        `;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error(`Failed to add review: ${review}`);
  }
}

export async function getTopReviews(): Promise<ReviewComplete[]> {
  try {
    const queryResult = await db.query<ReviewComplete>`
            SELECT
                r.id as id,
                r.verified as verified,
                r.product_id as product_id,
                r.rating as rating,
                r.title as title,
                r.review as review_text,
                r.created_at as created_at,
                u.username as author
            FROM review r
            LEFT JOIN public.user u on r.author_id = u.id
            ORDER BY rating desc 
            LIMIT ${MAIN_PAGE_REVIEWS}
        `;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch reviews');
  }
}
