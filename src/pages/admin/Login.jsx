import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLoginAPI } from "../../../services/allAPI";

function Login() {
    const navigate = useNavigate()
    const [adminData, setAdminData] = useState({ 'email':'', 'password':'' })

    const handleLogin = async () => {
        //console.log(adminData);
        if (!adminData.email || !adminData.password) {
            alert('Please fill the Form')
        }
        try {
            const response = await adminLoginAPI(adminData)
            console.log(response);
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('admin', JSON.stringify(response.data.user))
                navigate("/dashboard")

            } else {
                alert('Invalid Credential')
            }


        } catch (err) {
            console.log(err);
            alert('Something went wrong')

        }

    }


    return (

        <div className="min-h-screen flex items-center justify-center bg-blue-50">

            <div className="bg-white p-8 rounded shadow w-80">

                <h2 className="text-2xl font-semibold mb-2">
                    Admin Login
                </h2>

                <p className="text-gray-500 text-sm mb-6">
                    Sign in to manage your proposals
                </p>

                <input
                    type="email"
                    placeholder="admin@company.com"
                    className="w-full mb-4 p-2 border rounded outline-none"
                    onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-2 border rounded outline-none"
                    onChange={(e) => setAdminData({ ...adminData,password: e.target.value })}
                />

                <button onClick={handleLogin} className="w-full bg-black text-white py-2 rounded">
                    Sign In

                </button>

            </div>

        </div>
    );
}

export default Login;