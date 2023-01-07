import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { Product } from "../models/product";
import { Repository } from "../repositories/repository";
import { ProductFileRepository } from "../repositories/productFile.repository";


@Service()
export class ShopController {

    @Inject(() => ProductFileRepository)
    private readonly productRepository!: Repository<Product>;

    constructor(productRepository: Repository<Product>) {
        this.productRepository = productRepository;
    }


    async getProducts(req: Request, res: Response): Promise<void> {

        let products: Product[] = await this.productRepository.fetchAll();
        console.log("ProductController.ts: ", products);
        res.render("shop/product-list.ejs", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });

    }

    async getIndex(req: Request, res: Response) {

        let products: Product[] = await this.productRepository.fetchAll();
        console.log("ProductController.ts: ", products);
        res.render("shop/index.ejs", {
            prods: products,
            pageTitle: "Shop",
            path: "/",
            hasProducts: products.length > 0,
            activeShop: true,
            productCSS: true
        });
    }

}