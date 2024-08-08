import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const useTransactions = () => {
  const { transactions, addTransaction, removeTransaction } =
    useContext(FinanceContext);
  return { transactions, addTransaction, removeTransaction };
};

export default useTransactions;
