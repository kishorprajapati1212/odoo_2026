import { NavLink } from "react-router-dom";
import { getRole } from "../shared/utils/role";

const Sidebar = () => {
  const role = getRole();

  const linkClass = ({ isActive }) =>
    `flex items-center px-5 py-3 rounded-lg text-base font-medium transition-all duration-200
     ${
       isActive
         ? "bg-white text-[#714B67] shadow-sm"
         : "text-white/90 hover:bg-white/15 hover:text-white"
     }`;

  return (
    <aside className="w-64 min-h-screen bg-[#714B67] px-4 py-6">
      {/* Logo / Title */}
      <h2 className="text-2xl font-bold text-white mb-10 tracking-wide">
        Dayflow HRMS
      </h2>

      {/* EMPLOYEE MENU */}
      {role === "EMPLOYEE" && (
        <nav className="space-y-3">
          <NavLink to="/employee" end className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/employee/leaves" className={linkClass}>
            Leave Management
          </NavLink>

          <NavLink to="/employee/payroll" className={linkClass}>
            Payroll & Salary
          </NavLink>
        </nav>
      )}

      {/* ADMIN MENU */}
      {role === "ADMIN" && (
        <nav className="space-y-3">
          <NavLink to="/admin" end className={linkClass}>
            Admin Dashboard
          </NavLink>

          <NavLink to="/admin/employees" className={linkClass}>
            Employees
          </NavLink>

          <NavLink to="/admin/leaves" className={linkClass}>
            Leave Approvals
          </NavLink>

          <NavLink to="/admin/payroll" className={linkClass}>
            Payroll Management
          </NavLink>
        </nav>
      )}
    </aside>
  );
};

export default Sidebar;
