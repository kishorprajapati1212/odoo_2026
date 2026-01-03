import { clearAuth } from "../shared/utils/token";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <header className="h-14 bg-white border-b flex items-center justify-between px-6">
      <span className="font-semibold text-gray-700">
  {new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}
</span>

      <button
        onClick={logout}
        className="
          px-4 py-1.5
          border border-red-500
          text-red-600
          rounded
          text-sm
          cursor-pointer
          hover:bg-red-50
          transition
        "
      >
        Logout
      </button>
    </header>
  );
};

export default Topbar;
