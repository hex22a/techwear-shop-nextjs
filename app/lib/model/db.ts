import { sql } from '@vercel/postgres';
import { Pool, QueryResult, QueryResultRow } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL
});

export type queryFunction = (strings: TemplateStringsArray, ...values: unknown[]) => Promise<QueryResult>;

const testDb = {
  query: <T extends QueryResultRow = never>(strings: TemplateStringsArray, ...values: unknown[]): Promise<QueryResult<T>> => {
    // Reconstruct the query with proper pg placeholders
    let text = strings[0];
    for (let i = 1; i < strings.length; i++) {
      text += `$${i}${strings[i]}`;
    }
    return pool.query(text, values) as Promise<QueryResult<T>>;
  }
};


// Export the appropriate interface based on environment
export const db = process.env.NODE_ENV === 'test' ? testDb : { query: sql };
