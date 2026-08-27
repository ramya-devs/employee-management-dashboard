import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AddEmployee from "./pages/AddEmployee";
import EmployeeDetails from "./pages/EmployeeDetails";
import EditEmployee from "./pages/EditEmployee";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        <Sidebar />

        <main className="main-content">

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/employees"
              element={<Employees />}
            />

            <Route
              path="/employees/add"
              element={<AddEmployee />}
            />

            <Route
              path="/employees/:id"
              element={<EmployeeDetails />}
            />

            <Route
              path="/employees/edit/:id"
              element={<EditEmployee />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;