// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { getProposalByTokenAPI, verifyPasswordAPI } from "../../../services/allAPI";


// function ViewProposal() {
//     const { token } = useParams()
//     const [isValidLink, setIsValidLink] = useState(false)
//     const [password, setPassword] = useState('')
//     const [proposal, setProposal] = useState(null)
//     const [error, setError] = useState('')
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         checkLink()
//     }, [])

//     const checkLink = async () => {
//         const response = await getProposalByTokenAPI(token)
//         setLoading(false)
//         if (response.status === 200) {
//             setIsValidLink(true)
//         } else {
//             setError(response?.data?.message || 'Invalid link')
//         }
//     }

//     const handleVerifyPassword = async () => {
//         if (!password) {
//             alert('Please enter password!')
//             return
//         }
//         const response = await verifyPasswordAPI({ token, password })
//         if (response.status === 200) {
//             setProposal(response.data.proposal)
//         } else {
//             alert(response?.data?.message || 'Incorrect password')
//         }
//     }

//     // Topbar - same across all states
//     const Topbar = () => (
//         <div className="bg-black px-6 py-3 flex items-center justify-between">
//             <div className="flex items-center gap-2">
//                 <div className="bg-white rounded-md p-1">
//                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
//                         <path
//                             d="M9 12h6M9 16h6M9 8h3M5 4h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
//                             stroke="#000000"
//                             strokeWidth="2"
//                             strokeLinecap="round"
//                         />
//                     </svg>
//                 </div>
//                 <span className="text-white font-medium text-sm">ProposalHub</span>
//             </div>
//             <span className="text-blue-200 text-xs">Secure proposal viewer</span>
//         </div>
//     )

//     // State 1 - Loading
//     if (loading) {
//         return (
//             <div className="min-h-screen bg-blue-50">
//                 <Topbar />
//                 <div className="flex items-center justify-center py-16 px-4">
//                     <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">
//                         <p className="text-gray-500 text-sm">Loading...</p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     // State 2 - Invalid Link
//     if (error) {
//         return (
//             <div className="min-h-screen bg-blue-50">
//                 <Topbar />
//                 <div className="flex items-center justify-center py-16 px-4">
//                     <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">
//                         <div className="bg-red-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
//                             <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                                 <path
//                                     d="M6 18L18 6M6 6l12 12"
//                                     stroke="#dc2626"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                 />
//                             </svg>
//                         </div>
//                         <h2 className="text-lg font-semibold mb-1">{error}</h2>
//                         <p className="text-gray-500 text-sm">
//                             This link is invalid, expired or revoked.
//                         </p>
//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     // State 3 - Password Input
//     if (isValidLink && !proposal) {
//         return (
//             <div className="min-h-screen bg-blue-50">
//                 <Topbar />
//                 <div className="flex items-center justify-center py-16 px-4">
//                     <div className="bg-white rounded-lg shadow p-8 w-full max-w-sm text-center">

//                         <div className="bg-blue-100 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4">
//                             <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
//                                 <path
//                                     d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
//                                     stroke="#000000"
//                                     strokeWidth="2"
//                                     strokeLinecap="round"
//                                 />
//                             </svg>
//                         </div>

//                         <h2 className="text-lg font-semibold mb-1">
//                             This proposal is protected
//                         </h2>
//                         <p className="text-gray-500 text-sm mb-5">
//                             Enter the password shared by the sender to view this proposal.
//                         </p>

//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                             className="border p-2 rounded w-full mb-4"
//                             onChange={(e) => setPassword(e.target.value)}
//                         />

//                         <button
//                             onClick={handleVerifyPassword}
//                             className="w-full bg-black text-white py-2 rounded font-medium"
//                         >
//                             Unlock Proposal
//                         </button>

//                         <p className="text-gray-400 text-xs mt-4">
//                             No account required to view this proposal
//                         </p>

//                     </div>
//                 </div>
//             </div>
//         )
//     }

//     // State 4 - Show Proposal
//     if (proposal) {
//         return (
//             <div className="min-h-screen bg-blue-50">
//                 <Topbar />
//                 <div className="max-w-2xl mx-auto px-4 py-8">

//                     {/* Proposal Info */}
//                     <div className="bg-white rounded-lg shadow p-6 mb-4">
//                         <div className="flex justify-between items-start mb-4">
//                             <div>
//                                 <h2 className="text-xl font-semibold">
//                                     {proposal.projectId.projectName}
//                                 </h2>
//                                 <p className="text-gray-500 text-sm">
//                                     Prepared for {proposal.clientId.name}
//                                 </p>
//                             </div>
//                             <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-3 py-1 rounded-full">
//                                 {proposal.status}
//                             </span>
//                         </div>

//                         <div className="border-t pt-4 space-y-2">
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Project Name</span>
//                                 <span className="font-medium">{proposal.projectId.projectName}</span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Client Name</span>
//                                 <span className="font-medium">{proposal.clientId.name}</span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Description</span>
//                                 <span className="font-medium">{proposal.description}</span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Cost</span>
//                                 <span className="font-medium">₹{proposal.cost}</span>
//                             </div>
//                             <div className="flex justify-between text-sm">
//                                 <span className="text-gray-500">Status</span>
//                                 <span className="font-medium">{proposal.status}</span>
//                             </div>
//                         </div>
//                     </div>

//                     {/* PDF Viewer */}
//                     {proposal.documentUrl && (
//                         <div className="bg-white rounded-lg shadow p-6 mb-4">
//                             <h3 className="font-medium mb-3">Proposal Document</h3>
//                             <iframe
//                                 src={`http://localhost:3000/${proposal.documentUrl}`}
//                                 width="100%"
//                                 height="500px"
//                                 className="border rounded"
//                             />
//                         </div>
//                     )}

//                 </div>
//             </div>
//         )
//     }
// }

// export default ViewProposal