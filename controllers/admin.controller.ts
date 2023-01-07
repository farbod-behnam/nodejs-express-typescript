import { Inject, Service } from "typedi";
import { Request, Response } from "express";
import { ProductFileRepository } from "../repositories/productFile.repository";
import { Repository } from "../repositories/repository";
import { Product } from "../models/product";


@Service()
export class AdminController {

    @Inject(() => ProductFileRepository)
    private readonly productRepository!: Repository<Product>;

    constructor(productRepository: Repository<Product>) {
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
        let product: Product = new Product(req.body.title);
        this.productRepository.save(product);
        res.redirect("/");
    }
}