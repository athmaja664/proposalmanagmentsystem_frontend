import React, { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { listProposalAPI } from "../../../services/allAPI";

function Dashboard() {
    const navigate = useNavigate()
    const [proposalData, setProposalData] = useState([])
    const getProposals = async () => {
        const token = localStorage.getItem('token')
        const reqHeader = { Authorization: `Bearer ${token}` }
        const response = await listProposalAPI(reqHeader)
        if (response.status === 200) {
            setProposalData(response.data)
        }
    }
    useEffect(() => {
        getProposals()
    }, [])



    const totalProposals=proposalData.length
    const acceptedProposals=proposalData.filter((item)=>item.status==='Accepted').length
    const sentingProposals=proposalData.filter((item)=>item.status==='Sent').length
    const rejectedProposals=proposalData.filter((item)=>item.status==='Rejected').length
    

    const getStatusStyle=(status)=>{
        if(status==='Accepted')
            return 'bg-green-100 text-green-700'
        if(status==='Sent')return 'bg-yellow-100 text-yellow-700'
       if (status === 'Draft') return 'bg-gray-200 text-gray-700'
        if(status==='Rejected')return 'bg-red-100 text-red-700'
        if(status==='Archived')return 'bg-blue-100 text-blue-700'
    }
    return (
        <>
            <div className="flex">

                {/* Sidebar */}
                <Sidebar />

                {/* Main */}
                <div className="flex-1 bg-blue-50 p-6">

                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-semibold">Dashboard</h1>
                            <p className="text-gray-500">Welcome back, Admin</p>
                        </div>

                        <button className="bg-black text-white px-4 py-2 rounded">
                            <Link to="/createproposal" className="text-white py-2 ">
                                + New Proposal
                            </Link>

                        </button>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-4 gap-5 mt-8">

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Total Proposals</p>
                            <h2 className="text-2xl font-bold">{totalProposals}</h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Accepted</p>
                            <h2 className="text-2xl font-bold text-green-600">{acceptedProposals}</h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Sent</p>
                            <h2 className="text-2xl font-bold text-yellow-400">{sentingProposals}</h2>
                        </div>

                        <div className="bg-white p-4 rounded shadow">
                            <p className="text-gray-500">Rejected</p>
                            <h2 className="text-2xl font-bold text-red-600">{rejectedProposals}</h2>
                        </div>

                    </div>

                    {/* Table */}
                    <div className="bg-white mt-10 p-5 rounded shadow">
                        <h2 className="text-lg font-semibold mb-4">
                            Recent Proposals
                        </h2>

                        <table className="w-full text-sm">
                            <thead className="border-b text-gray-500">
                                <tr>
                                    <th className="text-left p-2">Project</th>
                                    <th className="text-left p-2">Client</th>
                                    <th className="text-left p-2">Status</th>
                                    <th className="text-left p-2">Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {proposalData.slice(-4).map((item) => (
                                    <tr key={item._id} className="border-b">
                                        <td className="p-2">{item.projectId.projectName}</td>
                                        <td className="p-2 text-gray-500">{item.clientId.name}</td>
                                        <td className="p-2">
                                           <span className={`${getStatusStyle(item.status)} px-2 py-1 rounded text-xs`}>
    {item.status}
</span>
                                        </td>
                                        <td className="p-2 text-gray-500">{item.createdAt.slice(0, 10)}</td>
                                    </tr>
                                ))}




                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
        </>
    );
}

export default Dashboard;