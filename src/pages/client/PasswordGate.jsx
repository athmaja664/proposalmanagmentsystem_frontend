import React from "react";
import { Link } from "react-router-dom";
function PasswordGate() {
    return (
        <div className="min-h-screen bg-blue-50">

            {/* Topbar */}
            <div className="bg-blue-700 px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-white rounded-md p-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 12h6M9 16h6M9 8h3M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                                stroke="#1d4ed8"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <span className="text-white font-medium text-sm">ProposalHub</span>
                </div>
                <span className="text-blue-200 text-xs">Secure proposal viewer</span>
            </div>

            {/* Center Card */}
            <div className="flex items-center justify-center py-16 px-4">
                <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">

                    {/* Lock Icon */}
                    <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                stroke="#1d4ed8"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>

                    <h2 className="text-lg font-semibold mb-1">
                        This proposal is protected
                    </h2>
                    <p className="text-gray-500 text-sm mb-5">
                        Enter the password shared by the sender to view this proposal.
                    </p>

                    <input
                        type="password"
                        placeholder="Enter password"
                        className="border p-2 rounded w-full mb-4"
                    />

                    <button className="w-full bg-blue-700 text-white py-2 rounded font-medium">
                        <Link to="/proposalview" className="text-white-700">
                            Unlock Proposal
                        </Link>

                    </button>

                    <p className="text-gray-400 text-xs mt-4">
                        No account required to view this proposal
                    </p>

                </div>
            </div>

        </div>
    );
}

export default PasswordGate;