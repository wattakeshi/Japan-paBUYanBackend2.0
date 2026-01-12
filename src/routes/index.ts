import express from "express";
import cors from "cors";
import { customerRoutes } from "./costumers.js";
import { facebookPostRoutes } from "./facebookPosts.js";
import { requestedProductRoutes } from "./requestedProducts.js";
import { wishlistRoutes } from "./wishlists.js";
import { Router } from "express";

const router = Router()

router.use("/customers", customerRoutes);
router.use("/facebookposts", facebookPostRoutes);
router.use("/requestedproducts", requestedProductRoutes);
router.use("/wishlists", wishlistRoutes);

export { router };