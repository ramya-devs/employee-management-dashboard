import { useEffect, useState } from "react";

import {
  Link,
  useParams,
} from "react-router-dom";

import type { Employee } from "../types/employee";

import {
  getEmployeeById,
} from "../services/employeeService";

function EmployeeDetails() {
  const { id } = useParams();

  const [employee, setEmployee] =
    useState<Employee | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const foundEmployee =
          await getEmployeeById(
            Number(id)
          );

        setEmployee(foundEmployee);
      } catch {
        setEmployee(null);
        setError(
          "Employee not found."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  if (loading) {
    return (
      <div className="loading-state">

        <h2>
          Loading employee...
        </h2>

        <p>
          Please wait.
        </p>

      </div>
    );
  }

  if (error || !employee) {
    return (
      <div className="error-state">

        <h2>
          Employee Not Found
        </h2>

        <p>
          The employee you're looking
          for doesn't exist.
        </p>

        <Link to="/employees">
          Back to Employees
        </Link>

      </div>
    );
  }

  return (
    <div className="details-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h1>
            Employee Details
          </h1>

          <p>
            View employee information.
          </p>

        </div>

        <Link
          to={`/employees/edit/${employee.id}`}
          className="add-button"
        >
          Edit Employee
        </Link>

      </div>

      {/* Employee Details Card */}

      <div className="details-card">

        <div className="profile-section">

          <div className="avatar">

            {employee.name
              .charAt(0)
              .toUpperCase()}

          </div>

          <div>

            <h2>
              {employee.name}
            </h2>

            <p>
              {employee.position}
            </p>

          </div>

        </div>

        <div className="details-grid">

          <div>
            <span>
              Employee ID
            </span>

            <strong>
              #{employee.id}
            </strong>
          </div>

          <div>
            <span>
              Email
            </span>

            <strong>
              {employee.email}
            </strong>
          </div>

          <div>
            <span>
              Phone
            </span>

            <strong>
              {employee.phone}
            </strong>
          </div>

          <div>
            <span>
              Department
            </span>

            <strong>
              {employee.department}
            </strong>
          </div>

          <div>
            <span>
              Position
            </span>

            <strong>
              {employee.position}
            </strong>
          </div>

          <div>
            <span>
              Joining Date
            </span>

            <strong>
              {employee.joiningDate}
            </strong>
          </div>

          <div>
            <span>
              Annual Salary
            </span>

            <strong>
              ₹
              {employee.salary.toLocaleString(
                "en-IN"
              )}
            </strong>
          </div>

          <div>
            <span>
              Status
            </span>

            <strong>

              <span
                className={
                  employee.status === "Active"
                    ? "status active-status"
                    : "status inactive-status"
                }
              >
                {employee.status}
              </span>

            </strong>

          </div>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDetails;