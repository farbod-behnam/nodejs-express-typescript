import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ProductFileRepository } from "../repositories/product/product-file.repository";
import { ProductRepository } from "../repositories/product/product.repository";
import { Product } from "../models/product.model";


@Service()
export class AdminController {

    @Inject(() => ProductFileRepository)
    private readonly productRepository!: ProductRepository;

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository;
    }
        getAddProduct(req: Request, res: Response): void {
        res.render("admin/add-product.ejs", {
            pageTitle: "Add Product",
            path: "/admin/add-product",
            formsCSS: true,
            productCSS: true,
            activeAddProduct: true
        });


    }

    postAddProduct(req: Request, res: Response): void {

        const id: string = Math.random().toString();
        const title: string = req.body.title;
        const imageUrl: string = req.body.imageUrl;
        const description: string = req.body.description;
        const price: number = req.body.price;

        let product: Product = new Product(id, title, imageUrl, description, price);
        this.productRepository.save(product);
        res.redirect("/");

    }

        async getProducts(req: Request, res: Response): Promise<void> {

        let products: Product[] = await this.productRepository.fetchAll();
        console.log("AdminController.ts: ", products);
        res.render("admin/product-list.ejs", {
            prods: products,
            pageTitle: "Admin Products",
            path: "/admin/products"
        });

    }
}