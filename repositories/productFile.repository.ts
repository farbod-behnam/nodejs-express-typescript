import fs from "fs";
import path from "path";
import { Service } from "typedi";

import { Product } from "../models/product";
import { Repository } from "./repository";

@Service()
export class ProductFileRepository implements Repository<Product> {


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
            console.log(error);
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