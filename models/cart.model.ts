import { CartProduct } from "./cart-product.model";
import { Product } from "./product.model";

export class Cart {

    cartProducts: CartProduct[] = [];
    private _totalPrice: number = 0;

    constructor(cartProducts: CartProduct[], totalPrice: number) {
        this.cartProducts = cartProducts;
        this._totalPrice = totalPrice;
    }



    public get totalPrice(): number {
        return this._totalPrice;
    }


    public set totalPrice(value: number) {
        if (typeof value !== typeof this._totalPrice) {
            throw new Error("only [" + typeof this._totalPrice + "] type is acceptable, but the type was:" + typeof value + " with value: " + value);
        }
        this._totalPrice = value;
    }




}