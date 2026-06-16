import React, { useState, useEffect } from "react";
import { Link,useNavigate  } from "react-router-dom";
import { RiFileList3Fill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
function Sidebar() {
  const [admin, setAdmin] = useState(null);
   const navigate = useNavigate();
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("admin"));
    setAdmin(data);
  }, []);
const handleLogout=async()=>{
  localStorage.removeItem('admin')
  localStorage.removeItem('token')
  navigate("/");
}
  return (
    <div className="relative w-80 min-h-screen flex flex-col text-white">
      
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Images/sidebar_background.jpg')" }}
      />

      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col h-full">
      <div className="p-5 text-2xl font-bold border-b border-white/20 tracking-wide flex items-center gap-2">
  <RiFileList3Fill />
  <span>ProposalHub</span>
</div>

        <div className="p-5 flex flex-col gap-5 text-[15px] font-medium">
          <Link to="/dashboard" className="text-white/70 hover:text-white">
            Dashboard
          </Link>

          <Link to="/auditlogs" className="text-white/70 hover:text-white">
            AuditLogs
          </Link>

          <Link to="/proposals" className="text-white/70 hover:text-white">
            Proposals
          </Link>

          <Link
            to="/createproposal"
            className="text-white/70 hover:text-white"
          >
            + New Proposal
          </Link>
        </div>

        {admin && (
  
  <div className="mt-auto p-5 border-t border-white/20 flex items-center justify-between">
    <div>
      <p className="text-sm font-semibold">{admin.name}</p>
      <p className="text-xs text-white/60 mt-1">{admin.email}</p>
    </div>
    <button
      onClick={handleLogout}
      title="Logout"
      className="flex items-center gap-1 text-white/60 hover:text-white transition-all text-sm"
    >
      <FiLogOut size={18} /> Logout
    </button>
  </div>
)}
      
      </div>
    </div>
  );
}

export default Sidebar;