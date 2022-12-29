import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { CoinList } from "./config/api";

const Crypto = createContext();

const CryptoContext = ({ children }) => {
  const [currency, setCurrency] = useState("IDR");
  const [symbol, setSymbol] = useState("Rp");
  const [koin, setKoin] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });

  const fetchCoins = async () => {
    const { data } = await axios.get(CoinList(currency));

    setKoin(data);
    setLoading(false);
  };

  useEffect(() => {
    if (currency === "IDR") setSymbol("Rp");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);

  return (
    <Crypto.Provider
      value={{
        currency,
        symbol,
        setCurrency,
        koin,
        loading,
        fetchCoins,
        alert,
        setAlert,
      }}
    >
      {children}
    </Crypto.Provider>
  );
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(Crypto);
};
