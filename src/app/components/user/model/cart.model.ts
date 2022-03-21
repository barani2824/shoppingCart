

export class Cart {
    id!: number | null;
    products: CartProduct[] = [];

    constructor(cart?: Cart) {
        this.id = cart?.id || null;
        this.products = cart?.products || [];
    }
}

export class CartProduct {
    id!: number;
    name!: string;
    price!: number;
    discount!: number;
    quantity!: number;
}