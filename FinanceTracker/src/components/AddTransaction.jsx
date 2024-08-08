import { useState, useRef, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const AddTransaction = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const descriptionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({ description, amount: parseFloat(amount) });
    setDescription("");
    setAmount("");
    descriptionRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        ref={descriptionRef}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
};

export default AddTransaction;
