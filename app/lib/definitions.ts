export type Color = {
    id: number;
    hex_value: string;
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
}

export type Review = ReviewRaw & {
    id: number;
    verified: boolean;
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
    discount_percent: number,
    photo_url: string,
    color_id: number,
    color_hex_value: string,
    size_id: number,
    size: string,
    size_value: string,
}

export type FullProductRaw = ProductRaw & {
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

export type Product = {
    id: number;
    name: string;
    description: string;
    details: string;
    photos: Map<number, Photo>
    reviews: Map<number, Review>;
    colors: Map<number, Color>;
    sizes: Map<number, Size>;
    price: number;
    discount?: {
        newPrice: number;
        percent: number;
    };
    photo_url: string;
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
    cred_id: string;
    cred_public_key: Uint8Array;
    internal_user_id?: string;
    webauthn_user_id?: string;
    counter: number;
    backup_eligible: boolean;
    backup_status: boolean;
    transports: string[];
    created_at?: Date;
    last_used?: Date;
}

export type PasskeySerialized = Omit<Passkey, 'cred_public_key'> & {
    cred_public_key: string;
}
