export interface Entity {
    id: string;
}

export interface Poster extends Entity {
    id: string;
    width: number;
    height: number;
    price: number;
    stock: number;
    description: string;
    image: string;
    reference: string;
}

export interface Customer extends Entity {
    id: string;
    avatar: string;
    first_name: string;
    last_name: string;
}
