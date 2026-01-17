import { Router } from "express";
import { RequestedProductsController } from "../controllers/requestedProductsController.js";
const requestedProductRoutes = Router();
const requestedProductsController = new RequestedProductsController()
requestedProductRoutes.post("/", requestedProductsController.create)
requestedProductRoutes.patch("/", requestedProductsController.update)
export { requestedProductRoutes }