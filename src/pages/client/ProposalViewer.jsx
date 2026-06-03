import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { serverURL } from "../../../services/serverURL";
function ProposalViewer() {
    const location = useLocation();
    const navigate = useNavigate();
    const proposal = location.state?.proposal;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [signature, setSignature] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleSubmit = () => {
        if (!fullName || !email || !signature || !agreed) {
            alert('Please fill all fields and accept the terms.');
            return;
        }
        
        navigate('/success');
    };

    if (!proposal) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <p className="text-gray-500"></p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <Topbar />
            <div className="max-w-2xl mx-auto px-4 py-8">

                {/* Proposal Info */}
                <div className="bg-white rounded-lg shadow p-6 mb-4">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h2 className="text-xl font-semibold">{proposal.projectId.projectName}</h2>
                            <p className="text-gray-500 text-sm">Prepared for {proposal.clientId.name}</p>
                        </div>
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
                            {proposal.status}
                        </span>
                    </div>
                    <div className="border-t pt-4 space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Project Name</span>
                            <span className="font-medium">{proposal.projectId.projectName}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Client Name</span>
                            <span className="font-medium">{proposal.clientId.name}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Description</span>
                            <span className="font-medium">{proposal.description}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Cost</span>
                            <span className="font-medium">₹{proposal.cost}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className="font-medium">{proposal.status}</span>
                        </div>
                    </div>
                </div>

                {/* PDF Viewer */}
                {proposal.documentUrl && (
                    <div className="bg-white rounded-lg shadow p-6 mb-4">
                        <h3 className="font-medium mb-3">Proposal Document</h3>
                        <iframe
                            //src={`https://proposalmanagmentsystem-backend.onrender.com/${proposal.documentUrl}`}
                           
                            src={`${serverURL}/${proposal.documentUrl}`}
                            width="100%"
                            height="500px"
                            className="border rounded"
                        />
                    </div>
                )}

                {/* Signing Form */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-1">Sign & Accept This Proposal</h3>
                    <p className="text-gray-500 text-sm mb-5">
                        By signing you confirm acceptance of the terms in this proposal.
                    </p>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Your Full Name"
                            className="border p-2 rounded"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="border p-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Type your name as signature"
                        className="border p-2 rounded w-full mb-4 italic"
                        value={signature}
                        onChange={(e) => setSignature(e.target.value)}
                    />
                    <div className="border-2 border-dashed p-4 rounded text-center text-gray-400 text-sm mb-4">
                        Click to upload signature image (optional)
                    </div>
                    <div className="flex items-start gap-2 mb-5">
                        <input
                            type="checkbox"
                            className="mt-1"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <p className="text-sm text-gray-500">
                            I have read and agree to the terms of this proposal and confirm my acceptance.
                        </p>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-2 rounded font-medium"
                    >
                        Submit Signature & Accept
                    </button>
                    <p className="text-gray-400 text-xs text-center mt-3">
                        Your IP address and timestamp will be recorded on submission.
                    </p>
                </div>

            </div>
        </div>
    );
}

const Topbar = () => (
    <div className="bg-black px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="bg-white rounded-md p-1">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path d="M9 12h6M9 16h6M9 8h3M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                        stroke="#000000" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            <span className="text-white font-medium text-sm">ProposalHub</span>
        </div>
        <span className="text-blue-200 text-xs">Secure proposal viewer</span>
    </div>
);

export default ProposalViewer;