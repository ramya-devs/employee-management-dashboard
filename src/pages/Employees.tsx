import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

import type { Employee } from "../types/employee";

import EmployeeTable from "../components/EmployeeTable";

import {
  getEmployees,
  deleteEmployee,
} from "../services/employeeService";

function Employees() {
  const [employees, setEmployees] =
    useState<Employee[]>([]);

  const [search, setSearch] =
    useState("");

  const [department, setDepartment] =
    useState("All");

  const [status, setStatus] =
    useState("All");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const loadEmployees = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getEmployees();

      setEmployees(data);
    } catch {
      setError(
        "Unable to load employees. Please make sure the API server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this employee?"
      );

    if (!confirmed) {
      return;
    }

    try {
      await deleteEmployee(id);

      setEmployees(
        (previous) =>
          previous.filter(
            (employee) =>
              employee.id !== id
          )
      );
    } catch {
      alert(
        "Failed to delete employee. Please try again."
      );
    }
  };

  const filteredEmployees =
    employees.filter(
      (employee) => {

        const searchText =
          search.toLowerCase();

        const matchesSearch =
          employee.name
            .toLowerCase()
            .includes(searchText) ||
          employee.email
            .toLowerCase()
            .includes(searchText);

        const matchesDepartment =
          department === "All" ||
          employee.department ===
            department;

        const matchesStatus =
          status === "All" ||
          employee.status === status;

        return (
          matchesSearch &&
          matchesDepartment &&
          matchesStatus
        );
      }
    );

  if (loading) {
    return (
      <div className="loading-state">
        <h2>
          Loading employees...
        </h2>

        <p>
          Please wait.
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">

        <h2>
          Something went wrong
        </h2>

        <p>{error}</p>

        <button
          className="save-button"
          onClick={loadEmployees}
        >
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div className="employees-page">

      {/* Header */}

      <div className="page-header">

        <div>

          <h1>
            Employees
          </h1>

          <p>
            Manage all employee records.
          </p>

        </div>

        <Link
          to="/employees/add"
          className="add-button"
        >
          + Add Employee
        </Link>

      </div>

      {/* Filters */}

      <div className="filters">

        <div className="search-container">

          <Search size={20} />

          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
          />

        </div>

        <select
          className="filter-select"
          value={department}
          onChange={(event) =>
            setDepartment(
              event.target.value
            )
          }
        >

          <option value="All">
            All Departments
          </option>

          <option value="Engineering">
            Engineering
          </option>

          <option value="HR">
            HR
          </option>

          <option value="Finance">
            Finance
          </option>

          <option value="Marketing">
            Marketing
          </option>

          <option value="Sales">
            Sales
          </option>

        </select>

        <select
          className="filter-select"
          value={status}
          onChange={(event) =>
            setStatus(
              event.target.value
            )
          }
        >

          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>

        </select>

      </div>

      {/* Employee Table */}

      <EmployeeTable
        employees={filteredEmployees}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Employees;