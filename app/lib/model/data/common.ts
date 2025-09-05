'use server';

import { db } from '../db';
import { Category, CategoryRow, Color, ColorRow, Size, SizeRow, Style, StyleRow } from '@/app/lib/definitions';

export async function fetchAllColors(): Promise<Color[]> {
  try {
    const queryResult = await db.query<ColorRow>`SELECT * FROM color ORDER BY id LIMIT 10`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch colors.');
  }
}

export async function fetchAllSizes(): Promise<Size[]> {
  try {
    const queryResult = await db.query<SizeRow>`SELECT * FROM size ORDER BY id LIMIT 9`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch sizes.');
  }
}

export async function fetchAllStyles(): Promise<Style[]> {
  try {
    const queryResult = await db.query<StyleRow>`SELECT * FROM style ORDER BY id LIMIT 4`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch dress styles.');
  }
}

export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const queryResult = await db.query<CategoryRow>`SELECT * FROM category ORDER BY id LIMIT 10`;
    return queryResult.rows.map((row) => ({ ...row }));
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch dress categories.');
  }
}
