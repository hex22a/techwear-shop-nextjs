import { expectedCategories, expectedColors, expectedSizes, expectedStyles, expectedUsers } from './fixtures';
import { queryFunction } from '@/app/lib/model/db';

export type seedDbClient = { query: queryFunction };

class Seed {
  db: seedDbClient;

  constructor(client: seedDbClient) {
    this.db = client;
  }

  async seedUsers() {
    return Promise.all(expectedUsers.map((user) => this.db.query`
    INSERT INTO public.user
        (id, username)
    VALUES
        (${user.id}, ${user.username})
  `));
  }

  async seedColors() {
    return Promise.all(expectedColors.map((color) => this.db.query`
    INSERT INTO public.color
        (id, hex_value, human_readable_value)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${color.id}, ${color.hex_value}, ${color.human_readable_value})
  `));
  }

  async seedSizes() {
    return Promise.all(expectedSizes.map((size) => this.db.query`
    INSERT INTO public.size
        (id, size, value)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${size.id}, ${size.size}, ${size.value})
  `));
  }

  async seedCategories() {
    return Promise.all(expectedCategories.map((category) => this.db.query`
    INSERT INTO public.category
        (id, name)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${category.id}, ${category.name})
  `));
  }

  async seedStyles() {
    return Promise.all(expectedStyles.map((style) => this.db.query`
    INSERT INTO public.style
        (id, name)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${style.id}, ${style.name})
  `));
  }

  async seedAll() {
    return Promise.all([
      this.seedUsers(),
      this.seedColors(),
      this.seedCategories(),
      this.seedStyles(),
      this.seedSizes(),
    ]);
  }
}

export default Seed;
