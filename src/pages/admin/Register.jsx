import React from "react";
import { Link } from "react-router-dom";

function Register() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-blue-50">

            <div className="bg-white p-8 rounded shadow w-80">

                <h2 className="text-2xl font-semibold mb-2">
                    Create Account
                </h2>

                <p className="text-gray-500 text-sm mb-6">
                    Register to manage proposals
                </p>

                <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full mb-4 p-2 border rounded outline-none"
                />

                <input
                    type="email"
                    placeholder="Email"
                    className="w-full mb-4 p-2 border rounded outline-none"
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-2 border rounded outline-none"
                />

                <button className="w-full bg-black text-white py-2 rounded">
                    Register
                </button>
                <p className="text-sm text-gray-500 mt-4 text-center">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-700">
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
}

export default Register;