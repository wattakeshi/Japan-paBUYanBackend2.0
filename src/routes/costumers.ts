import { Router } from "express";
import { CustomerController } from "../controllers/customerController.js";
const customerRoutes = Router();
const customerController = new CustomerController()
customerRoutes.get("/", (req, res) => {
    res.send("costumer")
})
customerRoutes.post("/", customerController.create)
customerRoutes.delete("/:id", customerController.remove)
export { customerRoutes }