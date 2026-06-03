import React from "react";
import { serverURL } from "../../services/serverURL"
function ViewProposalModal({ proposal, onClose }) {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded shadow w-2/4">

                <h2 className="text-2xl font-bold mb-5">
                    Proposal Details
                </h2>

                <div className="space-y-3">

                    <p>
                        <b>Client :</b> {proposal?.clientId?.name}
                    </p>

                    <p>
                        <b>Project :</b> {proposal?.projectId?.projectName}
                    </p>

                    <p>
                        <b>Cost :</b> ₹{proposal?.cost}
                    </p>

                    <p>
                        <b>Status :</b> {proposal?.status}
                    </p>

                    <p>
                        <b>Description :</b> {proposal?.description}
                    </p>

                    <p>
                        <b>Created Date :</b> {proposal?.createdAt?.slice(0, 10)}
                    </p>
                    {proposal?.documentUrl && (
                        <iframe
                            // src={`https://proposalmanagmentsystem-backend.onrender.com/${proposal.documentUrl.replace(/\\/g, '/')}`}
                            //src={`http://localhost:3000/${proposal.documentUrl.replace(/\\/g, '/')}`}
                            src={`${serverURL}/${proposal.documentUrl.replace(/\\/g, '/')}`}
                            width="100%"
                            height="400px"
                            title="PDF Viewer"
                            className="border rounded mt-4"
                        ></iframe>
                    )}

                </div>

                <div className="flex justify-end mt-6">

                    <button
                        onClick={onClose}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Close
                    </button>

                </div>

            </div>

        </div>
    )
}

export default ViewProposalModal 