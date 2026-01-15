import { Router } from "express";
import { facebookPostController } from "../controllers/facebookPostController.js";
const FacebookPostController = new facebookPostController();
const facebookPostRoutes = Router();
facebookPostRoutes.post("/", FacebookPostController.create)
export { facebookPostRoutes }