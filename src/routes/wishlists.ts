import { Router } from "express";
const wishlistRoutes = Router();
wishlistRoutes.get("/", (req, res) => {
    res.send("wishlistRoutes")
})
export { wishlistRoutes }