import { Router } from "express";
import { AdminController } from "../controllers/AdminController.js";
const AdminRouter = Router();
const adminController = new AdminController()
AdminRouter.post("/login", adminController.login)
export { AdminRouter }