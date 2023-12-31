import dotenv from "dotenv";
dotenv.config();

export const coingeckoHeaders = {
  "Content-Type": "application/json",
  "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
};

export const coingeckoApiUrl = process.env.COINGECKO_API_URL!;
