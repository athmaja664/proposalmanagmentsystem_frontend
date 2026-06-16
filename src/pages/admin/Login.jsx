import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../../services/allAPI";
import { RiFileList3Fill } from "react-icons/ri";
function Login() {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false)
  const handleLogin = async () => {
    ///const { email, password } = adminData;
    setLoading(true)
    if (!adminData.email || !adminData.password) {
      alert("Please fill the Form");
      return;
    }

    try {
      const response = await adminLoginAPI(adminData);//fn make api call

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
      setLoading(false)
    }
  };

  return (
  <div
  className="min-h-screen flex items-center justify-center "
  style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f2eded 50%, #b9c2b9 100%)' }}
>
    <div className="w-[80%] h-[80vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex">

    
      <div className="w-1/2 relative hidden md:block">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/Images/login_background.jpg')",
          
          }}
        />

        <div className="absolute inset-0 bg-black/60" />

       
  <div className="relative z-10 h-full flex flex-col px-12 text-white">

  
  <div className="pt-8 flex items-center gap-2 text-xl font-bold">
    <RiFileList3Fill />
    <span>ProposalHub</span>
  </div>

  <div className="flex-1 flex flex-col justify-center">
    <h1 className="text-3xl font-bold mb-4">
      Manage proposals,<br/>close deals faster.
    </h1>
    <p className="text-white/80 text-sm leading-6 max-w-md">
      Manage your proposals, track updates, and control all system
      activities from one place. Simple, fast, and secure dashboard
      experience.
    </p>
  </div>

</div>
      </div>

    
<div className="w-full md:w-1/2 flex items-center justify-center bg-white">

        <div className="w-80">

          <h2 className="text-3xl font-bold text-center text-black-600 mb-2">
            Admin Login
          </h2>
          <p className="text-gray-500 text-center text-sm mb-6">
      Sign in to manage your proposals
    </p>

        
         <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50 focus-within:border-[#1d9e75] focus-within:bg-white transition-all">

            <span className="text-gray-400 mr-2">✉</span>
            <input
              type="email"
              autoComplete="email"
               name="email"
              placeholder="Admin Email"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
            />
          </div>

     
          <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 mb-4 bg-gray-50 focus-within:border-[#1d9e75] focus-within:bg-white transition-all">

            <span className="text-gray-400 mr-2">🔒</span>
            <input
              type="password"
               name="password"
              autoComplete="password"
              placeholder="Password"
              className="flex-1 bg-transparent outline-none text-sm text-gray-700"
              onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
            />
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-black text-white py-2 rounded-full tracking-widest text-sm font-semibold hover:bg-gray-900 transition cursor-pointer"
          >
            {loading ? 'Connecting...' : 'Login'}
          </button>
</div>
        </div>
</div>
    </div>
  );
}

export default Login;