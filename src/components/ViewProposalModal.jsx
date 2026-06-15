import React from "react";
import { serverURL } from "../../services/serverURL"

function ViewProposalModal({ proposal, onClose }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded shadow w-[90vw] max-w-5xl flex gap-6">

                {/* LEFT - Proposal Details */}
                <div className="flex-1 flex flex-col">
                    <h2 className="text-2xl font-bold mb-5">Proposal Details</h2>

                    <div className="space-y-3">
                        <p><b>Client :</b> {proposal?.clientId?.name}</p>
                        <p><b>Project :</b> {proposal?.projectId?.projectName}</p>
                        <p><b>Cost :</b> ₹{proposal?.cost}</p>
                        <p><b>Status :</b> {proposal?.status}</p>
                        <p><b>Description :</b> {proposal?.description}</p>
                        <p><b>Created Date :</b> {proposal?.createdAt?.slice(0, 10)}</p>
                    </div>

                    <div className="flex justify-end mt-auto pt-6">
                        <button
                            onClick={onClose}
                            className="bg-black text-white px-4 py-2 rounded  cursor-pointer"
                        >
                            Close
                        </button>
                    </div>
                </div>

                {/* RIGHT - PDF Preview */}
                <div className="w-[55%] flex flex-col">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">Proposal Document</h3>
                    {proposal?.documentUrl ? (
                        <iframe
                            // src={`${serverURL}/${proposal.documentUrl.replace(/\\/g, '/')}`}
                            src={proposal.documentUrl.replace(/\\/g, '/')}
                            width="100%"
                            style={{ height: '520px' }}
                            title="PDF Viewer"
                            className="border rounded"
                        />
                    ) : (
                        <div
                            className="border-2 border-dashed rounded flex items-center justify-center text-gray-400 text-sm"
                            style={{ height: '520px' }}
                        >
                            No document uploaded
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ViewProposalModal