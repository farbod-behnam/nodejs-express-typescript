import { Cart } from "../../models/cart.model";

export interface CartRepository {
    save(cart: Cart): void;
    addProduct(prodId: string, price: number): Promise<void>;
    fetch(): Promise<Cart>;
}