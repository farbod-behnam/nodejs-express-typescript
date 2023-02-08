export class Product {

    id!: string;
    title!: string;
    imageUrl!: string;
    description!: string;
    price!: number;

    constructor (id: string, title: string, imageUrl: string, description: string, price: number) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    
}