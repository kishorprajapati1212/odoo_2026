import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./COMMON/auth/Login";
import AppLayout from "./COMMON/layout/AppLayout";
import AuthGuard from "./COMMON/auth/AuthGuard";
import EmployeeDashboard from "./COMMON/dashboard/employee/EmployeeDashboard";
import AdminDashboard from "./COMMON/dashboard/admin/AdminDashboard";
import NotFound from "./COMMON/shared/components/NotFound";
import Home from "./COMMON/home/Home";
import Register from "./COMMON/auth/Register";
import AuthGate from "./COMMON/auth/AuthGate";
import CompleteProfile from "./EMPLOYEE/onboarding/CompleteProfile"
import EmployeeLeavePage from "./COMMON/dashboard/EmployeeLeavePage";
import PayrollView from "./EMPLOYEE/payroll/PayrollView";
import EmployeeList from "./ADMIN/admin/EmployeeList";
import LeaveApprovalComponent from "./ADMIN/admin_leave/LeaveApprovalComponent";
import PayrollManagementComponent from "./ADMIN/admin_payroll/PayrollManagement";

export const router = createBrowserRouter([
  /* ROOT REDIRECT */
  {
    path: "/",
    element: <Home />
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/register",
    element: <Register />
  },

  {
    element: <AppLayout />,
    errorElement: <NotFound />,   // ✅ custom error UI
    children: [
      {
        path: "/employee",
        element: (
          <AuthGuard allowedRoles={["EMPLOYEE"]}>
            <AuthGate>
              <EmployeeDashboard />
            </AuthGate>
          </AuthGuard>
        ),
      },
      {
        path: "/employee/leaves",
        element: (
          <AuthGuard allowedRoles={["EMPLOYEE"]}>
            <EmployeeLeavePage />
          </AuthGuard>
        ),
      },
      {
        path: "/employee/payroll",
        element: (
          <AuthGuard allowedRoles={["EMPLOYEE"]}>
            <PayrollView />
          </AuthGuard>
        ),
      },      
      {
        path: "/complete-profile",
        element: (
          <AuthGuard allowedRoles={["EMPLOYEE"]}>
            <CompleteProfile />
          </AuthGuard>
        ),
      },
      
      {
        path: "/admin",
        element: (
          <AuthGuard allowedRoles={["ADMIN"]}>
            <AdminDashboard />
          </AuthGuard>
        ),
      },
      {
        path: "/admin/employees",
        element: (
          <AuthGuard allowedRoles={["ADMIN", "HR"]}>
            <EmployeeList />
          </AuthGuard>
        ),
      },
      {
        path: "/admin/leaves",
        element: (
          <AuthGuard allowedRoles={["ADMIN", "HR"]}>
            <LeaveApprovalComponent />
          </AuthGuard>
        ),
      },
      {
        path: "/admin/payroll",
        element: (
          <AuthGuard allowedRoles={["ADMIN", "HR"]}>
            <PayrollManagementComponent />
          </AuthGuard>
        ),
      }
      
    ],
  },

  /* CATCH-ALL */
  {
    path: "*",
    element: <NotFound />,
  },
]);
