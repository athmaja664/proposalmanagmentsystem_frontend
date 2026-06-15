import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { serverURL } from "../../../services/serverURL";
import { FaPencilAlt } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";
import { submitSignatureAPI } from "../../../services/allAPI";

function ProposalViewer() {
   
    const navigate = useNavigate();
    const location = useLocation();
    const proposal = location.state?.proposal;

    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [agreed, setAgreed] = useState(false);
    const [decision, setDecision] = useState('')
    const [signatureMethod, setSignatureMethod] = useState('draw')
    const canvasRef = useRef(null)
    const fileInputRef = useRef(null)
    const [uploadedFile, setUploadedFile] = useState(null)

    const startDrawing = (e) => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        ctx.beginPath()
        ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top)
        canvas.isDrawing = true
    }

    const draw = (e) => {
        const canvas = canvasRef.current
        if (!canvas.isDrawing) return
        const ctx = canvas.getContext('2d')
        const rect = canvas.getBoundingClientRect()
        ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top)
        ctx.strokeStyle = '#000'
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()
    }

    const stopDrawing = () => {
        const canvas = canvasRef.current
        canvas.isDrawing = false
    }

    const clearCanvas = () => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
    }

    const getSignatureImage = () => {
        const canvas = canvasRef.current
        return canvas.toDataURL('image/png')
    }

    const handleSubmit = async () => {
        if (!agreed || !decision) {
            alert('Please fill all fields and accept the terms.')
            return
        }

        try {
            let response

            if (decision === 'Rejected') {
                 response = await submitSignatureAPI(
                    { proposalId: proposal._id, decision: 'Rejected' },
                    { 'Content-Type': 'application/json' }
                )
            } else if (signatureMethod === 'draw') {
                const signatureBase64 = getSignatureImage() 
                 response = await submitSignatureAPI(
                    { proposalId: proposal._id, decision, signatureMethod, signatureBase64 },
                    { 'Content-Type': 'application/json' }
                )
            } else if (signatureMethod === 'upload') {
                const fd = new FormData()
                fd.append('proposalId', proposal._id)
                fd.append('decision', decision)
                fd.append('signatureMethod', 'upload')
                fd.append('signatureFile', uploadedFile)
                response = await submitSignatureAPI(fd, null)
            }
            console.log(response);


            if (response.status === 201 || response.status === 200) {
                navigate('/success',{
        state: {
            proposal,
            decision,
            signature: response.data.newSignature
        }
    })
            } else {
                alert(response.data.error)
            }

        } catch (err) {
            alert('Something went wrong.')
        }
    }

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
                            Sent
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
                        {/* <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Status</span>
                            <span className="font-medium">{proposal.status}</span>
                        </div> */}
                    </div>
                </div>

                {/* PDF Viewer */}
                {proposal.documentUrl && (
                    <div className="bg-white rounded-lg shadow p-6 mb-4">
                        <h3 className="font-medium mb-3">Proposal Document</h3>
                        <iframe
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

                    {/* Name & Email */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Client Name</label>
                            <input
                                type="text"
                                className="border p-2 rounded w-full text-sm focus:outline-none focus:border-black"
                                value={proposal?.clientId?.name}
                                disabled
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 mb-1 block">Client Email</label>
                            <input
                                type="email"
                                className="border p-2 rounded w-full text-sm focus:outline-none focus:border-black"
                                value={proposal?.clientId?.email}
                                disabled
                            />
                        </div>
                    </div>
                    {decision === 'Accepted' && (
                        <>
                            {/* Signature Method Selection */}
                            <p className="text-xs text-gray-500 mb-3">Choose signature method</p>

                            {/* Draw Option */}
                            <div
                                onClick={() => setSignatureMethod('draw')}
                                className={`flex items-center gap-3 border rounded-lg p-3 mb-2 cursor-pointer transition-all
                            ${signatureMethod === 'draw' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                            >
                                <div className={`w-8 h-8 rounded flex items-center justify-center text-sm
                            ${signatureMethod === 'draw' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <FaPencilAlt />

                                </div>
                                <div>
                                    <p className="text-sm font-medium">Draw signature</p>
                                    <p className="text-xs text-gray-400">Sign using your mouse or finger</p>
                                </div>
                            </div>

                            {/* Upload Option */}
                            <div
                                onClick={() => setSignatureMethod('upload')}
                                className={`flex items-center gap-3 border rounded-lg p-3 mb-3 cursor-pointer transition-all
                            ${signatureMethod === 'upload' ? 'border-black bg-gray-50' : 'border-gray-200'}`}
                            >
                                <div className={`w-8 h-8 rounded flex items-center justify-center text-sm
                            ${signatureMethod === 'upload' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                    <FaCloudUploadAlt />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Upload signature</p>
                                    <p className="text-xs text-gray-400">Upload an image of your signature</p>
                                </div>
                            </div>

                            {/* Draw Canvas */}
                            {signatureMethod === 'draw' && (
                                <div className="border rounded-lg overflow-hidden mb-4">
                                    <div className="bg-gray-50 border-b px-3 py-2 flex justify-between items-center">
                                        <span className="text-xs text-gray-500">Draw your signature below</span>
                                        <button onClick={clearCanvas} className="text-xs border px-2 py-1 rounded text-gray-500">
                                            Clear
                                        </button>
                                    </div>
                                    <canvas
                                        ref={canvasRef}
                                        width={540}
                                        height={230}
                                        className="w-full block cursor-crosshair"
                                        style={{ height: '230px' }}
                                        onMouseDown={startDrawing}
                                        onMouseMove={draw}
                                        onMouseUp={stopDrawing}
                                        onMouseLeave={stopDrawing}
                                    />
                                </div>
                            )}

                            {/* Upload Box */}
                            {signatureMethod === 'upload' && (
                                <div
                                    className="border-2 border-dashed rounded-lg p-6 text-center mb-4 cursor-pointer"
                                    onClick={() => fileInputRef.current.click()}
                                >
                                    <p className="text-sm text-gray-500 mb-1">Click to upload signature image</p>
                                    <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                                    {uploadedFile && <p className="text-xs text-green-600 mt-2">{uploadedFile.name}</p>}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        ref={fileInputRef}
                                        onChange={(e) => setUploadedFile(e.target.files[0])}
                                    />
                                </div>
                            )}
                        </>
                    )}
                    {/* Checkbox */}
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
                    {/* Accept / Reject Buttons */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                        <button
                            onClick={() => setDecision('Rejected')}
                            className={`py-2 rounded font-medium border transition-all
            ${decision === 'Rejected'
                                    ? 'bg-red-800 text-white border-red-500'
                                    : 'bg-white text-red-500 border-red-300'}`}
                        >
                            Reject Proposal
                        </button>
                        <button
                            onClick={() => setDecision('Accepted')}
                            className={`py-2 rounded font-medium border transition-all
            ${decision === 'Accepted'
                                    ? 'bg-green-900 text-white border-green-500'
                                    : 'bg-white text-green-500 border-green-300'}`}
                        >
                            Accept Proposal
                        </button>
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-2 rounded font-medium" style={{ background: "linear-gradient(145deg, #111111 0%, #333333 100%)" }} 
                    >
                        Submit Report
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
                        stroke="#000000" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </div>
            <span className="text-white font-medium text-sm">ProposalHub</span>
        </div>
        <span className="text-blue-200 text-xs">Secure proposal viewer</span>
    </div>
);

export default ProposalViewer;