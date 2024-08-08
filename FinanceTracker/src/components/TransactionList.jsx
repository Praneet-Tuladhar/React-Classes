import { useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const TransactionList = () => {
  const { transactions, removeTransaction } = useContext(FinanceContext);

  return (
    <div className="transaction-list-container">
      <h2>Transaction List</h2>
      <ul className="transaction-list">
        {transactions.map((transaction, index) => (
          <li key={index} className="transaction-item">
            <span className="transaction-description">
              {transaction.description}
            </span>
            <span className="transaction-amount">
              ${transaction.amount.toFixed(2)}
            </span>
            <button
              className="delete-button"
              onClick={() => removeTransaction(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
