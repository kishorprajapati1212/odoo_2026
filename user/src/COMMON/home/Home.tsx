import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-[#F8F7F6] flex flex-col">
      {/* Header */}
      <header className="bg-[#714B67] text-white px-8 py-4 flex justify-between">
        <h1 className="text-xl font-semibold">Dayflow HRMS</h1>
        <Link
          to="/login"
          className="bg-white text-[#714B67] px-4 py-1 rounded text-sm"
        >
          Login
        </Link>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Every Workday, Perfectly Aligned
          </h2>
          <p className="text-gray-600 mb-6">
            Dayflow is a modern Human Resource Management System that
            simplifies employee management, attendance, leave, and payroll
            with a clean and efficient workflow.
          </p>

          <Link
            to="/login"
            className="bg-[#714B67] text-white px-6 py-3 rounded"
          >
            Get Started
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-sm text-gray-500 py-4">
        © {new Date().getFullYear()} Dayflow HRMS
      </footer>
    </div>
  );
};

export default Home;
