import { CustomError, coingeckoHeaders } from "../utils";
import { BigPromise } from "../middlewares";

export const convertTokenToCurrencyController = BigPromise(
  async (req, res, next) => {
    const { from, to, amount } = req.params;

    const response = await fetch(
      `https://api.coingecko.com/api/v3/simple/price?ids=${from.toLowerCase()}&vs_currencies=${to.toLowerCase()}`,
      {
        method: "GET",
        headers: coingeckoHeaders,
      }
    );

    const data = await response.json();

    const result = data[from][to] * parseFloat(amount);

    return res.status(200).json({
      conversion: result,
      from: from.toLowerCase(),
      to: to.toLowerCase(),
      amount: parseFloat(amount),
    });
  }
);

export const getCurrenciesController = BigPromise(async (req, res, next) => {
  const response = await Promise.all([
    fetch("https://api.coingecko.com/api/v3/simple/supported_vs_currencies", {
      method: "GET",
      headers: coingeckoHeaders,
    }),

    // fetching top 100 coins by market cap
    fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&locale=en",
      {
        method: "GET",
        headers: coingeckoHeaders,
      }
    ),
  ]);

  if (response[0].status !== 200 || response[1].status !== 200) {
    return next(new CustomError("Something went wrong", 500));
  }

  const currencies = await response[0].json();
  const coins = await response[1].json();

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
