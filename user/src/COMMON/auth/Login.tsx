import { useState } from "react";
import { loginUser } from "./auth.service";
import { setToken } from "../shared/utils/token";
import { setRole } from "../shared/utils/role";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await loginUser({ email, password });

      setToken(res.token);
      setRole(res.role);

      navigate(res.role === "ADMIN" ? "/admin" : "/employee");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen bg-[#F8F7F6] flex items-center justify-center ">
      <div className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Dayflow HRMS Login
        </h2>

        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <input
          className="w-full border p-2 mb-3 rounded"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full border p-2 mb-4 rounded"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          disabled={loading}
          onClick={handleLogin}
          className="w-full bg-[#714B67] text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
        <p className="text-sm text-center mt-4">
          New user?{" "}
          
          <Link to="/register" className="text-[#714B67] underline">
            Create account
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
