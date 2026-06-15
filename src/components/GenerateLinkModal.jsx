import React, { useState, useEffect } from "react";
import { generateLinkAPI, getLinkByProposalAPI, getSignatureByProposalAPI, revokeLinkAPI, unrevokeLinkAPI, updateProposalStatusAPI  } from "../../services/allAPI";
import { useNavigate } from 'react-router-dom'

function GenerateLinkModal({ onClose, proposalId, proposal }) {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [expiryDate, setExpiryDate] = useState('')
    const [generatedLink, setGeneratedLink] = useState('')
    const [generatedToken, setGeneratedToken] = useState('')
    const [isRevoked, setIsRevoked] = useState(false)
    const [isSent, setIsSent] = useState(false)

    const token = localStorage.getItem('token')
    const reqHeader = { Authorization: `Bearer ${token}` }
    useEffect(() => {
        const getExistingLink = async () => {
            const response = await getLinkByProposalAPI(proposalId, reqHeader)
            if (response.status === 200) {
                const link = `${window.location.origin}/view/${response.data.token}`
                setGeneratedLink(link)
                setGeneratedToken(response.data.token)
                setIsRevoked(response.data.isRevoked)
                setPassword(response.data.password || '')

            }
        }
        getExistingLink()
    }, [])

    const handleGenerate = async () => {
        if (!password || !expiryDate) {
            alert('Please fill all fields!')
            return
        }
        const response = await generateLinkAPI({ proposalId, password, expiryDate }, reqHeader)
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
                setIsRevoked(true)
            }
        }
    }

    const handleUnrevoke = async () => {
        const confirm = window.confirm('Are you sure you wnat to unrevoke this link?')
        if (confirm) {
            const response = await unrevokeLinkAPI({ token: generatedToken }, reqHeader)
            if (response.status === 200) {
                alert('Link UnRevoked Successfullyy!')
                setIsRevoked(false)
            }
        }
    }
    const handleViewDecision = async () => {
        const response = await getSignatureByProposalAPI(proposalId, reqHeader)
        if (response.status === 200) {
            navigate('/success', {
                state: {
                    proposal,
                    decision: response.data.decision,
                    signature: response.data
                }
            })
        } else {
            alert('No signature found yet')
        }
    }

    const handleMarkAsSent = async () => {
        const response = await updateProposalStatusAPI(proposalId, { status: 'Sent' }, reqHeader)
        if (response.status === 200) {
            alert('Status Updated successfully')
            setIsSent(true)
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

                <div className="mb-4">
                    <label className="text-sm text-gray-500 mb-1 block">Password for Client</label>
                    <input
                        type="text"
                        placeholder="Enter Password"
                        className="border p-2 rounded w-full"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className="mb-5">
                    <label className="text-sm text-gray-500 mb-1 block">Expiry Date</label>
                    <input
                        type="date"
                        className="border p-2 rounded w-full"
                        onChange={(e) => setExpiryDate(e.target.value)}
                    />
                </div>


                <button
                    onClick={handleGenerate}
                    className="w-full bg-black text-white py-2 rounded font-medium mb-4"
                >
                    Generate Link

                </button>


                {generatedLink && (
                    <div className="bg-gray-50 rounded p-4 space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-medium">Generated Link:</p>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full
        ${isRevoked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                                {isRevoked ? 'Revoked' : 'Active'}
                            </span>
                        </div>
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
                       
                        {!isSent && proposal?.status !== 'Sent' &&
                            proposal?.status !== 'Accepted' &&
                            proposal?.status !== 'Rejected' && (
                                <button
                                    onClick={handleMarkAsSent}
                                    className="w-full bg-yellow-500 text-white py-2 rounded font-medium"
                                >
                                    Mark as Sent
                                </button>
                            )}

                        {(isSent || proposal?.status === 'Sent') && (
                            <p className="text-center text-sm text-yellow-600 font-medium">
                                ✓ Marked as Sent
                            </p>
                        )}

                        {isRevoked ? (
                            <button
                                onClick={handleUnrevoke}
                                className="w-full border border-blue-500 text-blue-500 py-2 rounded font-medium"
                            >
                                Unrevoke Link
                            </button>
                        ) : (
                            <button
                                onClick={handleRevoke}
                                className="w-full border border-red-500 text-red-500 py-2 rounded font-medium"
                            >
                                Revoke Link
                            </button>

                        )}
                        {(proposal?.status === 'Accepted' || proposal?.status === 'Rejected') && (
                            <button
                                onClick={handleViewDecision}
                                className={`w-full py-2 rounded font-medium border transition-all
            ${proposal?.status === 'Rejected'
                                        ? 'border-red-500 text-red-600 hover:bg-red-50'
                                        : 'border-green-500 text-green-600 hover:bg-green-50'}`}
                            >
                                View {proposal?.status} Decision & Download PDF
                            </button>
                        )}

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