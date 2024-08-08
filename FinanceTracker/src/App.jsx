import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { FinanceProvider } from "./context/FinanceContext";
import Navbar from "./components/Navbar";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import Reports from "./components/Reports";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import AddExpenditure from "./components/AddExpenditure";

const App = () => (
  <FinanceProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddTransaction />} />
        <Route path="/transactions" element={<TransactionList />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/addexp" element={<AddExpenditure />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  </FinanceProvider>
);

export default App;
