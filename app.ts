import "reflect-metadata";

import express from "express";
import bodyParser from "body-parser";
import path from "path";

import { adminRoutes } from "./routes/admin.route";
import { shopRoutes } from "./routes/shop.route";
import { ErrorController } from "./controllers/error.controller";




const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));



app.use(adminRoutes);
app.use(shopRoutes);


app.use('*', new ErrorController().get404);

const port = 4200;

app.listen(port, () => {
    console.log("Server is listening on port " + port + "....");
    
});