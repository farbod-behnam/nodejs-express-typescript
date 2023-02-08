import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { Product } from "../models/product.model";
import { ProductRepository } from "../repositories/product/product.repository";
import { ProductFileRepository } from "../repositories/product/product-file.repository";
import { CartRepository } from "../repositories/cart/cart.repository";
import { CartFileRepository } from "../repositories/cart/cart-file.repository";
import { Cart } from "../models/cart.model";
import { CartProduct } from "../models/cart-product.model";


@Service()
export class ShopController {


    @Inject(() => ProductFileRepository)
    private readonly productRepository!: ProductRepository;

    @Inject(() => CartFileRepository)
    private readonly cartRepository!: CartRepository;

    constructor(productRepository: ProductRepository, cartRepository: CartRepository) {
        this.productRepository = productRepository;
        this.cartRepository = cartRepository;
    }


    async getProducts(req: Request, res: Response): Promise<void> {

        let products: Product[] = await this.productRepository.fetchAll();
        res.render("shop/product-list.ejs", {
            prods: products,
            pageTitle: "All Products",
            path: "/products"
        });

    }

    async getProduct(req: Request, res: Response): Promise<void> {

        const prodId: string = req.params.id;
        const product: Product = await this.productRepository.findById(prodId);
        console.log(product);

        res.render("shop/product-detail.ejs", {
            path: "/products",
            pageTitle: product.title,
            product: product
        });
    }

    async getIndex(req: Request, res: Response): Promise<void> {

        let products: Product[] = await this.productRepository.fetchAll();
        res.render("shop/index.ejs", {
            prods: products,
            pageTitle: "Shop",
            path: "/"
        });
    }

    getCart(req: Request, res: Response): void {
        res.render("shop/cart.ejs", {
            path: "/cart",
            pageTitle: "Your Cart"
        })
    }

    async postCart(req: Request, res: Response): Promise<void> {
        const id: string = req.body.id;

        let product = await this.productRepository.findById(id);

        await this.cartRepository.addProduct(id, product.price)

        console.log(id);
        res.redirect("/cart");
    }

    getOrders(req: Request, res: Response): void {
        res.render("shop/orders.ejs", {
            path: "/orders",
            pageTitle: "Your Orders"
        })
    }


    getCheckout(req: Request, res: Response): void {
        res.render("shop/checkout.ejs", {
            path: "/checkout",
            pageTitle: "Checkout"
        })
    }
}