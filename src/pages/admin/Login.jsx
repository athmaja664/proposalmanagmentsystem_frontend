import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../../services/allAPI";

function Login() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    if (!adminData.email || !adminData.password) {
      alert("Please fill the Form");
      return;
    }

    try {
      const response = await adminLoginAPI(adminData);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("admin", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        alert("Invalid Credential");
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE IMAGE PANEL */}
      <div className="w-1/2 relative hidden md:block">

        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Images/login_background.jpg')",
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />

        {/* Text Content */}
        <div className="relative z-10 h-full flex flex-col justify-center px-12 text-white">

          <h1 className="text-4xl font-bold mb-4">
            Welcome Admin 👋
          </h1>

          <p className="text-white/80 text-sm leading-6 max-w-md">
            Manage your proposals, track updates, and control all system
            activities from one place. Simple, fast, and secure dashboard
            experience.
          </p>

        </div>
      </div>

      {/* RIGHT SIDE LOGIN FORM */}
     {/* RIGHT SIDE LOGIN FORM */}
<div className="w-full md:w-1/2 flex items-center justify-center bg-white">

        <div className="w-80">

          <h2 className="text-3xl font-bold text-center text-black-600 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
      Sign in to manage your proposals
    </p>

          {/* Email */}
          <div className="flex items-center border border-gray-900 rounded-lg px-3 py-2 mb-4 bg-gray-50">
            <span className="text-gray-400 mr-2">✉</span>
            <input
              type="email"
              placeholder="admin@company.com"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-900 rounded-lg px-3 py-2 mb-6 bg-gray-50">
            <span className="text-gray-400 mr-2">🔒</span>
            <input
              type="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
            />
          </div>

          {/* Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-full tracking-widest text-sm font-semibold hover:bg-gray-900 transition"
          >
            SIGN IN
          </button>

        </div>
</div>
    </div>
  );
}

export default Login;