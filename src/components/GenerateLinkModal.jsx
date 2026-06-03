import React, { useState } from "react";
import { generateLinkAPI, revokeLinkAPI } from "../../services/allAPI";


function GenerateLinkModal({ onClose, proposalId }) {
    const [password, setPassword] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [generatedLink, setGeneratedLink] = useState('')
    const [generatedToken, setGeneratedToken] = useState('')
     const [loading, setLoading] = useState(false)

    const token = localStorage.getItem('token')
    const reqHeader = { Authorization: `Bearer ${token}` }

    const handleGenerate = async () => {
        if (!password || !expiryDate) {
            alert('Please fill all fields!')
            return
        }
         setLoading(true)
        const response = await generateLinkAPI({ proposalId, password, expiryDate }, reqHeader)
        setLoading(false)
        if (response.status === 200) {
            setGeneratedLink(response.data.link)
            setGeneratedToken(response.data.token)
        } else if (response.data.hasExistingLink) {
            const confirm = window.confirm('Link already exists. Regenerate?')
            if (confirm) {
                const regenResponse = await generateLinkAPI(
                    { proposalId, password, expiryDate, forceRegenerate: true },
                    reqHeader
                )
                if (regenResponse.status === 200) {
                    setGeneratedLink(regenResponse.data.link)
                    setGeneratedToken(regenResponse.data.token)
                }
            }
        } else {
            alert(response?.data?.message || 'Something went wrong!')
        }
    }

    const handleRevoke = async () => {
        const confirm = window.confirm('Are you sure you want to revoke this link?')
        if (confirm) {
            const response = await revokeLinkAPI({ token: generatedToken }, reqHeader)
            if (response.status === 200) {
                alert('Link Revoked Successfully!')
                setGeneratedLink('')
                setGeneratedToken('')
            }
        }
    }

    const handleCopyLink = () => {
        navigator.clipboard.writeText(generatedLink)
        alert('Link Copied!')
    }

    const handleCopyPassword = () => {
        navigator.clipboard.writeText(password)
        alert('Password Copied!')
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow p-8 w-full max-w-md">

                <h2 className="text-xl font-semibold mb-1">Generate Access Link</h2>
                <p className="text-gray-500 text-sm mb-5">
                    Set a password and expiry date for the client link.
                </p>

                {/* Password */}
                <div className="mb-4">
                    <label className="text-sm text-gray-500 mb-1 block">Password for Client</label>
                    <input
                        type="text"
                        placeholder="acme123"
                        className="border p-2 rounded w-full"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Expiry Date */}
                <div className="mb-5">
                    <label className="text-sm text-gray-500 mb-1 block">Expiry Date</label>
                    <input
                        type="date"
                        className="border p-2 rounded w-full"
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>

                {/* Generate Button */}
                <button
                    onClick={handleGenerate}
                    className="w-full bg-black text-white py-2 rounded font-medium mb-4"
                >
                    {loading ? 'Generating...' : 'Generate Link'}
                </button>

                {/* Generated Link Section */}
                {generatedLink && (
                    <div className="bg-gray-50 rounded p-4 space-y-3 mb-4">
                        <p className="text-sm font-medium">Generated Link:</p>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={generatedLink}
                                readOnly
                                className="border p-2 rounded w-full text-sm"
                            />
                            <button
                                onClick={handleCopyLink}
                                className="bg-black text-white text-xs px-3 py-1 rounded"
                            >
                                Copy Link
                            </button>
                        </div>

                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={password}
                                readOnly
                                className="border p-2 rounded w-full text-sm"
                            />
                            <button
                                onClick={handleCopyPassword}
                                className="bg-black text-white text-xs px-3 py-1 rounded"
                            >
                                Copy Password
                            </button>
                        </div>

                        <button
                            onClick={handleRevoke}
                            className="w-full border border-red-500 text-red-500 py-2 rounded font-medium"
                        >
                            Revoke Link
                        </button>
                    </div>
                )}

                <p className="text-gray-400 text-xs text-center mt-3">
                    Client can access the proposal using this link and password.
                </p>

                <button
                    onClick={onClose}
                    className="w-full border py-2 rounded font-medium mt-3"
                >
                    Close
                </button>

            </div>
        </div>
    )
}

export default GenerateLinkModal