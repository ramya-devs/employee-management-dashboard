import type { Employee } from "../types/employee";

const API_URL =
  "https://employee-management-api-lq0g.onrender.com/employees";

// GET ALL EMPLOYEES
export async function getEmployees(): Promise<Employee[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch employees");
  }

  return response.json();
}

// GET ONE EMPLOYEE
export async function getEmployeeById(
  id: number
): Promise<Employee> {
  const response = await fetch(`${API_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Employee not found");
  }

  return response.json();
}

// ADD EMPLOYEE
export async function addEmployee(
  employee: Omit<Employee, "id">
): Promise<Employee> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(employee),
  });

  if (!response.ok) {
    throw new Error("Failed to add employee");
  }

  return response.json();
}

// UPDATE EMPLOYEE
export async function updateEmployee(
  employee: Employee
): Promise<Employee> {
  const response = await fetch(
    `${API_URL}/${employee.id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update employee");
  }

  return response.json();
}

// DELETE EMPLOYEE
export async function deleteEmployee(
  id: number
): Promise<void> {
  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
}