import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sidebar">

      <h2>EmployeeHub</h2>

      <nav>

        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Dashboard
        </Link>

        <Link
          to="/employees"
          className={
            location.pathname === "/employees"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Employees
        </Link>

        <Link
          to="/employees/add"
          className={
            location.pathname === "/employees/add"
              ? "nav-link active"
              : "nav-link"
          }
        >
          Add Employee
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;