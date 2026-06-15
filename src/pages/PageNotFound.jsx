import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50">
      <h1 className="text-8xl font-bold text-black">404</h1>

      <h2 className="text-2xl font-semibold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-500 mt-2">
        The page you are looking for does not exist.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-black text-white px-5 py-2 rounded"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}

export default NotFound;