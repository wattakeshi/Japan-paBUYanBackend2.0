import { Router } from "express";
import { wishlistController } from "../controllers/wishlistController.js";
const wishlistRoutes = Router();
const WishlistController = new wishlistController()
wishlistRoutes.post("/", WishlistController.create)
wishlistRoutes.patch("/", WishlistController.update)
wishlistRoutes.put("/", WishlistController.update)


export { wishlistRoutes }