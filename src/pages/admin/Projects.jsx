import React from "react";
import Sidebar from "../../components/Sidebar";
import { Card } from "flowbite-react";

function Projects() {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-blue-50 p-6">

                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-semibold">Projects</h1>

                    {/* Select Client */}
                    <select className="border p-2 rounded w-48">
                        <option>All Clients</option>
                        <option>Athmaja</option>
                        <option>Beta Tech</option>
                        <option>Acme Corp</option>
                    </select>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-3 gap-4">

                   <Card className="max-w-sm" style={{backgroundColor:"#000000"}}>
    <div className="flex justify-between items-center mb-3">
        <h5 className="text-lg font-bold text-white">
            Logo Design
        </h5>
        <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
            Draft
        </span>
    </div>
    <div className="space-y-2 text-sm">
        <p className="text-gray-300"><span className="text-white font-medium">Client:</span> Athmaja</p>
        <p className="text-gray-300"><span className="text-white font-medium">Email:</span> athmaja@gmail.com</p>
        <p className="text-gray-300"><span className="text-white font-medium">Cost:</span> $5000</p>
        <p className="text-gray-300"><span className="text-white font-medium">Description:</span> Designing logo for company</p>
        <p className="text-gray-300"><span className="text-white font-medium">Created:</span> 2026-05-12</p>
    </div>
</Card>
                    <Card className="max-w-sm">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-bold text-gray-900">
                                Website Redesign
                            </h5>
                            <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs">
                                Sent
                            </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Client:</span> Athmaja</p>
                            <p><span className="font-medium">Email:</span> athmaja@gmail.com</p>
                            <p><span className="font-medium">Cost:</span> $8000</p>
                            <p><span className="font-medium">Description:</span> Full redesign of company website</p>
                            <p><span className="font-medium">Created:</span> 2026-05-12</p>
                        </div>
                    </Card>

                    <Card className="max-w-sm">
                        <div className="flex justify-between items-center">
                            <h5 className="text-lg font-bold text-gray-900">
                                Mobile App
                            </h5>
                            <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                                Accepted
                            </span>
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                            <p><span className="font-medium">Client:</span> Beta Tech</p>
                            <p><span className="font-medium">Email:</span> beta@gmail.com</p>
                            <p><span className="font-medium">Cost:</span> $10000</p>
                            <p><span className="font-medium">Description:</span> Developing mobile app</p>
                            <p><span className="font-medium">Created:</span> 2026-05-12</p>
                        </div>
                    </Card>

                </div>

            </div>
        </div>
    )
}

export default Projects