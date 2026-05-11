import React from "react";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";

function Proposals() {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-blue-50 p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Proposals</h1>

                    <button className="bg-black text-white px-4 py-2 rounded">
                        <Link to="/createproposal" className="text-white py-2 ">
                            + New Proposal
                        </Link>
                    </button>
                </div>

                {/* Search + Filter */}
                <div className="flex gap-3 mb-4">
                    <input
                        type="text"
                        placeholder="Search proposals..."
                        className="border p-2 rounded w-64"
                    />

                    <select className="border p-2 rounded">
                        <option>All Status</option>
                        <option>Draft</option>
                        <option>Sent</option>
                        <option>Accepted</option>
                        <option>Rejected</option>
                    </select>
                </div>

                {/* Table */}
                <div className="bg-white rounded shadow">

                    <table className="w-full text-sm">
                        <thead className="bg-gray-100 border-b">
                            <tr>
                                <th className="text-left p-3">Project</th>
                                <th className="text-left p-3">Client</th>
                                <th className="text-left p-3">Status</th>
                                <th className="text-left p-3">Valid Until</th>
                                <th className="text-left p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            <tr className="border-b">
                                <td className="p-3 font-medium">Website redesign</td>
                                <td className="p-3 text-gray-500">Acme Corp</td>
                                <td className="p-3">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                        Accepted
                                    </span>
                                </td>
                                <td className="p-3 text-gray-500">Jun 1</td>
                                <td className="p-3 space-x-2 text-sm">
                                    <span className="text-blue-600 cursor-pointer">View</span>
                                    <span className="text-gray-500 cursor-pointer">Share</span>
                                </td>
                            </tr>

                            <tr className="border-b">
                                <td className="p-3 font-medium">Mobile app</td>
                                <td className="p-3 text-gray-500">Beta Ltd</td>
                                <td className="p-3">
                                    <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                                        Sent
                                    </span>
                                </td>
                                <td className="p-3 text-gray-500">May 20</td>
                                <td className="p-3 space-x-2 text-sm">
                                    <span className="text-blue-600 cursor-pointer">View</span>
                                    <span className="text-gray-500 cursor-pointer">Edit</span>
                                </td>
                            </tr>

                            <tr>
                                <td className="p-3 font-medium">Brand identity</td>
                                <td className="p-3 text-gray-500">Gamma Inc</td>
                                <td className="p-3">
                                    <span className="bg-gray-200 px-2 py-1 rounded text-xs">
                                        Draft
                                    </span>
                                </td>
                                <td className="p-3 text-gray-500">May 30</td>
                                <td className="p-3 space-x-2 text-sm">
                                    <span className="text-blue-600 cursor-pointer">View</span>
                                    <span className="text-red-500 cursor-pointer">Delete</span>
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}

export default Proposals;