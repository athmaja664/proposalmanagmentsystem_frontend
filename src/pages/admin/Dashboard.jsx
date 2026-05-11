import React from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

function Dashboard() {
    return (
        <>
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Main */}
                <div className="flex-1 bg-blue-50 p-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <p className="text-gray-500">Welcome back, Admin</p>
                        </div>

                        <button className="bg-black text-white px-4 py-2 rounded">
                            <Link to="/createproposal" className="text-white py-2 ">
                                + New Proposal
                            </Link>

                        </button>
                    </div>

                    {/* Cards */}q
                    <div className="grid grid-cols-4 gap-5 mt-8">

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Total Proposals</p>
                            <h2 className="text-2xl font-bold">24</h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Accepted</p>
                            <h2 className="text-2xl font-bold text-green-600">12</h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Pending</p>
                            <h2 className="text-2xl font-bold text-yellow-600">7</h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Rejected</p>
                            <h2 className="text-2xl font-bold text-red-600">5</h2>
                        </div>

                    </div>

                    {/* Table */}
                    <div className="bg-white mt-10 p-5 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Recent Proposals
                        </h2>

                        <table className="w-full text-sm">
                            <thead className="border-b text-gray-500">
                                <tr>
                                    <th className="text-left p-2">Project</th>
                                    <th className="text-left p-2">Client</th>
                                    <th className="text-left p-2">Status</th>
                                    <th className="text-left p-2">Date</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr className="border-b">
                                    <td className="p-2">Website redesign</td>
                                    <td className="p-2 text-gray-500">Acme Corp</td>
                                    <td className="p-2">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                            Accepted
                                        </span>
                                    </td>
                                    <td className="p-2 text-gray-500">May 2</td>
                                </tr>

                                <tr className="border-b">
                                    <td className="p-2">Mobile app</td>
                                    <td className="p-2 text-gray-500">Beta Ltd</td>
                                    <td className="p-2">
                                        <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                                            Pending
                                        </span>
                                    </td>
                                    <td className="p-2 text-gray-500">May 1</td>
                                </tr>

                                <tr>
                                    <td className="p-2">Brand identity</td>
                                    <td className="p-2 text-gray-500">Gamma Inc</td>
                                    <td className="p-2">
                                        <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                                            Draft
                                        </span>
                                    </td>
                                    <td className="p-2 text-gray-500">Apr 30</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;