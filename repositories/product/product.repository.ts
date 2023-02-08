import { Product } from "../../models/product.model";

export interface ProductRepository {
    save(product: Product): void;
    fetchAll(): Promise<Product[]>;
    findById(id: string): Promise<Product>;
}