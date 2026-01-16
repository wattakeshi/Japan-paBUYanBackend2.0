import { Router } from "express";
import { facebookPostController } from "../controllers/facebookPostController.js";
const FacebookPostController = new facebookPostController();
const facebookPostRoutes = Router();
facebookPostRoutes.post("/", FacebookPostController.create)
facebookPostRoutes.get("/", FacebookPostController.getAll)
facebookPostRoutes.put("/:id", FacebookPostController.update)
facebookPostRoutes.patch("/:id", FacebookPostController.update)
export { facebookPostRoutes }