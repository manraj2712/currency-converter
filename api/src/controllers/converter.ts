import { CustomError, coingeckoHeaders } from "../utils";
import { BigPromise } from "../middlewares";
import axios from "axios";

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
 *       '400':
 *         description: Bad Request
 *       '500':
 *         description: Internal Server Error
 */

export const convertTokenToCurrencyController = BigPromise(
  async (req, res, next) => {
    const { from, to, amount } = req.params;

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from.toLowerCase()}&vs_currencies=${to.toLowerCase()}`,
      {
        headers: coingeckoHeaders,
      }
    );

    const result = response.data[from][to] * parseFloat(amount);

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
 *       '500':
 *         description: Internal Server Error
 */

export const getCurrenciesController = BigPromise(async (req, res, next) => {
  const response = await Promise.all([
    axios.get(
      "https://api.coingecko.com/api/v3/simple/supported_vs_currencies",
      {
        headers: coingeckoHeaders,
      }
    ),

    // fetching top 100 coins by market cap
    axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&locale=en",
      {
        headers: coingeckoHeaders,
      }
    ),
  ]);

  if (response[0].status !== 200 || response[1].status !== 200) {
    return next(new CustomError("Something went wrong", 500));
  }

  const currencies = await response[0].data;
  const coins = await response[1].data;

  const coinsWithLogo = coins.map((coin: any) => {
    return {
      id: coin.id,
      name: coin.name,
      symbol: coin.symbol,
      image: coin.image,
    };
  });

  return res.status(200).json({ currencies, coins: coinsWithLogo });
});
