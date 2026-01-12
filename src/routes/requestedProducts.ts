import { Router } from "express";
const requestedProductRoutes = Router();
requestedProductRoutes.get("/", (req, res) => {
    res.send("requestedProductRoutes")
})
export { requestedProductRoutes }