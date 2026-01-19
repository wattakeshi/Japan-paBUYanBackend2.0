import express from "express";
import cors from "cors";
import { customerRoutes } from "./costumers.js";
import { facebookPostRoutes } from "./facebookPosts.js";
import { AdminRouter } from "./Admin.js";
import { requestedProductRoutes } from "./requestedProducts.js";
import { wishlistRoutes } from "./wishlists.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { wishlistController } from "../controllers/wishlistController.js";
import { RequestedProductsController } from "../controllers/requestedProductsController.js";
const router = Router()
const WishlistController = new wishlistController()
const requestedProductController = new RequestedProductsController()
router.use("/customers", customerRoutes);
router.use("/facebookposts", facebookPostRoutes);
router.use("/requestedproducts", requestedProductRoutes);
router.use("/wishlists", wishlistRoutes);
router.use("/admin", AdminRouter);
router.get('/admin/wishlists', authMiddleware, WishlistController.getAdminDashboard);
router.patch('/admin/wishlists/:id', authMiddleware, WishlistController.updateWishlistStatus);
router.patch('/admin/products/:id', authMiddleware, requestedProductController.updateProduct);

export { router };