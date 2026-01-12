import { Router } from "express";
const facebookPostRoutes = Router();
facebookPostRoutes.get("/", (req, res) => {
    res.send("facebookPostRoutes")
})
export { facebookPostRoutes }