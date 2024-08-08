import { useContext, useMemo } from "react";
import { FinanceContext } from "../context/FinanceContext";

const Reports = () => {
  const { transactions } = useContext(FinanceContext);

  const totalIncome = useMemo(
    () =>
      transactions
        .filter((t) => t.amount > 0)
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () =>
      transactions
        .filter((t) => t.amount < 0)
        .reduce((acc, t) => acc + t.amount, 0),
    [transactions]
  );
  const netBalance = useMemo(
    () => totalIncome + totalExpenses,
    [totalIncome, totalExpenses]
  );

  return (
    <div className="report-container">
      <h2>Financial Report</h2>
      <div className="report-section"></div>
      <div className="report-summary">
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
        <p>Net Balance: ${netBalance.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Reports;
