import {
  expectedCategories,
  expectedColors,
  expectedPasskeys,
  expectedProducts,
  expectedReviews,
  expectedSizes,
  expectedStyles,
  expectedUsers,
} from './fixtures';
import { db, queryFunction } from '@/app/lib/model/db';
import { ProductComplete } from '@/app/lib/definitions';
import { formatPgArray } from '@/app/lib/model/helpers';

export type seedDbClient = { query: queryFunction };

class Seed {
  db: seedDbClient;

  constructor() {
    this.db = db as seedDbClient;
  }

  async seedUsers() {
    return Promise.all(
      expectedUsers.map(
        (user) => this.db.query`
    INSERT INTO public.user
        (id, username, created_at)
    VALUES
        (${user.id}, ${user.username}, ${user.created_at})
  `,
      ),
    );
  }

  async seedPasskeys() {
    return Promise.all(
      expectedPasskeys.map(
        async ({
          cred_id,
          cred_public_key,
          internal_user_id,
          webauthn_user_id,
          counter,
          backup_eligible,
          backup_status,
          transports,
          created_at,
          last_used,
        }) => {
          const formattedTransports = formatPgArray(transports);

          await this.db.query`
          INSERT INTO passkey
            (cred_id, cred_public_key, internal_user_id, webauthn_user_id, counter, backup_eligible, backup_status, transports, created_at, last_used) 
          VALUES 
            (${cred_id}, ${cred_public_key}, ${internal_user_id}, ${webauthn_user_id}, ${counter}, ${backup_eligible}, ${backup_status}, ${formattedTransports}::text[], ${created_at}, ${last_used})
          `;
        },
      ),
    );
  }

  async seedColors() {
    return Promise.all(
      expectedColors.map(
        (color) => this.db.query`
    INSERT INTO public.color
        (id, hex_value, human_readable_value)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${color.id}, ${color.hex_value}, ${color.human_readable_value})
  `,
      ),
    );
  }

  async seedSizes() {
    return Promise.all(
      expectedSizes.map(
        (size) => this.db.query`
    INSERT INTO public.size
        (id, size, value)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${size.id}, ${size.size}, ${size.value})
  `,
      ),
    );
  }

  async seedCategories() {
    return Promise.all(
      expectedCategories.map(
        (category) => this.db.query`
    INSERT INTO public.category
        (id, name)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${category.id}, ${category.name})
  `,
      ),
    );
  }

  async seedStyles() {
    return Promise.all(
      expectedStyles.map(
        (style) => this.db.query`
    INSERT INTO public.style
        (id, name)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${style.id}, ${style.name})
  `,
      ),
    );
  }

  async seedProducts() {
    return Promise.all(
      expectedProducts.map(
        async ({
          id,
          name,
          description,
          details,
          price,
          discount,
          photo_url,
          category,
          style,
          photos,
          colors,
          sizes,
        }: ProductComplete) => {
          await this.db.query`
          INSERT INTO public.product
              (id, name, description, details, price, discount, photo_url, category_id, style_id)
          OVERRIDING SYSTEM VALUE
          VALUES 
              (${id}, ${name}, ${description}, ${details}, ${price}, ${discount?.percent || 0}, ${photo_url}, ${category?.id}, ${style?.id})
          `;
          if (photos) {
            await Promise.all(
              Array.from(photos.entries()).map(
                ([, photo]) => this.db.query`
            INSERT INTO public.product_photo
              (id, product_id, url)
            OVERRIDING SYSTEM VALUE
            VALUES 
              (${photo.id}, ${id}, ${photo.url})
            `,
              ),
            );
          }
          await Promise.all(
            Array.from(colors.entries()).map(
              ([, color]) => this.db.query`
          INSERT INTO public.product_color
            (product_id, color_id)
          VALUES 
            (${id}, ${color.id})
          `,
            ),
          );
          await Promise.all(
            Array.from(sizes.entries()).map(
              ([, size]) => this.db.query`
          INSERT INTO public.product_size
            (product_id, size_id)
          VALUES 
            (${id}, ${size.id})
          `,
            ),
          );
        },
      ),
    );
  }

  async seedReviews() {
    return Promise.all(
      expectedReviews.map(
        ({ id, author_id, review, product_id, created_at, title, rating, verified }) => this.db.query`
    INSERT INTO public.review
        (id, author_id, product_id, rating, review, created_at, verified, title)
    OVERRIDING SYSTEM VALUE
    VALUES
        (${id}, ${author_id}, ${product_id}, ${rating}, ${review}, ${created_at}, ${verified}, ${title})
    `,
      ),
    );
  }

  async restoreReviewCounter() {
    await this.db.query`
        SELECT setval('review_id_seq', (SELECT MAX(id) FROM public.review), true)
    `;
  }

  async seedAll() {
    await Promise.all([
      this.seedUsers(),
      this.seedColors(),
      this.seedCategories(),
      this.seedStyles(),
      this.seedSizes(),
    ]);
    await this.seedPasskeys();
    await this.seedProducts();
    await this.seedReviews();
    await this.restoreReviewCounter();
  }
}

export default Seed;
