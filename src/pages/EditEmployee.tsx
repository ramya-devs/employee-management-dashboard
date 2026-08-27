import { useEffect, useState } from "react";

import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import type { Employee } from "../types/employee";

import {
  getEmployeeById,
  updateEmployee,
} from "../services/employeeService";

function EditEmployee() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState<Employee | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        setLoading(true);
        setError("");

        const employee =
          await getEmployeeById(
            Number(id)
          );

        setFormData(employee);
      } catch {
        setError(
          "Employee not found."
        );
      } finally {
        setLoading(false);
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement
    >
  ) => {
    if (!formData) {
      return;
    }

    const {
      name,
      value,
    } = event.target;

    setFormData({
      ...formData,

      [name]:
        name === "salary"
          ? Number(value)
          : value,
    });
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!formData) {
      return;
    }

    try {
      setSaving(true);

      await updateEmployee(
        formData
      );

      alert(
        "Employee updated successfully!"
      );

      navigate("/employees");
    } catch {
      alert(
        "Failed to update employee. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

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

  if (error || !formData) {
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
    <div className="form-page">

      <div className="page-header">

        <div>

          <h1>
            Edit Employee
          </h1>

          <p>
            Update employee information.
          </p>

        </div>

      </div>

      <form
        className="employee-form"
        onSubmit={handleSubmit}
      >

        <div className="form-group">

          <label>
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={
              formData.name
            }
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            value={
              formData.email
            }
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={
              formData.phone
            }
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Department
          </label>

          <select
            name="department"
            value={
              formData.department
            }
            onChange={handleChange}
          >

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

        </div>

        <div className="form-group">

          <label>
            Position
          </label>

          <input
            type="text"
            name="position"
            value={
              formData.position
            }
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Joining Date
          </label>

          <input
            type="date"
            name="joiningDate"
            value={
              formData.joiningDate
            }
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Annual Salary
          </label>

          <input
            type="number"
            name="salary"
            value={
              formData.salary
            }
            onChange={handleChange}
          />

        </div>

        <div className="form-group">

          <label>
            Status
          </label>

          <select
            name="status"
            value={
              formData.status
            }
            onChange={handleChange}
          >

            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="cancel-button"
            onClick={() =>
              navigate("/employees")
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            className="save-button"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default EditEmployee;