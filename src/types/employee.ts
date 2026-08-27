export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
  position: string;
  joiningDate: string;
  salary: number;
  status: "Active" | "Inactive";
}