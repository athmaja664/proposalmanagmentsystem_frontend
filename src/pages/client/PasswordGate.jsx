import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProposalByTokenAPI, verifyPasswordAPI } from "../../../services/allAPI";

function PasswordGate() {
    const { token } = useParams();
    const navigate = useNavigate();
    const [isValidLink, setIsValidLink] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        checkLink();
    }, []);

    const checkLink = async () => {
        const response = await getProposalByTokenAPI(token);
        setLoading(false);
        if (response.status === 200) {
            setIsValidLink(true);
        } else {
            setError(response?.data?.message || 'Invalid link');
        }
    };
   

    const handleVerifyPassword = async () => {
        if (!password) {
            alert('Please enter password!');
            return;
        }
        const response = await verifyPasswordAPI({ token, password });
        if (response.status === 200) {
            console.log(response)
             navigate('/proposalview', { state: { proposal: response.data.proposal } });
        } else {
            alert(response?.data?.message || 'Incorrect password');
        }
    };

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-blue-50">
                <Topbar />
                <div className="flex items-center justify-center py-16 px-4">
                    <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">
                        <p className="text-gray-500 text-sm">Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Invalid link state
    if (error) {
        return (
            <div className="min-h-screen bg-blue-50">
                <Topbar />
                <div className="flex items-center justify-center py-16 px-4">
                    <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">
                        <div className="bg-red-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                <path d="M6 18L18 6M6 6l12 12" stroke="#dc2626" strokeWidth="2" strokeLinecap="round"/>
                            </svg>
                        </div>
                        <h2 className="text-lg font-semibold mb-1">{error}</h2>
                        <p className="text-gray-500 text-sm">This link is invalid, expired or revoked.</p>
                    </div>
                </div>
            </div>
        );
    }

    // Password gate (valid link, not yet unlocked)
    return (
        <div className="min-h-screen bg-blue-50">
            <Topbar />
            <div className="flex items-center justify-center py-16 px-4">
                <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">
                    <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                stroke="#000000" strokeWidth="2" strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    <h2 className="text-lg font-semibold mb-1">This proposal is protected</h2>
                    <p className="text-gray-500 text-sm mb-5">
                        Enter the password shared by the sender to view this proposal.
                    </p>
                    <input
                        type="password"
                        placeholder="Enter password"
                        className="border p-2 rounded w-full mb-4"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        onClick={handleVerifyPassword}
                        className="w-full text-white py-2 rounded font-medium" style={{ background: "linear-gradient(145deg, #111111 0%, #333333 100%)" }} 
                    >
                        Unlock Proposal
                    </button>
                    <p className="text-gray-400 text-xs mt-4">No account required to view this proposal</p>
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
                        stroke="#060607" strokeWidth="2" strokeLinecap="round"/>
                </svg>
            </div>
            <span className="text-white font-medium text-sm">ProposalHub</span>
        </div>
        <span className="text-blue-200 text-xs">Secure proposal viewer</span>
    </div>
);

export default PasswordGate;