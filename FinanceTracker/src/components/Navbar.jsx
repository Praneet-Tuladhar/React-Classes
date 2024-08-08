import { Link, NavLink } from "react-router-dom";

const Navbar = () => (
  <div className="navbar">
    <NavLink exact to="/" activeClassName="active">
      Home
    </NavLink>
    <NavLink to="/add" activeClassName="active">
      Add Transaction
    </NavLink>
    <NavLink to="/transactions" activeClassName="active">
      Transactions List
    </NavLink>
    <NavLink to="/reports" activeClassName="active">
      Reports
    </NavLink>
    <NavLink to="/addexp" activeClassName="active">
      Add Expenditure
    </NavLink>{" "}
  </div>
);

export default Navbar;
