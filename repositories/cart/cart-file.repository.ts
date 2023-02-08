import fs from "fs";
import path from "path";
import { Service } from "typedi";
import { CartProduct } from "../../models/cart-product.model";
import { Cart } from "../../models/cart.model";
import { CartRepository } from "./cart.repository";

@Service()
export class CartFileRepository implements CartRepository {



    save(cart: Cart): void {

        let filePath = this.createFilePath();

        fs.writeFile(filePath, JSON.stringify(cart), (error) => {
            if (error)
                console.log(error);
        })

    }

    async fetch(): Promise<Cart> {

        let filePath: string = this.createFilePath();

        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (error, fileContent) => {

                let cartProduct: CartProduct[] = [];
                let cart: Cart = new Cart(cartProduct, 0);

                if (error === null) {

                    cart = JSON.parse(fileContent.toString());

                    if (Object.keys(cart).length === 0) {

                        let emptyCartProduct: CartProduct[] = [];
                        let emptyCart: Cart = new Cart(emptyCartProduct, 0);
                        resolve(emptyCart);

                    }
                    resolve(cart);
                }
                else
                    reject(cart);

            })
        });

    }


    async addProduct(prodId: string, price: number): Promise<void> {

        let cart = await this.fetch();

        if (cart === undefined || cart === null)
            throw new Error("undefined cart");

        const existingProductIndex = cart.cartProducts.findIndex(cartProd => cartProd.productId === prodId);

        if (existingProductIndex === -1) {
            this.addCartProduct(cart, prodId);
        }
        else {
            this.updateCartProduct(cart, existingProductIndex);
        }

        cart.totalPrice = cart.totalPrice + price;

        this.save(cart);

    }


    private updateCartProduct(cart: Cart, existingProductIndex: number) {
        const existingProduct = cart.cartProducts[existingProductIndex];
        let updatedCartProduct: CartProduct;
        updatedCartProduct = { ...existingProduct };
        updatedCartProduct.quantity = updatedCartProduct.quantity + 1;
        // this.cartProducts = [...this.cartProducts];
        cart.cartProducts[existingProductIndex] = updatedCartProduct;
    }

    private addCartProduct(cart: Cart, prodId: string) {
        let newCartProduct = new CartProduct(prodId, 1);
        // this.cartProducts = [...this.cartProducts, updatedProduct];
        cart.cartProducts.push(newCartProduct);
    }

    private createFilePath(): string {
        if (process.mainModule?.filename == undefined)
            throw new Error("Path to project is not defined in process.mainModule.filename");

        let filePath = path.join(path.dirname(process.mainModule?.filename), "data", "cart.json");
        return filePath;
    }
}