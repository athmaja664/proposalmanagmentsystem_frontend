import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { deleteProposalAPI, listProposalAPI } from "../../../services/allAPI";
import EditProposalModal from "../../components/EditProposalModal";
import ViewProposalModal from "../../components/ViewProposalModal";
import GenerateLinkModal from "../../components/GenerateLinkModal";

function Proposals() {
    //editmodal
    const [showModal, setShowModal] = useState(false)
    //viewmodal
    const [showViewModal, setShowViewModal] = useState(false)
    const [searchKey, setSearchKey] = useState("")
    const [statusFilter, setStatusFilter] = useState("All Status")
    //get
    const [proposals, setProposals] = useState([])
    //edit/view
    const [selectedProposal, setSelectedProposal] = useState(null)
    //generate link
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [selectedProposalId, setSelectedProposalId] = useState('')

    const token = localStorage.getItem('token')

    const getProposals = async () => {
        const reqHeader = { Authorization: `Bearer ${token}` }
        const response = await listProposalAPI(reqHeader)
        if (response.status === 200) {
            setProposals(response.data)
        }
    }

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete")) {
            const reqHeader = { Authorization: `Bearer ${token}` }
            const response = await deleteProposalAPI(id, reqHeader)
            if (response.status === 200) {
                alert('proposal deleted successfully')
                getProposals() //rf
            }
        }
    }

    useEffect(() => {
        getProposals()
    }, [])

    const filterProposal = proposals.filter((item) =>
        (
            item.projectId.projectName.toLowerCase().includes(searchKey.toLowerCase()) ||
            item.clientId.name.toLowerCase().includes(searchKey.toLowerCase())
        )
        &&
        (
            statusFilter === "All Status" ||
            item.status === statusFilter
        )
    )

    const getStatusStyle = (status) => {
        if (status === 'Accepted') return 'bg-green-100 text-green-700'
        if (status === 'Sent') return 'bg-yellow-100 text-yellow-700'
        if (status === 'Draft') return 'bg-gray-200 text-gray-700'
        if (status === 'Rejected') return 'bg-red-100 text-red-700'
        if (status === 'Archived') return 'bg-blue-100 text-blue-700'
    }

    return (
        <>
            <div className="flex min-h-screen bg-blue-50">
                <Sidebar />
                <div className="flex-1 p-8">

                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
                            Proposals
                        </h1>
                    </div>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <input
                            type="text"
                            placeholder="Search proposals"
                            className="border border-gray-300 bg-white px-4 py-3 rounded-lg w-72 outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            onChange={(e) => setSearchKey(e.target.value)}
                        />
                        <select
                            className="border border-gray-300 bg-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-400 text-sm"
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option>All Status</option>
                            <option>Draft</option>
                            <option>Sent</option>
                            <option>Accepted</option>
                            <option>Rejected</option>
                        </select>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 border-b text-gray-700">
                                <tr>
                                    <th className="text-left px-6 py-4 font-semibold">Project</th>
                                    <th className="text-left px-6 py-4 font-semibold">Client</th>
                                    <th className="text-left px-6 py-4 font-semibold">Status</th>
                                    <th className="text-left px-6 py-4 font-semibold">Valid Until</th>
                                    <th className="text-left px-6 py-4 font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filterProposal.length ? filterProposal.map((item) => (
                                    <tr key={item._id} className="border-b hover:bg-gray-50 transition-all">
                                        <td className="px-6 py-4 font-medium text-gray-800">
                                            {item.projectId.projectName}
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {item.clientId.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`${getStatusStyle(item.status)} px-3 py-1 rounded-full text-xs font-medium capitalize`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">
                                            {item.createdAt.slice(0, 10)}
                                        </td>
                                        <td className="px-6 py-4 space-x-3">
                                            <span
                                                onClick={() => {
                                                    setSelectedProposal(item)
                                                    setShowViewModal(true)
                                                }}
                                                className="text-blue-600 cursor-pointer hover:underline"
                                            >
                                                View
                                            </span>
                                            <span
                                                onClick={() => {
                                                    setSelectedProposal(item)
                                                    setShowModal(true)
                                                }}
                                                className="text-gray-500 cursor-pointer hover:underline"
                                            >
                                                Edit
                                            </span>
                                            <span
                                                onClick={() => handleDelete(item._id)}
                                                className="text-red-500 cursor-pointer hover:underline"
                                            >
                                                Delete
                                            </span>
                                            <span
                                                onClick={() => {
                                                    setSelectedProposalId(item._id)
                                                    setSelectedProposal(item)  
                                                    setShowLinkModal(true)
                                                }}
                                                className="text-green-600 cursor-pointer hover:underline"
                                            >
                                                Generate Link
                                            </span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan='5' className="text-center py-4">
                                            No proposals found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>

            {showModal && (
                <EditProposalModal
                    onClose={() => setShowModal(false)}
                    proposal={selectedProposal}
                    getProposals={getProposals}
                />
            )}

            {showViewModal && (
                <ViewProposalModal
                    proposal={selectedProposal}
                    onClose={() => setShowViewModal(false)}
                />
            )}

            {showLinkModal && (
                <GenerateLinkModal
                    proposalId={selectedProposalId}
                     proposalStatus={selectedProposal?.status}
                     proposal={selectedProposal}
                    onClose={() => {setShowLinkModal(false)
                        getProposals()
                    }}
                    
                />
            )}
        </>
    );
}

export default Proposals;