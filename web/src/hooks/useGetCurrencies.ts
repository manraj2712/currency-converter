import { useEffect, useState } from "react";
import { PROD_API_URL } from "../constants";
import { Coin } from "../types/coins";
import axios from "axios";
import toast from "react-hot-toast";

function useGetCurrencies() {
  const [data, setData] = useState<{
    coins: Coin[];
    currencies: string[];
  } | null>(null);

  useEffect(() => {
    axios
      .get(`${PROD_API_URL}/get-currencies`)
      .then((response) => {
        console.log(`${PROD_API_URL}/get-currencies`);
        setData(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching currencies");
        console.error(error);
      });
  }, []);

  return data;
}

export default useGetCurrencies;
