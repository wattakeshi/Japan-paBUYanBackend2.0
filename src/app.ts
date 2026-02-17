import cors from "cors"
import express from "express"
import "dotenv/config";
const nodemailer = require("nodemailer");
const app = express();
import { router } from "./routes/index.js"
app.use(cors())
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Servidor funcionando")
})
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log("app rodando na porta 3000")
})
app.use(router)

const transporter = nodemailer.createTransport({
    host: "smtp.example.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});