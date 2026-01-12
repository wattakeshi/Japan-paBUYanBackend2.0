import cors from "cors"
import express from "express"
import "dotenv/config";
const app = express();
import { router } from "./routes/index.js"
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Servidor funcionando")
})
const PORT = 3000;
app.listen(PORT, () => {
    console.log("app rodando na porta 3000")
})
app.use(router)