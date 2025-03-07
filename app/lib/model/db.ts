import { sql } from '@vercel/postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export type queryFunction = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<unknown>;

const testDb = {
  query: (strings: TemplateStringsArray, ...values: unknown[]): Promise<unknown> => {
    // Reconstruct the query with proper pg placeholders
    let text = strings[0];
    for (let i = 1; i < strings.length; i++) {
      text += `$${i}${strings[i]}`;
    }
    return pool.query(text, values);
  }
};


// Export the appropriate interface based on environment
export const db = process.env.NODE_ENV === 'test' ? testDb : { query: sql };
