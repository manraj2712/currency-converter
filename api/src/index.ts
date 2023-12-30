import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import converterRouter from "./routes/converter";
import { ErrorHandler } from "./middlewares";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(301).redirect("/api");
});

app.get("/api", (req, res) => {
  res.status(200).json("Welcome to the Crypto Converter API");
});

app.use("/api", converterRouter);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is up and running at ${port} 🔥`);
});
