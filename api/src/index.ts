import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import converterRouter from "./routes/converter";
import devCanvasRouter from "./routes/devCanvas";
import { ErrorHandler } from "./middlewares";
import swaggerUi from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import mongoose from "mongoose";

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

// connect to mongodb
mongoose.connect(process.env.MONGO_URL!).then(() => {
  console.log("Connected to MongoDB 🔥");
});

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
        url: process.env.PROD_API_URL!,
        name: "Production",
      },
      {
        url: "http://localhost:8080",
        name: "Development",
      },
    ],
  },
  apis: ["./src/controllers/*.ts"],
};

const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.redirect("/api-docs");
});

app.get("/api", (req, res) => {
  res.status(200).json("Welcome to the Crypto Converter API");
});

app.use("/api", converterRouter);

app.use("/api/dev-canvas", devCanvasRouter);

app.use(ErrorHandler);

const server = app.listen(port, () => {
  console.log(`Server is up and running at ${port} 🔥`);
});

export default app;

export { server };
