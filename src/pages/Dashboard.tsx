import { useEffect, useState } from "react";
import { Users, UserCheck, UserX, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

import type { Employee } from "../types/employee";
import { employees as initialEmployees } from "../data/employees";

import StatCard from "../components/StatCard";

function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const storedEmployees = localStorage.getItem("employees");

    if (storedEmployees) {
      try {
        setEmployees(JSON.parse(storedEmployees) as Employee[]);
      } catch {
        setEmployees(initialEmployees);
      }
    } else {
      localStorage.setItem(
        "employees",
        JSON.stringify(initialEmployees)
      );

      setEmployees(initialEmployees);
    }
  }, []);

  const totalEmployees = employees.length;

  const activeEmployees = employees.filter(
    (employee) => employee.status === "Active"
  ).length;

  const inactiveEmployees = employees.filter(
    (employee) => employee.status === "Inactive"
  ).length;

  const departments = new Set(
    employees.map((employee) => employee.department)
  ).size;

  const departmentCounts = employees.reduce<Record<string, number>>(
    (counts, employee) => {
      counts[employee.department] =
        (counts[employee.department] || 0) + 1;

      return counts;
    },
    {}
  );

  const recentEmployees = [...employees]
    .sort(
      (a, b) =>
        new Date(b.joiningDate).getTime() -
        new Date(a.joiningDate).getTime()
    )
    .slice(0, 5);

  return (
    <>
      <header>
        <h1>Employee Dashboard</h1>

        <p>
          Manage your employees and company information.
        </p>
      </header>

      <section className="stats-grid">

        <StatCard
          title="Total Employees"
          value={totalEmployees}
          icon={<Users size={28} />}
        />

        <StatCard
          title="Active Employees"
          value={activeEmployees}
          icon={<UserCheck size={28} />}
        />

        <StatCard
          title="Inactive Employees"
          value={inactiveEmployees}
          icon={<UserX size={28} />}
        />

        <StatCard
          title="Departments"
          value={departments}
          icon={<Building2 size={28} />}
        />

      </section>

      <section className="dashboard-grid">

        {/* Department Distribution */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>Department Distribution</h2>

              <p>
                Employees by department
              </p>
            </div>

          </div>

          <div className="department-list">

            {Object.entries(departmentCounts).map(
              ([department, count]) => {

                const percentage =
                  totalEmployees > 0
                    ? Math.round(
                        (count / totalEmployees) * 100
                      )
                    : 0;

                return (
                  <div
                    className="department-item"
                    key={department}
                  >

                    <div className="department-info">

                      <span>
                        {department}
                      </span>

                      <strong>
                        {count}
                      </strong>

                    </div>

                    <div className="progress-background">

                      <div
                        className="progress-bar"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <small>
                      {percentage}% of employees
                    </small>

                  </div>
                );
              }
            )}

          </div>

        </div>

        {/* Recent Employees */}

        <div className="dashboard-card">

          <div className="card-header">

            <div>
              <h2>Recent Employees</h2>

              <p>
                Recently joined employees
              </p>
            </div>

            <Link to="/employees">
              View All
            </Link>

          </div>

          <div className="recent-employees">

            {recentEmployees.map((employee) => (

              <Link
                to={`/employees/${employee.id}`}
                className="recent-employee"
                key={employee.id}
              >

                <div className="employee-avatar">
                  {employee.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="recent-info">

                  <strong>
                    {employee.name}
                  </strong>

                  <span>
                    {employee.position}
                  </span>

                </div>

                <span
                  className={
                    employee.status === "Active"
                      ? "status active-status"
                      : "status inactive-status"
                  }
                >
                  {employee.status}
                </span>

              </Link>

            ))}

          </div>

        </div>

      </section>

      <section className="welcome-card">

        <h2>
          Welcome to EmployeeHub 👋
        </h2>

        <p>
          Use the employee management system to
          add, edit, view and manage employee records.
        </p>

        <Link to="/employees">
          <button>
            View Employees
          </button>
        </Link>

      </section>
    </>
  );
}

export default Dashboard;