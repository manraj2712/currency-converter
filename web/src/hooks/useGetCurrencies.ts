import { useEffect, useState } from "react";
import { API_URL } from "../constants";
import { Coin } from "../types/coins";

function useGetCurrencies() {
  const [data, setData] = useState<{
    coins: Coin[];
    currencies: string[];
  } | null>(null);

  useEffect(() => {
    console.log("called api");
    fetch(`${API_URL}/get-currencies`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return data;
}

export default useGetCurrencies;
