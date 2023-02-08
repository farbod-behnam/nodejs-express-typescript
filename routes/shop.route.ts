import express, { Request, Response } from "express";
import Container from "typedi";
import { ShopController } from "../controllers/shop.controller";


export const shopRoutes = express.Router();


const shopController = Container.get(ShopController);


shopRoutes.get("/", (req: Request, res: Response) => shopController.getIndex(req, res));
shopRoutes.get("/products", (req: Request, res: Response) => shopController.getProducts(req, res));
shopRoutes.get("/products/:id", (req: Request, res: Response) => shopController.getProduct(req, res));
shopRoutes.get("/cart", (req: Request, res: Response) => shopController.getCart(req, res));
shopRoutes.post("/cart", (req: Request, res: Response) => shopController.postCart(req, res));
shopRoutes.get("/orders", (req: Request, res: Response) => shopController.getOrders(req, res));
shopRoutes.get("/checkout", (req: Request, res: Response) => shopController.getCheckout(req, res));