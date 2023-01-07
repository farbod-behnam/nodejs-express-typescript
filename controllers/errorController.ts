import { NextFunction, Request, Response } from "express";

export class ErrorController {

    get404(req: Request, res: Response, next: NextFunction): void {
        res.status(404).render("not-found.ejs", { pageTitle: "Page Not Found" });
    }

}