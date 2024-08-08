import { useState, useRef, useContext } from "react";
import { FinanceContext } from "../context/FinanceContext";

const AddExpenditure = () => {
  const { addTransaction } = useContext(FinanceContext);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const descriptionRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const expenditureAmount =
      parseFloat(amount) > 0 ? -parseFloat(amount) : parseFloat(amount);
    addTransaction({ description, amount: expenditureAmount });
    setDescription("");
    setAmount("");
    descriptionRef.current.focus();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Expenditure Description"
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
      <button type="submit">Add Expenditure</button>
    </form>
  );
};

export default AddExpenditure;
