import { expectedColors, expectedUsers } from './fixtures';
import { queryFunction } from '@/app/lib/model/db';

export type seedDbClient = { query: queryFunction };

async function seedUsers(client: seedDbClient) {
  return Promise.all(expectedUsers.map((user) => client.query`
    INSERT INTO public.user
        (id, username)
    VALUES
        (${user.id}, ${user.username})
  `));
}

async function seedColors(client: seedDbClient) {
  return Promise.all(expectedColors.map((color) => client.query`
    INSERT INTO public.color
        (id, hex_value, human_readable_value)
    OVERRIDING SYSTEM VALUE
    VALUES 
        (${color.id}, ${color.hex_value}, ${color.human_readable_value})
  `));
}

async function seed(client: seedDbClient) {
  await Promise.all([
    seedUsers(client),
    seedColors(client),
  ]);
}

export default seed;
