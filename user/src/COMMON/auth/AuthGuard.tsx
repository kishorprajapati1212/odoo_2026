import { Navigate } from "react-router-dom";
import { getToken } from "../shared/utils/token";
import { getRole } from "../shared/utils/role";

interface Props {
  children: React.ReactElement;
  allowedRoles?: string[];
}

const AuthGuard = ({ children, allowedRoles }: Props) => {
  const token = getToken();
  const role = getRole();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role || "")) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
