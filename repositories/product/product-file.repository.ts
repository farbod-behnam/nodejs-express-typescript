import fs from "fs";
import path from "path";
import { Service } from "typedi";

import { Product } from "../../models/product.model";
import { ProductRepository } from "./product.repository";

@Service()
export class ProductFileRepository implements ProductRepository {



    save(product: Product): void {
        const createdFilePath = this.createProductFilePath();

        fs.readFile(createdFilePath, (error, fileContent) => {

            if (error)
                throw new Error(error.stack);

            this.saveToFile(fileContent, product, createdFilePath);
        });

    }


    async fetchAll(): Promise<Product[]> {

        const createdFilePath = this.createProductFilePath();

        return await this.getProductsFromFile(createdFilePath);

    }

    async findById(id: string): Promise<Product> {
        const products: Product[] = await this.fetchAll();

        return new Promise((resolve, rejects) => {
            for (let product of products) {
                if (product.id === id)
                    resolve(product);
            }
            rejects(undefined);
        })
    }



    private createProductFilePath(): string {
        if (process.mainModule?.filename == undefined)
            throw new Error("Path to project is not defined in process.mainModule.filename");

        return path.join(path.dirname(process.mainModule?.filename), "data", "product.json");
    }

    private parseJsonFile(fileContent: Buffer) {
        let products: Product[] = [];
        products = JSON.parse(fileContent.toString());
        return products;
    }

    private writeProductsToFileAsJson(createdFilePath: string, products: Product[]) {
        fs.writeFile(createdFilePath, JSON.stringify(products), (error) => {
            console.log("writeProductsToFileAsJson error message =>", error?.message);
            console.log("writeProductsToFileAsJson error stack =>", error?.stack);
        });
    }

    private saveToFile(fileContent: Buffer, product: Product, createdFilePath: string) {
        let products: Product[] = this.addProduct(fileContent, product);

        this.writeProductsToFileAsJson(createdFilePath, products);
    }

    private addProduct(fileContent: Buffer, product: Product) {
        let products: Product[] = this.parseJsonFile(fileContent);
        products.push(product);
        return products;
    }

    private async getProductsFromFile(filePath: string): Promise<Product[]> {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath, (error, fileContent) => {

                if (error)
                    reject(error.stack);

                let products: Product[] = this.parseJsonFile(fileContent);
                resolve(products);
            });
        });
    }

}