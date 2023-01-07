
import express, { Request, Response } from "express";
import Container from "typedi";
import { AdminController } from "../controllers/admin.controller";



export const adminRoutes = express.Router();

const ADMINPATH: string = "/admin";



const adminController = Container.get(AdminController);


// /admin/add-product => GET
adminRoutes.get(ADMINPATH + "/add-product", (req: Request, res: Response) => adminController.getAddProduct(req, res));

// /admin/product-list => GET
adminRoutes.get("/products");

adminRoutes.post(ADMINPATH + "/add-product", (req: Request, res: Response) => adminController.postAddProduct(req, res));


