import { sql } from '@vercel/postgres'
import {Category, Color, Product, ProductRaw, Size, Style} from "@/app/lib/definitions";

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

export async function fetchProduct(id: string): Promise<Product> {
    try {
        const queryResult = await sql<ProductRaw>`
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
                s.id as size_id,
                s.size as size,
                s.value as size_value,
                r.id as review_id,
                r.review as review,
                r.rating as review_rating,
                r.verified as review_verified
                        FROM product
                            LEFT JOIN product_photo on product.id = product_photo.product_id
                            LEFT JOIN product_color pc on product.id = pc.product_id
                            INNER JOIN color c on c.id = pc.color_id
                            LEFT JOIN product_size ps on product.id = ps.product_id
                            INNER JOIN size s on s.id = ps.size_id
                            LEFT JOIN public.review r on product.id = r.product_id
                WHERE product.id = ${id}`;
        const product: Product = { photos: new Map(), colors: new Map(), sizes: new Map(), reviews: new Map(), ...queryResult.rows[0] }
        queryResult.rows.forEach(row => {
            product.photos.set(row.alt_photo_id, {
                id: row.alt_photo_id,
                url: row.alt_photo_url,
            });
            product.colors.set(row.color_id, {
                id: row.color_id,
                hex_value: row.color_hex_value,
            })
            product.sizes.set(row.size_id, {
                id: row.size_id,
                size: row.size,
                value: row.size_value,
            })
            product.reviews.set(row.review_id, {
                id: row.review_id,
                rating: row.review_rating,
                review: row.review,
                verified: row.review_verified,
                created_at: row.review_created_at,
                author: row.review,
            })
        })
        const discount = queryResult.rows[0].discount_percent;
        if (queryResult.rows[0].discount_percent) {
            product.discount = {
                newPrice: product.price - product.price * discount / 100,
                percent: discount,
            }
        }
        console.log(product)
        return product
    } catch (error) {
        console.error(`Database error: ${error}`)
        throw new Error(`Failed to fetch product id: ${id}`)
    }
}
