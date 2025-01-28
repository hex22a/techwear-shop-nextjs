import { sql } from '@vercel/postgres'
import {Category, Color, Size, Style} from "@/app/lib/definitions";

export async function fetchAllColors(): Promise<Color[]> {
    try {
        const queryResult = await sql<Color>`SELECT * FROM color LIMIT 10`
        return queryResult.rows.map(row => ({...row}))
    } catch (error) {
        console.error(`Database error: ${error}`)
        throw new Error('Failed to fetch colors.')
    }
}

export async function fetchAllSizes(): Promise<Size[]> {
    try {
        const queryResult = await sql<Size>`SELECT * FROM size LIMIT 9`
        return queryResult.rows.map(row => ({...row}))
    } catch (error) {
        console.error(`Database error: ${error}`)
        throw new Error('Failed to fetch sizes.')
    }
}

export async function fetchAllStyles(): Promise<Style[]> {
    try {
        const queryResult = await sql<Style>`SELECT * FROM style LIMIT 4`
        return queryResult.rows.map(row => ({...row}))
    } catch (error) {
        console.error(`Database error: ${error}`)
        throw new Error('Failed to fetch dress styles.')
    }
}

export async function fetchAllCategories(): Promise<Category[]> {
    try {
        const queryResult = await sql<Style>`SELECT * FROM category LIMIT 10`
        return queryResult.rows.map(row => ({...row}))
    } catch (error) {
        console.error(`Database error: ${error}`)
        throw new Error('Failed to fetch dress categories.')
    }
}
