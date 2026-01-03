import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../shared/utils/api";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post("/register", {
        email,
        password,
        role: "EMPLOYEE", // 🔒 forced from frontend
      });

      navigate("/login");
    } catch {
      setError("User already exists or invalid data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F7F6]">
      <div className="bg-white p-6 rounded w-80 shadow">
        <h2 className="text-lg font-semibold mb-4 text-center">
          Register – Dayflow HRMS
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
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-[#714B67] text-white p-2 rounded disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-[#714B67] underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
