import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json(process.env.COINGECKO_API_KEY);
  console.log(process.env.COINGECKO_API_KEY);
});

app.listen(port, () => {
  console.log(`Server is up and running at ${port} 🔥`);
});
