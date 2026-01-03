import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-2">404</h1>
      <p className="mb-4 text-gray-600">
        Page not found
      </p>
      <Link
        to="/login"
        className="text-[#714B67] underline"
      >
        Go to Login
      </Link>
    </div>
  );
};

export default NotFound;
