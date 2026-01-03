import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../shared/utils/api";
import { getRole } from "../shared/utils/role";

const AuthGate = ({ children }: { children: React.ReactElement }) => {
  const [loading, setLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkEmployeeProfile = async () => {
      try {
        // 1️⃣ Get logged-in user
        const { data: user } = await api.get("/me");

        // 2️⃣ Try to fetch employee profile
        await api.get(`/employees/${user.user_id}`);

        // If success → profile exists
        setHasProfile(true);
      } catch {
        // If employee not found → profile missing
        setHasProfile(false);
      } finally {
        setLoading(false);
      }
    };

    if (getRole() === "EMPLOYEE") {
      checkEmployeeProfile();
    } else {
      setHasProfile(true);
      setLoading(false);
    }
  }, []);

  if (loading) return null;

  if (!hasProfile && getRole() === "EMPLOYEE") {
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
};

export default AuthGate;
