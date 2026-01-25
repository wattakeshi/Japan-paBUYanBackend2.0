import { Router } from "express";
import { CustomerController } from "../controllers/customerController.js";
const customerRoutes = Router();
const customerController = new CustomerController()
customerRoutes.get("/:id", customerController.getUser)
customerRoutes.post("/", customerController.create)
customerRoutes.patch("/:id", customerController.remove)
customerRoutes.put("/:id", customerController.update)
export { customerRoutes }