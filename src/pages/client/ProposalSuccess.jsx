import React from "react";

function ProposalSuccess() {
    return (
        <div className="min-h-screen bg-blue-50">

            {/* Topbar */}
            <div className="bg-black px-6 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-white rounded-md p-1">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 12h6M9 16h6M9 8h3M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                                stroke="#000000"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <span className="text-white font-medium text-sm">ProposalHub</span>
                </div>
                <span className="text-blue-200 text-xs">Secure proposal viewer</span>
            </div>

            {/* Success Card */}
            <div className="flex items-center justify-center py-16 px-4">
                <div className="bg-white rounded-lg shadow p-8 w-full max-w-md text-center">

                    {/* Check Icon */}
                    <div className="bg-green-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M5 13l4 4L19 7"
                                stroke="#15803d"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <h2 className="text-xl font-semibold mb-1">
                        Proposal Accepted!
                    </h2>
                    <p className="text-gray-500 text-sm mb-6">
                        Your signature has been recorded. The sender has been notified.
                    </p>

                    {/* Summary */}
                    <div className="bg-gray-50 rounded p-4 text-left space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Proposal</span>
                            <span className="font-medium">Website Redesign</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Signed By</span>
                            <span className="font-medium">John Smith</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Email</span>
                            <span className="font-medium">john@acme.com</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                                Accepted
                            </span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Timestamp</span>
                            <span className="font-medium">May 6, 2025 10:42 AM</span>
                        </div>
                    </div>

                    <p className="text-gray-400 text-xs mt-5">
                        You may close this page. Your acceptance has been recorded.
                    </p>

                </div>
            </div>

        </div>
    );
}

export default ProposalSuccess;