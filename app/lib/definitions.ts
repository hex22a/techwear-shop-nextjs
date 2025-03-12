import { Base64URLString, AuthenticatorTransportFuture } from '@simplewebauthn/server';

export type ColorRow = {
    id: number;
    hex_value: string;
    human_readable_value: string;
}
export type Color = ColorRow;

export type SizeRow = {
    id: number;
    size: string;
    value: string;
}
export type Size = SizeRow;

export type StyleRow = {
    id: number;
    name: string;
}
export type Style = StyleRow;

export type CategoryRow = {
    id: number;
    name: string;
}
export type Category = CategoryRow;

export type Review = {
    product_id: number;
    verified?: boolean;
    rating: number;
    title: string;
    review_text: string;
}

export type ReviewRow = Omit<Review, 'review_text'> & {
    id: number;
    author_id: string;
    review: string;
    created_at: Date;
};

export type ReviewUI = Review;

export type ReviewComplete = Review & {
    id: number
    author: string;
    created_at: Date;
}

export type Photo = {
    id: number;
    url: string;
}

export type ProductRow = {
    id: number,
    name: string,
    price: number,
    discount_percent: string,
    photo_url: string,
    average_rating: number;
}

export type ProductWithSizesAndColorsRow = ProductRow & {
    color_id: number,
    color_hex_value: string,
    color_human_readable_value: string,
    size_id: number,
    size: string,
    size_value: string,
}

export type FetchProductRow = ProductWithSizesAndColorsRow & {
    description: string,
    details: string,
    alt_photo_id: number,
    alt_photo_url: string,
    review_id: number,
    review_text: string,
    review_rating: number,
    review_title: string,
    review_verified: boolean,
    review_author: string,
    review_created_at: Date,
}

export type Product = Omit<ProductRow, 'discount_percent'> & {
    discount?: {
        newPrice: number;
        percent: number;
    };
}

export type CartProduct = Omit<ProductWithSizesAndColorsRow, 'average_rating' | 'discount_percent'> & {
    quantity: number, discount_percent: number
};

export type ProductComplete = Product & {
    description: string;
    details: string;
    photos: Map<number, Photo>
    reviews: Map<number, ReviewComplete>;
    colors: Map<number, Color>;
    sizes: Map<number, Size>;
    category?: Category;
    style?: Style;
}

export type User = {
    id: string;
    username: string;
    created_at: Date;
}
export type UserRow = User;

export type UserWithPasskeyRow = UserRow & PasskeyRow;

export type UserCredentials = {
    passkeys: Map<string, AllowCredentials>;
}

export type AllowCredentials = {
    id: Base64URLString;
    transports: AuthenticatorTransportFuture[];
}

export type UserWithPasskeysSerialized = User & UserCredentials

export type Passkey = {
    cred_id: Base64URLString;
    cred_public_key: Uint8Array;
    internal_user_id?: string;
    webauthn_user_id?: string;
    counter: number;
    backup_eligible: boolean;
    backup_status: boolean;
    transports: AuthenticatorTransportFuture[];
    created_at?: Date;
    last_used?: Date;
}
export type PasskeyRow = Omit<Passkey, 'created_at'> & {
    passkey_created_at: Date;
};

export type PasskeySerialized = Omit<Passkey, 'cred_public_key'> & {
    cred_public_key: string;
}

export type CartSubmission = {
    user_id: string;
    product_id: number;
    color_id: number;
    size_id: number;
    quantity: number;
}

export type CartRow = CartSubmission & Omit<Color, 'id'> & Omit<Size, 'id'> & {
    product_name: string;
    product_price: number;
    product_discount_percent: string;
    product_photo_url: string;
    total: string;
}

export type Cart = {
    user_id: string;
    products: CartProduct[];
    summary: {
        subtotal: number;
        total: number;
        discount: number;
        deliveryFee: number;
    }
}
