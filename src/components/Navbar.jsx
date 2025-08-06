
import { NavLink } from "react-router-dom";


function Navbar() {
  return (
    <nav>
      <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
        Task List
      </NavLink>
      <NavLink to="/add" className={({ isActive }) => (isActive ? "active" : "")}>
        Add Task
      </NavLink>
    </nav>
  );
}

export default Navbar;
