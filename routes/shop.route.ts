import express, { Request, Response } from "express";
import Container from "typedi";
import { ShopController } from "../controllers/shop.controller";


export const shopRoutes = express.Router();


const shopController = Container.get(ShopController);


shopRoutes.get("/", (req: Request, res: Response) => shopController.getProducts(req, res));
shopRoutes.get("/products");
shopRoutes.get("/cart");
shopRoutes.get("/checkout");