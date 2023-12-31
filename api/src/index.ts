import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import converterRouter from "./routes/converter";
import { ErrorHandler } from "./middlewares";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Crypto Converter API",
      version: "1.0.0",
      description: "A simple crypto converter API",
    },
    servers: [
      {
        url: "https://currency-converter-gtp4jrn7b-manrajs-projects.vercel.app",
        name: "Production",
      },
      {
        url: "http://localhost:8080",
        name: "Development",
      },
    ],
    "x-server-names": ["Production", "Development"],
  },
  apis: ["./src/controllers/*.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/api", (req, res) => {
  res.status(200).json("Welcome to the Crypto Converter API");
});

app.use("/api", converterRouter);

app.use(ErrorHandler);

app.listen(port, () => {
  console.log(`Server is up and running at ${port} 🔥`);
});

export default app;
