import React from "react";
import Sidebar from "../../components/Sidebar";

function CreateProposal() {
    return (
        <div className="flex">

            <Sidebar />

            <div className="flex-1 bg-blue-50 p-6">

                <h1 className="text-2xl font-semibold mb-6">
                    Create Proposal
                </h1>

                <div className="bg-white p-6 rounded shadow">

                    {/* Form Grid */}
                    <div className="grid grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="Project Name"
                            className="border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Client Name"
                            className="border p-2 rounded"
                        />

                        <input
                            type="email"
                            placeholder="Client Email"
                            className="border p-2 rounded"
                        />

                        <input
                            type="number"
                            placeholder="Cost"
                            className="border p-2 rounded"
                        />

                        <input
                            type="date"
                            className="border p-2 rounded"
                        />

                        <input
                            type="text"
                            placeholder="Tags"
                            className="border p-2 rounded"
                        />

                    </div>

                    {/* Description */}
                    <textarea
                        placeholder="Description..."
                        className="w-full border p-2 rounded mt-4"
                        rows="4"
                    ></textarea>

                    {/* Upload Box */}
                    <div className="border-2 border-dashed p-6 mt-4 text-center rounded text-gray-500">
                        Upload Proposal (PDF)
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 mt-6">
                        <button className="px-4 py-2 border rounded">
                            Save Draft
                        </button>

                        <button className="px-4 py-2 bg-black text-white rounded">
                            Create Proposal
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default CreateProposal;