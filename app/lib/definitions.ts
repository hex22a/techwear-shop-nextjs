import { Base64URLString, AuthenticatorTransportFuture } from '@simplewebauthn/server';

export type Color = {
    id: number;
    hex_value: string;
    human_readable_value: string;
}

export type Size = {
    id: number;
    size: string;
    value: string;
}

export type Style = {
    id: number;
    name: string;
}

export type Category = {
    id: number;
    name: string;
}

export type ReviewRaw = {
    title: string;
    rating: number;
    review_text: string;
    product_id: number;
    verified?: boolean;
}

export type Review = ReviewRaw & {
    id: number;
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
}

export type User = {
    id: string;
    username: string;
    created_at: Date;
}

export type UserWithPasskeyRaw = User & Passkey

export type UserWithPasskeysSerialized = User & {
    passkeys: Map<string, PasskeySerialized>;
}

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
    products: (Omit<FullProductRaw, 'average_rating'> & { quantity: number })[];
    summary: {
        subtotal: number;
        total: number;
        discount: number;
        deliveryFee: number;
    }
}
