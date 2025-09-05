import { Cart, CartRow, CartSubmission } from '@/app/lib/definitions';
import { db } from '@/app/lib/model/db';

const DELIVERY_FEE = 15;

export async function createCart(cart: CartSubmission): Promise<CartSubmission> {
  const { user_id, product_id, color_id, size_id, quantity } = cart;
  try {
    const queryResult = await db.query<CartSubmission>`
            INSERT INTO cart (
                user_id,
                product_id,
                color_id,
                size_id,
                quantity
            )
            VALUES (
                    ${user_id},
                    ${product_id},
                    ${color_id},
                    ${size_id},
                    ${quantity}
                   )
            RETURNING *;
        `;
    return queryResult.rows[0];
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to create cart');
  }
}

export async function getCart(user_id: string): Promise<Cart> {
  try {
    const queryResult = await db.query<CartRow>`
        SELECT
            user_id,
            product_id,
            color_id,
            size_id,
            quantity,
            p.name as product_name,
            p.price as product_price,
            p.discount as product_discount_percent,
            p.photo_url as product_photo_url,
            s.size as size,
            s.value as value,
            co.hex_value as hex_value,
            co.human_readable_value as human_readable_value,
            ROUND(SUM((p.price * (1 - COALESCE(p.discount, 0) / 100.0)) * cart.quantity)
                OVER (PARTITION BY cart.user_id), 2) AS total
        FROM cart
            LEFT JOIN product p on product_id = p.id
            INNER JOIN color co on co.id = color_id
            INNER JOIN size s on s.id = size_id
        WHERE cart.user_id = ${user_id}
        `;
    if (queryResult.rows.length === 0) {
      return {
        summary: {
          deliveryFee: DELIVERY_FEE,
          discount: 0,
          subtotal: 0,
          total: 0,
        },
        user_id: user_id,
        products: [],
      };
    }
    const { total } = queryResult.rows[0];
    const numericTotal = parseFloat(total);
    return {
      summary: {
        deliveryFee: DELIVERY_FEE,
        discount: 0,
        subtotal: numericTotal,
        total: numericTotal + DELIVERY_FEE,
      },
      user_id: user_id,
      products: queryResult.rows.map((row) => ({
        id: row.product_id,
        name: row.product_name,
        photo_url: row.product_photo_url,
        price: row.product_price,
        discount_percent: parseInt(row.product_discount_percent, 10),
        color_id: row.color_id,
        color_hex_value: row.hex_value,
        color_human_readable_value: row.human_readable_value,
        size_id: row.size_id,
        size: row.size,
        size_value: row.value,
        quantity: row.quantity,
      })),
    };
  } catch (error) {
    console.error(`Database error: ${error}`);
    throw new Error('Failed to fetch cart');
  }
}
