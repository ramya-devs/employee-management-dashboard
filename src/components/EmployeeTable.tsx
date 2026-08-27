import {
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Employee } from "../types/employee";

interface EmployeeTableProps {
  employees: Employee[];
  onDelete: (id: number) => void;
}

function EmployeeTable({
  employees,
  onDelete,
}: EmployeeTableProps) {

  if (employees.length === 0) {
    return (
      <div className="employee-table-container">

        <p className="no-results">
          No employees found.
        </p>

      </div>
    );
  }

  return (
    <div className="employee-table-container">

      <table>

        <thead>

          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Position</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>

        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr key={employee.id}>

              <td>
                #{employee.id}
              </td>

              <td>
                <strong>
                  {employee.name}
                </strong>
              </td>

              <td>
                {employee.email}
              </td>

              <td>
                {employee.department}
              </td>

              <td>
                {employee.position}
              </td>

              <td>

                <span
                  className={
                    employee.status === "Active"
                      ? "status active-status"
                      : "status inactive-status"
                  }
                >
                  {employee.status}
                </span>

              </td>

              <td>

                <div className="actions">

                  <Link
                    to={`/employees/${employee.id}`}
                    title="View employee"
                  >
                    <Eye size={18} />
                  </Link>

                  <Link
                    to={`/employees/edit/${employee.id}`}
                    title="Edit employee"
                  >
                    <Pencil size={18} />
                  </Link>

                  <button
                    type="button"
                    title="Delete employee"
                    onClick={() =>
                      onDelete(employee.id)
                    }
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeTable;