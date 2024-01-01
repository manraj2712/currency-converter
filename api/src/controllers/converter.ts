import {
  CustomError,
  coingeckoApiUrl,
  coingeckoHeaders,
} from "../utils";
import { BigPromise } from "../middlewares";
import axios from "axios";
import { z } from "zod";
import { convertTokenToCurrencyInput } from "../zod";
/**
 * @swagger
 * /api/convert/{from}/{to}/{amount}:
 *   get:
 *     summary: Convert crypto to other currencies
 *     description: Convert crypto to other supported currencies
 *     parameters:
 *       - in: path
 *         name: from
 *         schema:
 *           type: string
 *         required: true
 *         description: The crypto to convert from
 *       - in: path
 *         name: to
 *         schema:
 *           type: string
 *         required: true
 *         description: The crypto to convert to
 *       - in: path
 *         name: amount
 *         schema:
 *           type: string
 *         required: true
 *         description: The amount to convert
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversion:
 *                   type: number
 *                 from:
 *                   type: string
 *                 to:
 *                   type: string
 *                 amount:
 *                   type: number
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

export const convertTokenToCurrencyController = BigPromise(
  async (req, res, next) => {
    const { from, to, amount } = req.params;

    const parsedAmount = parseFloat(amount);

    // zod vlaidation
    convertTokenToCurrencyInput.parse({
      from,
      to,
      amount: parsedAmount,
    });

    
    const response = await axios.get(
      `${coingeckoApiUrl}/simple/price?ids=${from.toLowerCase()}&vs_currencies=${to.toLowerCase()}`,
      {
        headers: coingeckoHeaders,
      }
    );

    const responseData = response.data;

    // Checking for API response validity
    if (!responseData || !responseData[from] || !responseData[from][to]) {
      throw new CustomError("Invalid response from the external API", 500);
    }

    const result = responseData[from][to] * parseFloat(amount);

    return res.status(200).json({
      conversion: result,
      from: from.toLowerCase(),
      to: to.toLowerCase(),
      amount: parseFloat(amount),
    });
  }
);

/**
 * @swagger
 * /api/get-currencies:
 *   get:
 *     summary: Get top 100 coins and supported currencies
 *     description: Get top 100 taken by market cap coins and supported currencies
 *     responses:
 *       '200':
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 currencies:
 *                   type: array
 *                   items:
 *                     type: string
 *                 coins:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       symbol:
 *                         type: string
 *                       image:
 *                         type: string
 *       '500':
 *         description: Internal Server Error
 */

export const getCurrenciesController = BigPromise(async (req, res, next) => {
  const getCoinParams = {
    vs_currency: "usd",
    order: "market_cap_desc",
    per_page: 100,
    page: 1,
    locale: "en",
  };

  const [supportedCurrenciesResponse, topCoinsResponse] = await Promise.all([
    axios.get(`${coingeckoApiUrl}/simple/supported_vs_currencies`, {
      headers: coingeckoHeaders,
    }),
    axios.get(
      `${coingeckoApiUrl}/coins/markets?vs_currency=${getCoinParams.vs_currency}&order=${getCoinParams.order}&per_page=${getCoinParams.per_page}&page=${getCoinParams.page}&locale=${getCoinParams.locale}`,
      {
        headers: coingeckoHeaders,
      }
    ),
  ]);

  if (
    supportedCurrenciesResponse.status !== 200 ||
    topCoinsResponse.status !== 200
  ) {
    throw new CustomError("Something went wrong", 500);
  }

  const supportedCurrencies = supportedCurrenciesResponse.data;
  const topCoins = topCoinsResponse.data;

  if (
    !supportedCurrencies ||
    !topCoins ||
    !Array.isArray(supportedCurrencies) ||
    !Array.isArray(topCoins)
  ) {
    throw new CustomError("Invalid response from the external API", 500);
  }

  const coinsWithLogo = topCoins.map(
    (coin: { id: string; name: string; symbol: string; image: string }) => ({
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
    })
  );

  return res
    .status(200)
    .json({ currencies: supportedCurrencies, coins: coinsWithLogo });
});
