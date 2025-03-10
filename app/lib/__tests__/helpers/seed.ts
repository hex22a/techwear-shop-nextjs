import {
  expectedCategories,
  expectedColors,
  expectedProducts,
  expectedSizes,
  expectedStyles,
  expectedUsers,
} from './fixtures';
import { db, queryFunction } from '@/app/lib/model/db';
import { ProductFull } from '@/app/lib/definitions';

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
        (id, username)
    VALUES
        (${user.id}, ${user.username})
  `,
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
        }: ProductFull) => {
          await this.db.query`
          INSERT INTO public.product
              (id, name, description, details, price, discount, photo_url, category_id, style_id)
          OVERRIDING SYSTEM VALUE
          VALUES 
              (${id}, ${name}, ${description}, ${details}, ${price}, ${discount?.percent || 0}, ${photo_url}, ${category?.id}, ${style?.id})
          `;
          await Promise.all(photos.entries().map(([, photo]) => this.db.query`
          INSERT INTO public.product_photo
            (product_id, url)
          VALUES 
            (${id}, ${photo.url})
          `));
          await Promise.all(colors.entries().map(([, color]) => this.db.query`
          INSERT INTO public.product_color
            (product_id, color_id)
          VALUES 
            (${id}, ${color.id})
          `));
          await Promise.all(sizes.entries().map(([, size]) => this.db.query`
          INSERT INTO public.product_size
            (product_id, size_id)
          VALUES 
            (${id}, ${size.id})
          `));
        },
      ),
    );
  }

  async seedAll() {
    await Promise.all([
      this.seedUsers(),
      this.seedColors(),
      this.seedCategories(),
      this.seedStyles(),
      this.seedSizes(),
    ]);
    await this.seedProducts();
  }
}

export default Seed;
