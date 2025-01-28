export type Color = {
    id: number;
    hex_value: string;
}

export type Size = {
    id: number;
    size: string;
    value: number;
}

export type Style = {
    id: number;
    name: string;
}

export type Category = {
    id: number;
    name: string;
}

export type Review = {
    id: number;
    rating: number;
    review: string;
    verified: boolean;
    author: string;
    created_at: Date;
}

export type Photo = {
    id: number;
    url: string;
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
    discount: {
        newPrice: number;
        percent: number;
    };
    photo_url: string;
}
