import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addEmployee,
} from "../services/employeeService";

function AddEmployee() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      department: "",
      position: "",
      joiningDate: "",
      salary: "",
      status:
        "Active" as
          | "Active"
          | "Inactive",
    });

  const [errors, setErrors] =
    useState<
      Record<string, string>
    >({});

  const [submitting, setSubmitting] =
    useState(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement |
        HTMLSelectElement
    >
  ) => {
    const {
      name,
      value,
    } = event.target;

    setFormData(
      (previous) => ({
        ...previous,
        [name]: value,
      })
    );

    setErrors(
      (previous) => ({
        ...previous,
        [name]: "",
      })
    );
  };

  const validateForm = () => {
    const newErrors:
      Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name =
        "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !/^\S+@\S+\.\S+$/.test(
        formData.email
      )
    ) {
      newErrors.email =
        "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        "Phone number is required";
    } else if (
      !/^\d{10}$/.test(
        formData.phone
      )
    ) {
      newErrors.phone =
        "Phone number must contain exactly 10 digits";
    }

    if (!formData.department) {
      newErrors.department =
        "Please select a department";
    }

    if (!formData.position.trim()) {
      newErrors.position =
        "Position is required";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate =
        "Joining date is required";
    }

    if (!formData.salary) {
      newErrors.salary =
        "Salary is required";
    } else if (
      Number(formData.salary) <= 0
    ) {
      newErrors.salary =
        "Salary must be greater than 0";
    }

    setErrors(newErrors);

    return (
      Object.keys(newErrors)
        .length === 0
    );
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);

      await addEmployee({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        department:
          formData.department,
        position:
          formData.position,
        joiningDate:
          formData.joiningDate,
        salary:
          Number(formData.salary),
        status:
          formData.status,
      });

      alert(
        "Employee added successfully!"
      );

      navigate("/employees");
    } catch {
      alert(
        "Failed to add employee. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-page">

      <div className="page-header">

        <div>

          <h1>
            Add Employee
          </h1>

          <p>
            Create a new employee record.
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
            placeholder="Enter employee name"
            value={formData.name}
            onChange={handleChange}
          />

          {errors.name && (
            <span className="error">
              {errors.name}
            </span>
          )}

        </div>

        <div className="form-group">

          <label>
            Email
          </label>

          <input
            type="email"
            name="email"
            placeholder="Enter email address"
            value={formData.email}
            onChange={handleChange}
          />

          {errors.email && (
            <span className="error">
              {errors.email}
            </span>
          )}

        </div>

        <div className="form-group">

          <label>
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            placeholder="Enter 10 digit phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          {errors.phone && (
            <span className="error">
              {errors.phone}
            </span>
          )}

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

            <option value="">
              Select department
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

          {errors.department && (
            <span className="error">
              {errors.department}
            </span>
          )}

        </div>

        <div className="form-group">

          <label>
            Position
          </label>

          <input
            type="text"
            name="position"
            placeholder="e.g. Software Developer"
            value={
              formData.position
            }
            onChange={handleChange}
          />

          {errors.position && (
            <span className="error">
              {errors.position}
            </span>
          )}

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

          {errors.joiningDate && (
            <span className="error">
              {errors.joiningDate}
            </span>
          )}

        </div>

        <div className="form-group">

          <label>
            Annual Salary
          </label>

          <input
            type="number"
            name="salary"
            placeholder="Enter annual salary"
            value={
              formData.salary
            }
            onChange={handleChange}
          />

          {errors.salary && (
            <span className="error">
              {errors.salary}
            </span>
          )}

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
            disabled={submitting}
          >
            {submitting
              ? "Adding..."
              : "Add Employee"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default AddEmployee;