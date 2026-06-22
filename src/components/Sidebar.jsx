import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RiFileList3Fill } from "react-icons/ri";
import { MdAccountCircle } from "react-icons/md";
import { FiLogOut, FiEdit } from "react-icons/fi";
import EditProfileModal from "./EditProfileModal";

function Sidebar() {
  const [admin, setAdmin] = useState(null);
  const [showMenu, setShowMenu] = useState(false)
  const [showEditProfile, setShowEditProfile] = useState(false)
  const navigate = useNavigate();
  const menuRef = useRef(null)

  useEffect(() => {
  const adminData = localStorage.getItem("admin");

  if (adminData && adminData !== "undefined") {
    setAdmin(JSON.parse(adminData));
  }
}, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    localStorage.removeItem('admin')
    localStorage.removeItem('token')
    navigate("/");
  }

  return (
<div className="relative w-80 h-screen flex flex-col text-white sticky top-0">

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
          <Link to="/createproposal" className="text-white/70 hover:text-white">
            + New Proposal
          </Link>
        </div>

        {admin && (
          <div className="mt-auto p-5 border-t border-white/20">
            <div
              ref={menuRef}
              className="relative flex items-center gap-3 cursor-pointer"
              onClick={() => setShowMenu(prev => !prev)}
              onContextMenu={(e) => e.preventDefault()}
            >
              <button className="text-white/60 hover:text-white transition-all">
                <MdAccountCircle size={28} />
              </button>
              <p className="text-sm font-semibold">{admin.name}</p>

              {/* Dropdown Menu */}
              {showMenu && (
                <div className="absolute bottom-10 left-0 bg-white rounded-lg shadow-lg py-2 w-44 z-50 pt-2">
                  <button
                    onClick={() => { setShowEditProfile(true); setShowMenu(false) }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <FiEdit size={14} />
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                  >
                    <FiLogOut size={14} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <EditProfileModal
          admin={admin}
          onClose={() => setShowEditProfile(false)}
          onUpdate={(updatedAdmin) => {
            setAdmin(updatedAdmin)
            localStorage.setItem('admin', JSON.stringify(updatedAdmin))
          }}
        />
      )}
    </div>
  );
}

export default Sidebar;