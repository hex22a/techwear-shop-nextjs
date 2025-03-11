import { Base64URLString, AuthenticatorTransportFuture } from '@simplewebauthn/server';

export type Color = {
    id: number;
    hex_value: string;
    human_readable_value: string;
}
export type ColorRow = Color;

export type Size = {
    id: number;
    size: string;
    value: string;
}
export type SizeRow = Size;

export type Style = {
    id: number;
    name: string;
}
export type StyleRow = Style;

export type Category = {
    id: number;
    name: string;
}
export type CategoryRow = Category;

export type ReviewRow = {
    id: number;
    author_id: string;
    product_id: number;
    rating: number;
    review: string;
    created_at: Date;
    verified?: boolean;
    title: string;
};

export type ReviewRaw = Omit<ReviewRow, 'author_id' | 'review' | 'id' | 'created_at'> & {
    review_text: string;
}

export type Review = ReviewRaw & {
    id: number
    author: string;
    created_at: Date;
}

export type Photo = {
    id: number;
    url: string;
}

export type ProductRaw = {
    id: number,
    name: string,
    price: number,
    discount_percent: string,
    photo_url: string,
    average_rating: number;
}

export type FullProductRaw = ProductRaw & {
    color_id: number,
    color_hex_value: string,
    color_human_readable_value: string,
    size_id: number,
    size: string,
    size_value: string,
}

export type ExtraProductRaw = FullProductRaw & {
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

export type Product = Omit<ProductRaw, 'discount_percent'> & {
    discount?: {
        newPrice: number;
        percent: number;
    };
}


export type ProductFull = Product & {
    description: string;
    details: string;
    photos: Map<number, Photo>
    reviews: Map<number, Review>;
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

export type CartRow = {
    user_id: string;
    product_id: number;
    color_id: number;
    size_id: number;
    quantity: number;
}

export type FullCartRow = CartRow & Omit<Color, 'id'> & Omit<Size, 'id'> & {
    product_name: string;
    product_price: number;
    product_discount_percent: string;
    product_photo_url: string;
    total: string;
}

export type Cart = {
    user_id: string;
    products: (Omit<FullProductRaw, 'average_rating' | 'discount_percent'> & { quantity: number, discount_percent: number })[];
    summary: {
        subtotal: number;
        total: number;
        discount: number;
        deliveryFee: number;
    }
}
