// import React, { useEffect, useState } from "react";
// import Sidebar from "../../components/Sidebar";
// import { useNavigate } from "react-router-dom";
// import { addprojectAPI, getclientAPI } from "../../../services/allAPI";

// function AddProject() {
//  const navigate = useNavigate()
//  const[clients,setClients]=useState([])
//  const[projectData,setProjectData]=useState({
//     projectName:'',
//     clientId:''
//  })
//  const getClients=async()=>{
//     const token=localStorage.getItem('token')
//     const reqHeader={Authorization:`Bearer ${token}`}

//     const response=await getclientAPI(reqHeader)
//    if(response.status==200){
//     setClients(response.data)
//    }
    
//  }
//  useEffect(()=>{
//   getClients()
//  },[])
//  const handleAddProject=async()=>{
//     if(!projectData.projectName||!projectData.clientId){
//         alert('please fill the fields!')
//         return
//     }
//     const token=localStorage.getItem('token')
//     const reqHeader={Authorization:`Bearer ${token}`}

//     const response=await addprojectAPI(projectData,reqHeader)
//     console.log(response);
    

//     if(response.status===200){
//         alert('Project Added Successfully')
//         navigate(-1)
//     }else{
//         alert(response.data.message)
//     }
//  }
//     return (
//         <div className="flex">
//             <Sidebar />
//             <div className="flex-1 bg-blue-50 p-6">
//                 <h1 className="text-2xl font-semibold mb-2">Add Project</h1>
//                 <p className="text-gray-500 text-sm mb-6">Create a new project and link to a client</p>

//                 <div className="bg-white p-6 rounded shadow">
//                     <div className="grid grid-cols-2 gap-4">
//                         <div>
//                             <label className="text-sm text-gray-500 mb-1 block">Project Name</label>
//                             <input
//                                 type="text"
//                                 placeholder="Enter Project"
//                                 className="border p-2 rounded w-full"
//                                 onChange={(e)=>setProjectData({...projectData,projectName:e.target.value})}
//                             />
//                         </div>
//                         <div>
//                             <label className="text-sm text-gray-500 mb-1 block">Select Client</label>
//                             <select className="border p-2 rounded w-full"
//                             onChange={(e)=>setProjectData({...projectData,clientId:e.target.value})}>
//                                 <option value="">Select client...</option>
//                                 {clients.map(client => (
//                                     <option key={client._id} value={client._id}>
//                                         {client.name}
//                                     </option>
//                                 ))}
//                             </select>
//                         </div>
//                     </div>
//                     <div className="flex justify-end gap-3 mt-6">
//                         <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancel</button>
//                         <button onClick={handleAddProject} className="px-4 py-2 bg-black text-white rounded">Add Project</button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddProject;