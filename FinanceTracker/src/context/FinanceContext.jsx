import React, { createContext, useState, useCallback } from "react";

export const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = useCallback((transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  }, []);

  const removeTransaction = useCallback((index) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((_, i) => i !== index)
    );
  }, []);

  return (
    <FinanceContext.Provider
      value={{ transactions, addTransaction, removeTransaction }}
    >
      {children}
    </FinanceContext.Provider>
  );
};
